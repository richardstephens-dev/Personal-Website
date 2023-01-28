// Constants
// Hero text
const WELCOME_PRE_EN = `Welcome! You'll find projects here about languages and retro games. Keep in mind that the code isn't perfect. I learn by experimenting, and experiments only work when you know you can improve. When you see a way to improve a project, let me know!`
const CONTACT_P_EN = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`
const CONTACT_H1_EN = `Let's talk!`
const PROJECTS_TITLE_EN = `Projects:`

const PROJECTS_TITLE_RU = `Проекты:`
const WELCOME_PRE_RU = `Добро пожаловать! Здесь вы найдете проекты о языках и ретро-играх. Чтобы вы знали—код здесь не является идеальным. Я учусь на экспериментах, и это возможно только тогда, когда знаете, можете улучшить. Когда увидите способ улучшить проект, дайте мне знать!`
const CONTACT_P_RU = `Ричард Стивенс
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
Лондон, Великобритания`
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
    initLang();
    let localizedTexts = texts[document.cookie.split("=")[1]];
    writeBlinkerText(localizedTexts["welcome-pre"], 0, 0, "welcome-pre");
    document.getElementById("projects-header").innerHTML = localizedTexts["projects-header"];
    writeProjectCards();
}

function initLang() {
    // Get the language from the cookie.
    let lang = document.cookie.split("=")[1];
    // If the cookie is not set, set it to english.
    if (lang == undefined) {
        lang = "en";
        document.cookie = "lang=en";
    }
    // Set the language to the cookie value.
    document.documentElement.setAttribute("lang", lang);
    // Set the language image to the correct one.
    if (lang == "en") {
        document.getElementById("lang-img").src = "assets/images/ru.svg";
    } else {
        document.getElementById("lang-img").src = "assets/images/en.svg";
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
    for (let i = 0; i < repo_names.length; i++) {
        const commits_result = await fetch(`https://api.github.com/repos/richardstephens-dev/${repo_names[i]}/commits?per_page=3`)
            .then(commits_response => commits_response.json())
            .then(data => {
                return JSON.stringify(data, null, 2);
            });

        let commits = JSON.parse(commits_result);
        repo_commits[repo_names[i]] = commits;
    }

    let projectCards = document.getElementById("project-cards");
    projectCards.innerHTML = "";
    for (let i = 0; i < Math.min(5, repos.length); i++) {
        let commit_0 = repo_commits[repos[i].name][0];
        let commit_1 = repo_commits[repos[i].name][1];
        let commit_2 = repo_commits[repos[i].name][2];
        if (commit_0 == undefined || commit_1 == undefined || commit_2 == undefined) {
            continue;
        }
        let repo = repos[i];
        let repoDiv = document.createElement("div");
        repoDiv.classList.add("card");
        repoDiv.innerHTML = `
            <a href="${repo.html_url}">
            <h1>${repo.name}</h1></a>
            <p>${repo.description}
            \n(${commit_0.commit.author.date.split("T")[0]}): ${commit_0.commit.message}
            \n(${commit_1.commit.author.date.split("T")[0]}): ${commit_1.commit.message}
            \n(${commit_2.commit.author.date.split("T")[0]}): ${commit_2.commit.message}
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
    let lang = document.documentElement.getAttribute("lang");
    clearTimeout(writeBlinkerTextTimeout);
    if (lang == "en") {
        localizedTexts = texts["ru"];
        document.documentElement.setAttribute("lang", "ru");
        document.getElementById("lang-img").src = "assets/images/en.svg";
        document.cookie = "lang=ru";
    }
    if (lang == "ru") {
        localizedTexts = texts["en"];
        document.documentElement.setAttribute("lang", "en");
        document.getElementById("lang-img").src = "assets/images/ru.svg";
        document.cookie = "lang=en";
    }
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
        document.documentElement.setAttribute("theme", "light");
        document.getElementById("theme-img").src = "assets/images/dark.svg";
        return;
    }
    document.documentElement.setAttribute("theme", "dark");
    document.getElementById("theme-img").src = "assets/images/light.svg";
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

