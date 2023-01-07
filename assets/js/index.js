// Show correct tab when a tab is clicked. Tabs are hidden by default.

function toggleHero(id) {
    document.querySelectorAll("button").forEach(function (element) {
        element.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Reset the text.
    document.getElementById("hero-pre").innerHTML = "";
    clearTimeout(writeBlinkerTextTimeout);

    // writeBlinkerText the correct text to the p element.
    let text = "";
    if (id == "about-button") {
        text = aboutPre;
    }
    if (id == "contact-button") {
        text = contactPre;
    }
    if (id == "code-button") {
        text = codePre;
    }
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

const aboutPre = `Hi there. You can find my personal learning projects here. Most are about linguistics or retro games. A heads up for you: none of the code is perfect. But that's OK, because I learn through experimenting. Experiments only work when you know you can improve. So if you spot a way to improve, please get in touch with me through the Contact tab.`
const contactPre = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`
const codePre = `TODO: integrate github repo history.`