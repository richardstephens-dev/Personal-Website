var dialog1Complete = false;
var dialog2Complete = false;
var dialog3Complete = false;
// Start the animation when the window loads.
window.addEventListener("load", function () {
    writeStyles(dialog1, 0, 35, 'css-terminal-body', 'terminal-style');
});
// Reset the canvas when the window is resized.
window.addEventListener("resize", function () {
    resetCanvas();
});

// Use a MutationObserver to detect when the dialog1 is complete by
// comparing the innerHTML of the terminal-body to the dialog1 string.
var dialog1Observer = new MutationObserver(function (mutations) {
    // Check if the dialog1 is complete.
    lengthDifference = document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + "<span class='blinker'></span>").length;
    if (lengthDifference != 0) {
        return;
    };
    // if we are on mobile:
    if (window.innerWidth <= 600) {
        // Make clicking the down button move the terminal to the bottom of the screen.
        document.getElementById("down-button").addEventListener("click", function () {
            document.getElementById("css-terminal").style.top = "10%";
            // Move the svg.
            document.getElementById("down-button").style.top = "10%";
            // Flip the svg.
            document.getElementById("down-button").style.transform = "rotate(180deg)";
            // On hover, the up button should still point up and stay in the same place.
            document.getElementById("down-button").addEventListener("mouseover", function () {
                document.getElementById("down-button").style.top = "0";
                document.getElementById("down-button").style.height = "30px";
            });
            // Make clicking the up button move the terminal back to the top of the screen.
            document.getElementById("down-button").addEventListener("click", function () {
                document.getElementById("css-terminal").style.top = "0";
                document.getElementById("css-terminal").style.height = "50%";
            });
        });
    }

    // if we are on desktop:
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
        // If dialog2 is not complete, start it.
        if (dialog2Complete) {
            return;
        }
        // Begin dialog 2.
        writeStyles(dialog2, 0, 35, 'css-terminal-body', 'terminal-style');
        // Add the text "Make it Rain!" to the rain button.
        document.getElementById("rain-button").innerHTML = "Make it Rain!";
        // add an event listener to the rain button to animate the rain.
        document.getElementById("rain-button").addEventListener("click", function () {
            animateRain();
            document.getElementById("rain-button").removeEventListener("click", arguments.callee);
        });
        // add an event listener to the window to animate lightning on click.
        window.addEventListener("click", function (event) {
            animateLightning(event);
        });
        dialog1Observer.disconnect();
        document.getElementById("css-terminal").removeEventListener("mouseup", arguments.callee);
    });
});
dialog1Observer.observe(document.getElementById("css-terminal-body"), {
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style: top'],
});

dialog1 = `
/*
* Hey, you found my website.
* It's a bit empty, isn't it?
* We can change that.
* Let's start with a clean
* work area.
*/

* {
    transition: all 1s;
}

pre {
    white-space: pre-wrap;
}

.terminal {
    width: 50%;
    height: 50%;
    left: 7%;
    top: 7%;
    position: absolute;
    border-top: 30px solid #454545;
    z-index: 1;
    background-color: rgba(0,0,0,0);
}

.terminal-body {
    overflow: auto;
    width: 100%;
    height: 100%;
    margin-top: -1px;
    font-family: 'Ubuntu Mono';
    font-size: 1.2rem;
    color: #c1c1d2;
    background-color: rgba(30, 30, 30, 0.9);
    line-height: 1.5;
    user-select: none;
}

/*
* Can't forget the mobile users.
*/

@media screen and (max-width: 600px) {
    * {
        font-size: 0.75rem;
    }

    .terminal {
        display: inline-block;
        width: 100%;
        height: 50%;
        left: 0;
        top: 0;
    }

    .down-button {
        z-index: 2;
        display: inline-block;
        position: absolute;
        border: none;
        background-color: rgba(0,0,0,0);
        left: 50%;
        bottom: 10%;
    }
    
    .down-button:hover {
        cursor: pointer;
        -webkit-animation: pulse 1s infinite;
    }

    .down-button[style*="top: 10%"] {
        -webkit-transform: rotate(180deg);
    }
    
    @-webkit-keyframes pulse {
        0% {
            -webkit-transform: scale(1);
        }
        50% {
            -webkit-transform: scale(1.5);
        }
        100% {
            -webkit-transform: scale(1);
        }
    }
}

/*
* Something you should know.
* I love a good CLI blinker.
*/

.blinker {
  margin-bottom: -2px;
  height: 15px;
  margin-left: -1px;
  border-left: 10px solid #bbbbbb;
  animation: blinker 0.9s steps(2, start) infinite;
}

@keyframes blinker {
  to {
    visibility: hidden;
  }
}

/*
* OK, let's finish up the visuals.
*/

.terminal-body::-webkit-scrollbar {
    width: 15px;
    background-color: rgba(30, 30, 30, 0.95);
}

.terminal-body::-webkit-scrollbar-thumb {
    background-color: #a6a6a6;
    width: 15px;
    border-radius: 0px;
    opacity: 0.1;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
    background-color: #bbbbbb;
    opacity: 0.9;
}

.terminal-body::-webkit-scrollbar-thumb:active {
    opacity: 0.9;
}

/*
* And of course we need syntax highlighting.
*/

/* TODO: Add syntax highlighting */

/*
* Ah. Now that's more like it.
* Hmm. What next?
* Where I'm at, it's always raining.
* Let's make it rain here too.
*/

.rainy-skies {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    --tw-gradient-from: #1a1a24;
    --tw-gradient-to: #333346;
    --tw-gradient-stops: var(--tw-gradient-from),
        var(--tw-gradient-to);
    background-image: linear-gradient(to bottom,
        var(--tw-gradient-stops));
}

/*
* We'll animate some raindrops now with JavaScript.
* I'll let you in on a secret.
* The code is already written.
* We'll just need a bit of space at the
* top so we can make a button for you to push.
* Can you do me a favour and drag this
* element down so it's out of the way?
* (mobile users, just click the button)
* I can wait.
*/
`

dialog2 = `
/*
* Thanks for that.
* We have a bit of breathing room now.
* Let's make it rain!
* Then, bring the element back
* to the top when you're ready
* for the final bit.
*/

.rain-button {
    z-index: 2; display: flex; position: absolute;
    left: 25px; top: 25px;
    background-color: #454545;
    font-family: 'Ubuntu Mono'; font-size: 1.2rem;
    color: #c1c1d2; line-height: 1.5;
    user-select: none; cursor: pointer;
    border: 0px;
}
`

dialog3 = `
/*
* Thanks for that. First, let's
* settle in with a cup of warm tea...
*/

/* Add Tea */

/*
* And of course a good book...
*/

/* Add Book */

/*
* And enjoy another mildly
* egotistical personal portfolio website.
*/
`

var comment = false;
function writeStyleChar(which, textId, styleId) {
    if (document.getElementsByClassName("blinker").length > 0) {
        var blinker = document.getElementsByClassName("blinker")[0];
        blinker.parentNode.removeChild(blinker);
    }
    var styles = document.getElementById(textId).innerHTML + which;
    document.getElementById(textId).innerHTML = styles + "<span class='blinker'></span>";
}

function writeStyles(message, index, interval, textId, styleId) {
    if (index < message.length) {
        var element = document.getElementById(textId).parentNode;
        element.scrollTop = element.scrollHeight;
        writeStyleChar(message[index++], textId, styleId);

        // Check for comments.
        if (message.substring(index - 2, index).match(/\*\//)) {
            comment = false;
        }
        if (message.substring(index - 2, index).match(/\/\*/)) {
            comment = true;
        }

        if (message.substring(index, index + 1).match(/\s/) && message.substring(index - 1, index).match(/[.!?]$/)) {
            interval = 8.00; // Pause after each sentence.
        } else if (comment == true) {
            interval = 3.5; // Slow down comment typing.
        } else {
            interval = 1.5; // Otherwise go fast so no one loses attention span.
        }
        // If the last character was a newline, add everything between the last two newlines to the style:
        if (message.substring(index - 1, index).match(/\n/)) {
            currentLineSlice = message.substring(message.lastIndexOf("\n", index - 2) + 1, index - 1);
            document.getElementById(styleId).innerHTML += currentLineSlice;
        }
    }
    else {
        if (message == dialog1) {
            dialog1Complete = true;
        }
        if (message == dialog2) {
            dialog2Complete = true;
        }
        if (message == dialog3) {
            dialog3Complete = true;
        }
    }
    setTimeout(function () {
        writeStyles(message, index, interval, textId, styleId);
    }, interval);
}