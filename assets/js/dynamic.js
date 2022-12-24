styles = `
pre {
    position: fixed; width: 48 %;
    top: 30px; bottom: 30px; left: 26 %;
    transition: left 500ms;
    overflow: auto;
    background - color: #313744; color: #a6c3d4;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 24px 12px;
    box - sizing: border - box;
    border - radius: 3px;
    box - shadow: 0px 4px 0px 2px rgba(0, 0, 0, 0.1);
}


/* 
 * Syntax highlighting 
 * Colors based on Base16 Ocean Dark
 */

pre em: not(.comment) { font - style: normal; }

.comment       { color: #707e84; }
.selector      { color: #c66c75; }
.selector.key { color: #c66c75; }
.key           { color: #c7ccd4; }
.value         { color: #d5927b; }


/* 
 * Let's build my little pen heart.
 */


/* First, we'll move this s*** over */

pre { left: 50 %; }
`

var openComment = false;

function writeStyleChar(which) {
    // begin wrapping open comments
    if (which == '/' && openComment == false) {
        openComment = true;
        var styles = document.getElementById('style-text').innerHTML + which;
    } else if (which == '/' && openComment == true) {
        openComment = false;
        var styles = document.getElementById('style-text').innerHTML.replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
    }
    // wrap style declaration
    else if (which == ':') {
        var styles = document.getElementById('style-text').innerHTML.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
    }
    // wrap style value 
    else if (which == ';') {
        var styles = document.getElementById('style-text').innerHTML.replace(/([^:]*)$/, '<em class="value">$1</em>;');
    }
    // wrap selector
    else if (which == '{') {
        var styles = document.getElementById('style-text').innerHTML.replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
        var styles = document.getElementById('style-text').innerHTML + which;
    }
    document.getElementById('style-text').innerHTML = styles;
    document.getElementById('style-tag').innerHTML += which;
}

function writeStyles(message, index, interval) {
    if (index < message.length) {
        var pre = document.getElementById('style-text');
        pre.scrollTop = pre.scrollHeight;
        writeStyleChar(message[index++]);
        setTimeout(function () {
            writeStyles(message, index, interval);
        }, interval);
    }
}

// appending the tags I'll need.
document.body.innerHTML += '<style id="style-tag"></style><pre id="style-text"></pre>';

// starting it off
writeStyles(styles, 0, 20);