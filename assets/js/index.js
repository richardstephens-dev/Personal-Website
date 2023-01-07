// Show correct tab when a tab is clicked. Tabs are hidden by default.

function toggleHero(id) {
    document.querySelectorAll("button").forEach(function (element) {
        element.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");

    // Reset the text.
    document.getElementById("hero-pre").innerHTML = "";
    clearTimeout(writeStylesTimeout);

    // Writestyles the correct text to the p element.
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
    writeStyles(text, 0, 0, "hero-pre");
}

let writeStylesTimeout;
function writeStyles(message, index, speed, textId) {
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
        writeStylesTimeout = setTimeout(function () {
            writeStyles(message, index, speed, textId);
        }, speed);
    }
}

const aboutPre = `Hi there. You can find my personal coding projects here. Most are about linguistics or retro games. A heads up for you: none of the code here is perfect. But that's OK, because it's all my own code. I taught myself everything here by trying new things. A big part of that means knowing there's always room to grow. So if you have feedback on any project, you can get in touch with the info in the Contact tab.`
const contactPre = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK`
const codePre = `TODO: integrate github repo history.`