styles = `
/*
* Hey. A white background is boring.
* Let's start with a clean
* working environment.
*/

pre {
    white-space: pre-wrap;
    position: fixed; width: 48%;
    top: 30px; bottom: 30px; left: 26%;
    transition: left 500ms;
    overflow: auto;
    background-color: #1e1e1e;
    color: #d4d4d4;
    border-left: 15px solid #454545;
    border-top: 15px solid #454545;
    overflow: auto;
    /* change the style of the scrollbar */
}

/*
* I like VSCode's dark theme.
* Let's use that.
*/
pre::-webkit-scrollbar {
    width: 15px; /* set the width of the scrollbar */
    background-color: #1e1e1e;
}

pre::-webkit-scrollbar-thumb {
    background-color: #a6a6a6;
    width: 15px;
    border-radius: 0px; /* set the border radius of the thumb */
    opacity: 0.1;
}

pre::-webkit-scrollbar-thumb:hover {
    background-color: #bbbbbb;
}

pre::-webkit-scrollbar-thumb:active {
    opacity: 0.9;
}

/*
* Ah. Now that's more like it.
* I'm UK based, and it's probably raining here.
*/

.rainy-skies {
    --tw-gradient-from: #1a1a24;
    --tw-gradient-to: #333346;
    --tw-gradient-stops: var(--tw-gradient-from),
        var(--tw-gradient-to);
    background-image: linear-gradient(to bottom,
        var(--tw-gradient-stops));
}

/*
* We could animate some raindrops with CSS.
* But that's not very fun.
* Let's use JavaScript instead.
* We'll need another window.
*/`

var openComment = false;
function writeStyleChar(which, textId, styleId) {
    if (document.getElementsByClassName("blinker").length > 0) {
        var blinker = document.getElementsByClassName("blinker")[0];
        blinker.parentNode.removeChild(blinker);
    }
    // begin wrapping open comments
    if (which == '/' && openComment == false) {
        openComment = true;
        var styles = document.getElementById(textId).innerHTML + which;
    } else if (which == '/' && openComment == true) {
        openComment = false;
        var styles = document.getElementById(textId).innerHTML.replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    }
    // wrap style declaration
    else if (which == ':') {
        var styles = document.getElementById(textId).innerHTML.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
    }
    // wrap style value 
    else if (which == ';') {
        var styles = document.getElementById(textId).innerHTML.replace(/([^:]*)$/, '<em class="value">$1</em>;');
    }
    // wrap selector
    else if (which == '{') {
        var styles = document.getElementById(textId).innerHTML.replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
        var styles = document.getElementById(textId).innerHTML + which;
    }
    document.getElementById(textId).innerHTML = styles + "<span class='blinker'></span>";
    document.getElementById(styleId).innerHTML += which;
}

function writeStyles(message, index, interval, textId, styleId) {
    if (index < message.length) {
        var pre = document.getElementById(textId);
        pre.scrollTop = pre.scrollHeight;
        writeStyleChar(message[index++], textId, styleId);
        if (message.substring(index, index + 1).match(/\s/) && message.substring(index - 1, index).match(/\./)) {
            interval = 100; // Pause after each sentence.
        } else if (openComment == true) {
            interval = 4; // Slow down comment typing.
        } else {
            interval = 2;
        }
        setTimeout(function () {
            writeStyles(message, index, interval, textId, styleId);
        }, interval);
    }
}

let textId = 'terminal-text';
let styleId = 'terminal-style';
writeStyles(styles, 0, 20, textId, styleId);