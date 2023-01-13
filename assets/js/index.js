// Constants
// Hero text
const WELCOME_PRE_EN = `Welcome! You'll find projects here about languages and retro games. Keep in mind that the code isn't perfect! I learn by experimenting, and experiments only work when you know you can improve. If you see a way to improve a project here or on my GitHub, please contact me below.`
const CONTACT_PRE_EN = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`
const PROJECTS_TITLE_EN = `Projects:`
const PROJECTS_TITLE_RU = `Проекты:`
const WELCOME_PRE_RU = `Добро пожаловать! Здесь вы найдете проекты о языках и ретро-играх. Чтобы вы знали—код здесь не является идеальным! Я учусь на экспериментах, и это возможно только тогда, когда знаете, можете улучшить. Если увидите способ улучшить проект здесь или на моем GitHub, пожалуйста, свяжитесь со мной.`
const CONTACT_PRE_RU = `Ричард Стивенс
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
Лондон, Великобритания`

// Onload listener
window.addEventListener("load", function () {
    writeBlinkerText(WELCOME_PRE_EN, 0, 0, "welcome-pre");
    // Make element with projects-header id have the projects title.
    document.getElementById("projects-header").innerHTML = PROJECTS_TITLE_EN;
    writeProjectCards();
});

// Set up the code hero text.
async function writeProjectCards() {
    // Get the commits from the github api using a cloudflare worker.
    const result = await fetch("https://api.github.com/users/richardstephens-dev/repos")
        .then(response => response.json())
        .then(data => {
            return JSON.stringify(data, null, 2);
        });

    let repos = JSON.parse(result).sort((a, b) => {
        return new Date(a.updated_at) - new Date(b.updated_at);
    });

    // For each repo, add an element to the project-cards div.
    // The element is a flex with the repo name, description, and link.
    // The element needs the card class to be styled correctly.
    let projectCards = document.getElementById("project-cards");
    projectCards.innerHTML = "";
    for (let i = 0; i < Math.min(5, repos.length); i++) {
        let repo = repos[i];
        let repoDiv = document.createElement("div");
        repoDiv.classList.add("card");
        repoDiv.innerHTML = `
            <a href="${repo.html_url}">
            <h1>${repo.name}</h1></a>
            <p>${repo.description}</p>
        `;
        // Make repodiv have these scss properties, but convert them to regular css.
        repoDiv.style.top = `${i * 10}px`;
        repoDiv.style.transform = `rotate(${(Math.random() * 3 - 2) * 4}deg)`;
        projectCards.appendChild(repoDiv);
    }

    // Add the last card to have contact info.
    let contactDiv = document.createElement("div");
    contactDiv.classList.add("card");
    contactDiv.innerHTML = `
        <h1>Contact</h1>
        <p>${CONTACT_PRE_EN}</p>
    `;
    projectCards.appendChild(contactDiv);
}

function toggleTheme() {
    // Get the current theme from html. check if dark or light
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
        // Control the speed. Low value = fast.
        if (message.substring(index, index + 1).match(/\s/) && message.substring(index - 1, index).match(/[.!?]$/)) {
            speed = 750; // Pause after each sentence.
        } else {
            speed = 25; // Otherwise go fast so no one loses attention span.
        }

        // Write to display element.
        // Get rid of existing blinker.
        if (document.getElementsByClassName("blinker").length > 0) {
            var blinker = document.getElementsByClassName("blinker")[0];
            blinker.parentNode.removeChild(blinker);
        }

        // Write the character to the element.
        var text = document.getElementById(textId).innerHTML + message[index++];
        document.getElementById(textId).innerHTML = text + "<span class='blinker'></span>";


        // Invoke again.
        writeBlinkerTextTimeout = setTimeout(function () {
            writeBlinkerText(message, index, speed, textId);
        }, speed);
    }
}

