// Show correct tab when a tab is clicked. Tabs are hidden by default.

function toggleTab(id) {
    // Reset the text.
    document.getElementById(id).innerHTML = "";
    clearTimeout(writeStylesTimeout);

    // Writestyles the correct text to the p element.
    let text = "";
    if (id == "about-pre") {
        text = aboutPre;
    }
    if (id == "contact-pre") {
        text = contactPre;
    }
    if (id == "code-pre") {
        text = codePre;
    }
    writeStyles(text, 0, 0, id);
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

const aboutPre = `Hi there. You can find my personal coding projects here. Most are about linguistics or retro games. A heads up for you: none of the code here is perfect. But that's OK, because it's all my own code. I taught myself everything here by trying new things. Sometimes, that means failing. And sometimes, that means letting good enough be good enough.`
const contactPre = `Richard Stephens
richard.stephens.15@ucl.ac.uk
+44 0 7704 930 825
London, UK based
`
const codePre = `TODO: integrate github repo history.`