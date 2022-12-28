// EVENT LISTENERS
// Start the animation when the window loads.
window.addEventListener("load", function () {
    writeStyles(dialog1, 0, 35, 'css-terminal-body', 'style');
});
// Reset the canvas when the window is resized.
window.addEventListener("resize", function () {
    resetCanvas();
});

// Dialog Completion Flags
var dialog1Complete = false;
var dialog2Complete = false;
var dialog3Complete = false;

// Utility function for making element observers with a callback.
function makeObserver(element, callback) {
    var observer = new MutationObserver(function (mutations) {
        callback();
    });
    observer.observe(element, {
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['style: top'],
    });
    return observer;
}

// Dialog Callbacks
function dialog1Callback() {
    // Check if the dialog1 is complete.
    lengthDifference = document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + "<span class='blinker'></span>").length;
    if (lengthDifference != 0) {
        return;
    };

    // For mobile:
    // Make clicking the down button move the terminal to the bottom of the screen.
    document.getElementById("down-button").addEventListener("click", function () {
        console.log("clicked");
        document.getElementById("css-terminal").style.top = "40%";
        document.getElementById("down-button").removeEventListener("click", arguments.callee);
        writeStyles(dialog2, 0, 35, 'css-terminal-body', 'style');
        dialog1Observer.disconnect();
        document.getElementById("css-terminal").removeEventListener("mouseup", arguments.callee);
        document.getElementById("down-button").remove();
    });

    // For desktop:
    // When the user hovers over the terminal, change style to cursor: move.
    document.getElementById("css-terminal").addEventListener("mouseover", function () {
        document.getElementById("css-terminal").style.cursor = "move";
    });
    // Add event listener to make the terminal draggable.
    document.getElementById("css-terminal").style.transition = "none";
    document.getElementById("css-terminal").style.animation = "none";
    document.getElementById("css-terminal").addEventListener("mousedown", function (e) {
        dragElement(document.getElementById("css-terminal"), e);
    });


    document.getElementById("css-terminal").addEventListener("mouseup", function () {
        if (document.getElementById("css-terminal").getBoundingClientRect().top < window.innerHeight * 0.1) {
            return;
        }
        // Begin dialog 2.
        writeStyles(dialog2, 0, 35, 'css-terminal-body', 'style');
        dialog1Observer.disconnect();
        document.getElementById("css-terminal").removeEventListener("mouseup", arguments.callee);
    });
}

function dialog2Callback() {
    // Check if the dialog is the right length.
    lengthDifference = document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + dialog2 + "<span class='blinker'></span>").length;
    if (lengthDifference != 0) {
        return;
    };

    // add an event listener to the window to animate lightning on click.
    window.addEventListener("click", function (event) {
        animateLightning(event);
    });

    // add an event listener to the rain button to animate the rain.
    document.getElementById("rain-button").addEventListener("click", function () {
        animateRain();
        writeStyles(dialog3, 0, 35, 'css-terminal-body', 'style')
        dialog2Observer.disconnect();
        document.getElementById("rain-button").removeEventListener("click", arguments.callee);
        document.getElementById("rain-button").remove();
    });
}

function dialog3Callback() {
    // Check if the dialog is the right length.
    lengthDifference = document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + dialog2 + dialog3 + "<span class='blinker'></span>").length;
    if (lengthDifference != 0) {
        return;
    };

    // Make clicking the up button move the terminal back to the top of the screen.
    document.getElementById("up-button").addEventListener("click", function () {
        document.getElementById("css-terminal").style.top = "0%";
        document.getElementById("up-button").removeEventListener("click", arguments.callee);
        document.getElementById("up-button").remove();
    });

    document.getElementById("css-terminal").addEventListener("mouseup", function () {
        if (document.getElementById("css-terminal").getBoundingClientRect().top > window.innerHeight * 0.1) {
            return;
        }
        // Begin dialog 4.
        writeStyles(dialog4, 0, 35, 'css-terminal-body', 'style');
        dialog3Observer.disconnect();
        document.getElementById("css-terminal").removeEventListener("mouseup", arguments.callee);
    });
}

// Dialog Observers
var dialog1Observer = makeObserver(document.getElementById("css-terminal-body"), dialog1Callback);
var dialog2Observer = makeObserver(document.getElementById("css-terminal-body"), dialog2Callback);
var dialog3Observer = makeObserver(document.getElementById("css-terminal-body"), dialog3Callback);

var comment = false;
function writeStyles(message, index, speed, textId, styleId) {
    if (index < message.length) {
        var element = document.getElementById(textId).parentNode;
        element.scrollTop = element.scrollHeight;

        // Check for comments.
        if (message.substring(index - 2, index).match(/\*\//)) {
            comment = false;
        }
        if (message.substring(index - 2, index).match(/\/\*/)) {
            comment = true;
        }

        // Control the speed. Low value = fast.
        if (message.substring(index, index + 1).match(/\s/) && message.substring(index - 1, index).match(/[.!?]$/)) {
            speed = 8.00; // Pause after each sentence.
        } else if (comment == true) {
            speed = 3.5; // Slow down comment typing.
        } else {
            speed = 1.5; // Otherwise go fast so no one loses attention span.
        }


        // Write to display element.
        // Get rid of existing blinker.
        if (document.getElementsByClassName("blinker").length > 0) {
            var blinker = document.getElementsByClassName("blinker")[0];
            blinker.parentNode.removeChild(blinker);
        }
        // Write the character to the element.
        var styles = document.getElementById(textId).innerHTML + message[index++];
        document.getElementById(textId).innerHTML = styles + "<span class='blinker'></span>";

        // Write to style tag.
        // If the last character was a newline, add everything between the last two newlines to the style:
        if (message.substring(index - 1, index).match(/\n/)) {
            currentLineSlice = message.substring(message.lastIndexOf("\n", index - 2) + 1, index - 1);
            document.getElementById(styleId).innerHTML += currentLineSlice;
        }

        // Invoke again.
        setTimeout(function () {
            writeStyles(message, index, speed, textId, styleId);
        }, speed);
    }
}