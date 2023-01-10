// Constants
// Hero text
const ABOUT_PRE = `You'll find projects here about languages and retro games. Keep in mind that the code isn't perfect – that's okay! I learn by experimenting, and experiments only work when you know you can improve. If you see a way to improve a project here, please let me know through the Contact tab.`
const CONTACT_PRE = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`

// Onload listener
window.addEventListener("load", function () {
    // write the welcome text to the hero section.
    writeBlinkerText("Welcome!", 0, 0, "hero-pre");
});


// Toggle the text in the hero section by what button is clicked.
function toggleHero(id) {
    // Reset the hero text.
    resetHero(id);

    // Handle code section separately.
    if (id == "code-button") {
        toggleCode();
        return;
    }

    // Write the correct text to the hero.
    let text = "";
    if (id == "about-button") {
        text = ABOUT_PRE;
    }
    if (id == "contact-button") {
        text = CONTACT_PRE;
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

    // Reset the text.
    document.getElementById("hero-pre").innerHTML = "";
    clearTimeout(writeBlinkerTextTimeout);
}

// Toggle the code section.
async function toggleCode() {
    let result = null;
    await fetch("https://github-oauth.richardstephens-dev.workers.dev/")
        .then(response => response.json())
        .then(data => {
            result = JSON.stringify(data, null, 2);
        });

    let message = JSON.parse(result).commits[0].payload.commits[0].message;
    let repo = JSON.parse(result).commits[0].repo.name;
    let date = JSON.parse(result).commits[0].created_at;
    // Put the date in format Day Month, Year
    date = new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    let text = `Latest commit: ${message} to ${repo} on ${date}`;
    resetHero("code-button");
    writeBlinkerText(text, 0, 0, "hero-pre");
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

