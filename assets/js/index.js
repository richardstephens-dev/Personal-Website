// Constants
// Hero text
const WELCOME_PRE_EN = `Welcome! You'll find coding projects here. Keep in mind that the code isn't perfect. I learn by experimenting, and experiments only work when you know you can improve. When you see a way to improve a project, let me know!`
const CONTACT_P_EN = `Richard Stephens\nbusiness@richardstephens.dev\n+1 (907) 726 4811`
const CONTACT_H1_EN = `Let's talk!`
const PROJECTS_TITLE_EN = `Projects:`

const PROJECTS_TITLE_RU = `Проекты:`
const WELCOME_PRE_RU = `Добро пожаловать! Здесь вы найдете проекты программирования. Чтобы вы знали—код здесь не является идеальным. Я учусь на экспериментах, и это возможно только тогда, когда знаете, можете улучшить. Когда увидите способ улучшить проект, дайте мне знать!`
const CONTACT_P_RU = `Ричард Стивенс\nbusiness@richardstephens.dev\n+1 (907) 726 4811`
const CONTACT_H1_RU = `Давайте поговорим!`

// store the texts in a logical way.
const texts = {
    "en": {
        "welcome-pre": WELCOME_PRE_EN,
        "projects-header": PROJECTS_TITLE_EN,
        "contact-h1": CONTACT_H1_EN,
        "contact-p": CONTACT_P_EN
    },
    "ru": {
        "welcome-pre": WELCOME_PRE_RU,
        "projects-header": PROJECTS_TITLE_RU,
        "contact-h1": CONTACT_H1_RU,
        "contact-p": CONTACT_P_RU
    }
}

var localizedTexts = texts["en"];

// Onload listener
window.addEventListener("load", function () {
    initPage();
});

function initPage() {
    initTheme();
    initLang();
    writeBlinkerText(localizedTexts["welcome-pre"], 0, 0, "welcome-pre");
    document.getElementById("projects-header").innerHTML = localizedTexts["projects-header"];
    writeProjectCards();
}

function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].split("=");
        if (cookie[0] == name) {
            return cookie[1];
        }
    }
}

function initLang() {
    switch (getCookie("lang")) {
        case "en":
            document.documentElement.setAttribute("lang", "en");
            document.getElementById("lang-img").src = "assets/images/ru.svg";
            localizedTexts = texts["en"];
            break;
        case "ru":
            document.documentElement.setAttribute("lang", "ru");
            document.getElementById("lang-img").src = "assets/images/en.svg";
            localizedTexts = texts["ru"];
            break;
        default:
            const lang = navigator.language || navigator.userLanguage;
            if (lang == "ru") {
                document.cookie = "lang=ru";
            } else {
                document.cookie = "lang=en";
            }
            initLang();
    }
}

function initTheme() {
    switch (getCookie("theme")) {
        case "dark":
            document.documentElement.setAttribute("theme", "dark");
            document.getElementById("theme-img").src = "assets/images/light.svg";
            break;
        case "light":
            document.documentElement.setAttribute("theme", "light");
            document.getElementById("theme-img").src = "assets/images/dark.svg";
            break;
        default:
            const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
            if (darkThemeMq.matches) {
                document.cookie = "theme=dark";
            } else {
                document.cookie = "theme=light";
            }
            initTheme();
    }
}

// Set up the code hero text.
async function writeProjectCards() {
    // Get the commits from the github api using a cloudflare worker.
    const repo_result = await fetch("https://api.github.com/users/richardstephens-dev/repos")
        .then(repo_response => repo_response.json())
        .then(data => {
            return JSON.stringify(data, null, 2);
        });

    let repos = JSON.parse(repo_result).sort((a, b) => {
        return new Date(a.updated_at) - new Date(b.updated_at);
    });

    let repo_names = [];
    for (let i = 0; i < repos.length; i++) {
        repo_names.push(repos[i].name);
    }

    let repo_commits = {};
    let repo_langs = {};
    for (let i = 0; i < repo_names.length; i++) {
        const commits_result = await fetch(`https://api.github.com/repos/richardstephens-dev/${repo_names[i]}/commits?per_page=3`)
            .then(commits_response => commits_response.json())
            .then(data => {
                return JSON.stringify(data, null, 2);
            });
        const langs_result = await fetch(`https://api.github.com/repos/richardstephens-dev/${repo_names[i]}/languages`)
            .then(langs_response => langs_response.json())
            .then(data => {
                return JSON.stringify(data, null, 2);
            });

        let commits = JSON.parse(commits_result);
        repo_commits[repo_names[i]] = commits;
        let langs = JSON.parse(langs_result);
        repo_langs[repo_names[i]] = langs;
    }

    let projectCards = document.getElementById("project-cards");
    projectCards.innerHTML = "";
    for (let i = 0; i < Math.min(5, repos.length); i++) {
        let commit_html = "";
        let langs_html = `<div class="langs-wrapper">`;
        for (let j = 0; j <= 3; j++) {
            let commit = repo_commits[repos[i].name][j];
            if (commit == undefined) {
                continue;
            }
            commit_html += `\n(${commit.commit.author.date.split("T")[0]}): ${commit.commit.message}<br>`;
        }
        for (let lang in repo_langs[repos[i].name]) {
            langs_html += `<img class="logo" src="assets/images/${lang}.svg"/>`;
        }
        langs_html += `</div>`;

        let repo = repos[i];
        let repoDiv = document.createElement("div");
        repoDiv.classList.add("card");
        repoDiv.innerHTML = `
            <a href="${repo.html_url}" target="_blank">
            <h1>${repo.name.split("-").join(" ")}</h1></a>
            <p>${repo.description}
            ${commit_html}
            ${langs_html}
            </p>
        `;
        repoDiv.style.top = `${i * 10}px`;
        repoDiv.style.transform = `rotate(${(Math.random() * 3 - 2) * 4}deg)`;
        projectCards.appendChild(repoDiv);
    }

    let contactDiv = document.createElement("div");
    contactDiv.classList.add("card");
    contactDiv.id = "contact-card";
    contactDiv.innerHTML = `
        <h1>${localizedTexts["contact-h1"]}</h1>
        <p>${localizedTexts["contact-p"]}</p>
    `;
    projectCards.appendChild(contactDiv);
}

function toggleLang() {
    clearTimeout(writeBlinkerTextTimeout);
    if (getCookie("lang") == "en") {
        document.cookie = "lang=ru";
    }
    else if (getCookie("lang") == "ru") {
        document.cookie = "lang=en";
    }
    initLang();
    document.getElementById("contact-card").innerHTML = `
        <h1>${localizedTexts["contact-h1"]}</h1>
        <p>${localizedTexts["contact-p"]}</p>
    `;
    document.getElementById("projects-header").innerHTML = localizedTexts["projects-header"];
    document.getElementById("welcome-pre").innerHTML = "";
    writeBlinkerText(localizedTexts["welcome-pre"], 0, 0, "welcome-pre");
}

function toggleTheme() {
    let theme = document.documentElement.getAttribute("theme");
    if (theme == "dark") {
        document.cookie = "theme=light";
    }
    else if (theme == "light") {
        document.cookie = "theme=dark";
    }
    initTheme();
}

let writeBlinkerTextTimeout;
function writeBlinkerText(message, index, speed, textId) {
    if (index < message.length) {
        if (message.substring(index, index + 1).match(/\s/) && message.substring(index - 1, index).match(/[.!?]$/)) {
            speed = 750;
        } else {
            speed = 25;
        }

        if (document.getElementsByClassName("blinker").length > 0) {
            var blinker = document.getElementsByClassName("blinker")[0];
            blinker.parentNode.removeChild(blinker);
        }

        var text = document.getElementById(textId).innerHTML + message[index++];
        document.getElementById(textId).innerHTML = text + "<span class='blinker'></span>";

        writeBlinkerTextTimeout = setTimeout(function () {
            writeBlinkerText(message, index, speed, textId);
        }, speed);
    }
}

