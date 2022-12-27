var dialog1Complete = false;
var dialog2Complete = false;
var dialog3Complete = false;
window.addEventListener("load", function () {
    writeStyles(dialog1, 0, 20, 'css-terminal-body', 'terminal-style');
});

document.getElementById("css-terminal").addEventListener("click", function () {
    dragElement(document.getElementById("css-terminal"));
    if (dialog2Complete) {
        return;
    }
    if (!dialog1Complete) {
        return;
    }
    if (document.getElementById("css-terminal").getBoundingClientRect().top < window.innerHeight * 0.1) {
        return;
    }
    console.log("ALL CONDITIONS ARE GO. I REPEAT, ALL CONDITIONS ARE GO.");
    writeStyles(dialog2, 0, 20, 'css-terminal-body', 'button-style', dialog2);
    // Add the text to the button-body
    document.getElementById("button-body").innerHTML = "Make it Rain!";
    // get button element
    const button = document.getElementById('rain-button');
    button.addEventListener('click', () => {
        // If the button is clicked, animate rain.
        animateRain();
        // Remove the button.
        button.remove();
    });
});

document.getElementById("css-terminal").addEventListener("click", function () {
    dragElement(document.getElementById("css-terminal"));
    if (dialog3Complete) {
        return;
    }
    if (!dialog2Complete) {
        return;
    }
    if (!dialog1Complete) {
        return;
    }
    if (document.getElementById("css-terminal").getBoundingClientRect().top > window.innerHeight * 0.1) {
        return;
    }
    console.log("ALL CONDITIONS ARE GO ROUND 2. I REPEAT, ALL CONDITIONS ARE GO.");
    writeStyles(dialog3, 0, 20, 'css-terminal-body', 'button-style', dialog3);
});

// event listener to every click on the page
window.addEventListener("click", function (event) {
    if (dialog2Complete) { animateLightning(event); }
});

window.addEventListener("resize", function () {
    resetCanvas();
});

dialog1 = `
/*
* Hey, you found my personal website.
* It's a bit empty, isn't it?
* How embarrassing.
* We can change that.
* Let's start with a clean
* work area.
*/

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
    cursor: move;
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
    z-index: 0;
    position: absolute;
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

.button {
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
            interval = 800; // Pause after each sentence.
        } else if (comment == true) {
            interval = 35; // Slow down comment typing.
        } else {
            interval = 15; // Otherwise go fast so no one loses attention span.
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