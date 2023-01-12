// Constants
// Hero text
const WELCOME_PRE = `Welcome!`
const ABOUT_PRE = `You'll find projects here about languages and retro games. Keep in mind that the code isn't perfect! I learn by experimenting, and experiments only work when you know you can improve. If you see a way to improve a project here or on my GitHub, please let me know through the Contact tab.`
const CONTACT_PRE = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`

// Onload listener
window.addEventListener("load", function () {
    // write the welcome text to the hero section.
    writeBlinkerText(WELCOME_PRE, 0, 0, "hero-pre");
});


// Toggle the text in the hero section by what button is clicked.
async function toggleHero(id) {
    // Reset the hero text.
    resetHero(id);

    // Write the correct text to the hero.
    let text = "";
    if (id == "about-button") {
        text = ABOUT_PRE;
    }
    if (id == "contact-button") {
        text = CONTACT_PRE;
    }
    if (id == "code-button") {
        await writeheroCodeFlex();
        return;
    }
    writeBlinkerText(text, 0, 0, "hero-pre");
}

// Reset the hero section.
function resetHero(id) {
    // Reset active button
    document.querySelectorAll("button").forEach(function (element) {
        element.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Hide the commit table:
    document.getElementById("hero-code-flex").style.display = "none";
    if (id == "code-button") {
        document.getElementById("hero-code-flex").style.display = "flex";
    }

    // Reset the text.
    document.getElementById("hero-pre").innerHTML = "";
    clearTimeout(writeBlinkerTextTimeout);
}

// Set up the code hero text.
async function writeheroCodeFlex() {
    // Get the commits from the github api using a cloudflare worker.
    const result = await fetch("https://github-oauth.richardstephens-dev.workers.dev/")
        .then(response => response.json())
        .then(data => {
            return JSON.stringify(data, null, 2);
        });

    // Get all the commits repo date, name, and message.
    let commits = JSON.parse(result).commits;
    let commitMessages = [];
    for (let i = commits.length - 1; i > 0; i--) {
        let message = commits[i].payload.commits[0].message;
        let repo = commits[i].repo.name;
        repo = repo.substring(repo.indexOf("/") + 1);
        let date = new Date(commits[i].created_at)
            .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
        let sha = commits[i].payload.commits[0].sha;
        commitMessages.push([date, repo, message, sha]);
    }

    // For each commit, add an element to the hero-code-flex div. 
    // The element is a flex with the commit date, repo, and message.
    let heroCodeFlex = document.getElementById("hero-code-flex");
    heroCodeFlex.classList.add("slide-in");
    heroCodeFlex.innerHTML = "";
    for (let i = 0; i < commitMessages.length; i++) {
        let commit = commitMessages[i];
        let commitDiv = document.createElement("div");
        commitDiv.innerHTML = `
            <a href="https://github.com/richardstephens-dev/${commit[1]}/commit/${commit[3]}">
            <h1>${commit[0]}: ${commit[1]}</h1></a>
            <pre>${commit[2]}\n\n</pre>
        `;
        heroCodeFlex.appendChild(commitDiv);
    }

    // Scroll to bottom.
    window.scrollTo(0, document.body.scrollHeight);
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

