// Hardcoded data for the terminal text
var data = [
    {
        startText: "Oh hey. A black screen. That's no fun.<br/>" +
            "Let's change things up.<br/>" +
            "How about we <b>make it rain?</b><br/>" +
            "...<br/>"
    },
    {
        rainDisappointment: "I'm not sure if you can tell, but it's raining.<br/>"
    },
];

function typeText(elementId, callback) {
    // Check if a blinker element exists. If it does, remove it.
    if (document.getElementsByClassName("blinker").length > 0) {
        var blinker = document.getElementsByClassName("blinker")[0];
        blinker.parentNode.removeChild(blinker);
    }

    var elementIdContent = data[0][elementId] + "<span class='blinker'></span>";
    var element = document.getElementById(elementId);

    // Type out the text
    var i = 0, printNow, text;
    (function type() {
        let timeout = 60;
        // If the text is the same as the content, stop
        text = elementIdContent.slice(0, ++i);
        if (text === elementIdContent) return;

        // Print the text plus a blinker
        element.innerHTML = text + `<span class='blinker'></span>`;

        // Handle text that should be printed immediately
        var char = text.slice(-1);
        if (char === ">") printNow = false;
        if (char === "<") printNow = true;
        if (printNow) return type();

        // If the character matches a regex, set a longer timeout
        regex = /[.!?]/;
        regex.test(char) ? timeout = 500 : 60;

        // Otherwise keep going
        setTimeout(type, timeout);
    })();


    // Set the callback timer to be 60*length of the text
    // plus 440*number of regex matches
    var callbackTimer = 60 * elementIdContent.length;
    var matches = elementIdContent.match(regex);
    if (matches) callbackTimer += 440 * matches.length;

    // If the element was the startText, call the callback
    setTimeout(function () {
        callback();
    }, callbackTimer);
}