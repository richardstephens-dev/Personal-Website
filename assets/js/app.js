
// --------------------------------------------START IT ALL OFF--------------------------------------------
window.addEventListener("load", function () {
    terminalMachine.transition('1');
    canvasMachine.transition('inactive');
    bookMachine.transition('idle');
});

// --------------------------------------------DRAGGING ELEMENTS--------------------------------------------
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// --------------------------------------------RAIN CANVAS LOGIC--------------------------------------------
window.addEventListener("resize", function () {
    updateCanvasSize();
    // if mobile, remove draggable listener from terminal
    const terminalElement = document.getElementById("css-terminal");
    if (window.innerWidth <= 600) {
        terminalElement.removeEventListener("mousedown", function (event) {
            // Drag CSS and logic.
            terminalElement.style.cursor = "move";
            terminalElement.style.transition = "none";
            dragElement(terminalElement, event);
        });
        terminalElement.style.cursor = "default";
    }
    if (window.innerWidth > 600) {
        terminalElement.addEventListener("mousedown", function (event) {
            // Drag CSS and logic.
            terminalElement.style.cursor = "move";
            terminalElement.style.transition = "none";
            dragElement(terminalElement, event);
        });
        terminalElement.style.cursor = "move";
    }
});

const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
// Check if mobile:
if (window.innerWidth < 600) {
    canvas.height = window.innerHeight * 1.5 - 0.001;
}
else {
    canvas.height = window.innerHeight - 0.001;
}

class RainDrop {
    constructor(x, y) {
        // initialize some variables
        this.x = x;
        this.y = y;
        this.deltaX = -0.1 + Math.random() * 0.2;
        this.weight = 14 + Math.random() * 1;
        this.size = 5 + Math.random() * 10;

        // set the style to a rainy gradient
        this.style = ctx.createLinearGradient(0, 0, 70, 1);
        this.style.addColorStop(0, "rgba(83, 83, 115, 0)");
        this.style.addColorStop(0, "rgba(83, 83, 115, 0.5)");
        this.style.addColorStop(1, "rgba(166, 166, 191, 1)");
    }

    update(windSpeed) {
        this.deltaX = windSpeed;
        this.x += this.deltaX;
        this.y += this.weight;

        // If the drop hasn't reached an edge, pass
        if (this.x < canvas.width && this.y < canvas.height) {
            return;
        }

        // if y is greater than the canvas height, reset it to the top
        if (this.x < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
        }
        else if (this.x > canvas.width) {
            this.x = 0;
            this.y = Math.random() * canvas.height;
        }
        else if (this.y > canvas.height) {
            this.y = -70;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        // Don't render drops outside the visible area
        if (this.y > window.pageYOffset + window.innerHeight) {
            return;
        }

        // Apply style and tilt the drop to the wind direction
        ctx.fillStyle = this.style;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(this.weight, this.deltaX));
        ctx.fillRect(0, 0, 70, 1);
        ctx.restore();
    }
}

class RainEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rainDrops = [];
        this.windSpeed = 0;
        this.lightnings = [];
    }

    addDrops(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height - canvas.height;
            this.rainDrops.push(new RainDrop(x, y));
        }
    }

    addLightning(event) {
        const lightning = new Lightning(event);
        lightning.x = event.clientX;
        this.lightnings.push(lightning);
    }

    update() {
        // Update the height/width of the rainy area
        this.height = canvas.height;
        this.width = canvas.width;

        // Update the wind
        this.windSpeed = Math.sin(Date.now() / 10000) * 5;

        // Update the lightning
        this.lightnings.forEach((lightning) => lightning.update());

        // Remove any lightning with a blinkCount of more than 100. Use the same method as removing raindrops
        this.lightnings.forEach((lightning, index) => {
            if (lightning.blinkCount > 40) {
                this.lightnings.splice(index, 1);
            }
        });

        // Update the rain
        // Slowly vary the number of target drops
        let targetDropCount = Math.abs(Math.floor(Math.sin(Date.now() / 10000) * 100)) + 50;

        // If there are not enough drops, create some
        if (this.rainDrops.length < targetDropCount) {
            this.addDrops(targetDropCount - this.rainDrops.length)
        }

        // If there are too many drops, remove any that are at the bottom of the screen
        else if (this.rainDrops.length > targetDropCount) {
            // use foreach
            this.rainDrops.forEach((rainDrop, index) => {
                if (rainDrop.y >= canvas.height - (5 * (Math.abs(this.windSpeed) + 1))) {
                    this.rainDrops.splice(index, 1);
                }
            });
        }
        this.rainDrops.forEach((rainDrop) => rainDrop.update(this.windSpeed));
    }

    draw() {
        this.rainDrops.forEach((rainDrop) => rainDrop.draw());
        this.lightnings.forEach((lightning) => lightning.draw());
    }
}

class Lightning {
    constructor(event) {
        this.y = 0;
        this.x = event.clientX;
        this.width = Math.random() * 5;
        this.branches = [];
        this.blinkCount = 0;
    }

    update() {
        this.blinkCount++;
        while (this.y < canvas.height) {

            // Keep adding branches until the lightning is off the screen
            const startX = this.branches.length > 0 ? this.branches[this.branches.length - 1][2] : this.x;
            const startY = this.branches.length > 0 ? this.branches[this.branches.length - 1][3] : this.y;
            const width = (this.branches.length > 0 ? this.branches[this.branches.length - 1][4] : this.width) * 0.9;
            const endX = startX + (Math.random() * 100) - 50;
            const endY = startY + (Math.random() * 25) + 25;
            this.branches.push([startX, startY, endX, endY, width]);

            // Update the x, y and width of the lightning to be the
            // lowest endX, endY and width of the branches
            this.branches.forEach((branch) => {
                this.y = branch[3] > this.y ? branch[3] : this.y;
                this.x = branch[3] > this.y ? branch[2] : this.x;
                this.width = branch[4] < this.width ? branch[4] : this.width;
            });
        }
    }

    draw() {
        // If the blinkCount is between 10-20, return
        if (this.blinkCount > 10 && this.blinkCount < 20) return;

        // Create a blur canvas to draw the lightning on
        const blurCanvas = document.createElement("canvas");
        blurCanvas.width = canvas.width;
        blurCanvas.height = canvas.height;
        const blurCtx = blurCanvas.getContext("2d");
        // apply blur
        blurCtx.filter = "blur(2px)";
        // Draw the lightning
        blurCtx.beginPath();
        blurCtx.moveTo(this.branches[0][0], this.branches[0][1]);
        this.branches.forEach((branch) => {
            blurCtx.lineTo(branch[2], branch[3]);
        });
        blurCtx.lineWidth = this.width;
        blurCtx.strokeStyle = "#e6e6ec";
        blurCtx.stroke();

        ctx.fillStyle = "#e6e6ec";
        // Draw each branch as a polygon with 4 points (startX, startY, endX, endY)
        this.branches.forEach((branch) => {
            // draw the blur canvas
            ctx.drawImage(blurCanvas, 0, 0);
        });
        ctx.save();
    }
}

// Initialize animation managers:
const rain = new RainEffect(canvas.width, canvas.height);

function updateCanvasSize() {
    canvas.width = window.innerWidth;

    // Height resize logic:
    const mobile = window.innerWidth < 600;
    if (mobile && canvas.height === window.innerHeight * 1.5 - 0.001) {
        return;
    }

    if (!mobile && canvas.height === window.innerHeight - 0.001) {
        return;
    }

    if (mobile) {
        canvas.height = window.innerHeight * 1.5 - 0.001;
        return;
    }
    canvas.height = window.innerHeight - 0.001;
}

// Functions:
function animateRain() {
    updateCanvasSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rain.update();
    rain.draw();
    requestAnimationFrame(animateRain);
}

function animateLightning(event) {
    rain.addLightning(event);
}

// --------------------------------------------STATE MACHINE LOGIC--------------------------------------------
// StateMachine helper class.
class StateMachine {
    constructor(initialState) {
        this.currentState = initialState;
        this.handlers = {};
    }

    transition(newState, payload) {
        this.currentState = newState;
        if (this.handlers[newState]) {
            this.handlers[newState](payload);
        }
    }

    onEnter(state, handler) {
        this.handlers[state] = handler;
    }
}

// Initialize the state machines for interactive elements.
const terminalMachine = new StateMachine('1');
const canvasMachine = new StateMachine('inactive');
const bookMachine = new StateMachine('idle');

/*
* Terminal States:
* 1: on load, show dialog 1
* 2: triggers after first interaction, show dialog 2
* 3: triggers after second interaction, show dialog 3
* 4: triggers after third interaction, show dialog 4
*/

// --------------------------------------------DIALOG 1 EVENTS--------------------------------------------
terminalMachine.onEnter('1', () => {
    writeStyles(dialog1, 0, 35, 'css-terminal-body', 'style');
});

// Down button event listener for mobile to trigger next stage.
document.getElementById("down-button").addEventListener("click", function () {
    // Confirm we are in dialog 1.
    if (terminalMachine.currentState != '1') {
        return;
    }
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + "<span class='blinker'></span>").length != 0) {
        return;
    };

    // CSS.
    const terminalElement = document.getElementById("css-terminal");
    terminalElement.style.transition = "all 1s";
    terminalElement.style.top = "55%";

    // Cleanup & state change.
    const btnElement = document.getElementById("down-button");
    btnElement.removeEventListener("click", arguments.callee);
    btnElement.remove();
    terminalElement.removeEventListener("mouseup", arguments.callee);
    terminalMachine.transition('2');
});

// Drag event listener for desktop. Pairs with next event listener to trigger next stage.
document.getElementById("css-terminal").addEventListener("mousedown", function (event) {
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + "<span class='blinker'></span>").length != 0) {
        return;
    };
    const terminalElement = document.getElementById("css-terminal");
    // Drag CSS and logic.
    terminalElement.style.cursor = "move";
    terminalElement.style.transition = "none";
    dragElement(terminalElement, event);
});

// Check position event listener to trigger next stage.
document.getElementById("css-terminal").addEventListener("mouseup", function () {
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + "<span class='blinker'></span>").length != 0) {
        return;
    };
    const terminalElement = document.getElementById("css-terminal");
    // Main condition: check if terminal is in the right position.
    if (terminalElement.getBoundingClientRect().top < window.innerHeight * 0.1) {
        return;
    }
    // Prevent double triggering.
    if (terminalMachine.currentState != '1') {
        return;
    }

    // Cleanup & state change.
    terminalElement.removeEventListener("mouseup", arguments.callee);
    document.getElementById("down-button").remove();
    terminalMachine.transition('2');
});

// --------------------------------------------DIALOG 2 EVENTS--------------------------------------------
terminalMachine.onEnter('2', () => {
    writeStyles(dialog2, 0, 35, 'css-terminal-body', 'style');
});

// add an event listener to the window to animate lightning on click.
window.addEventListener("click", function (event) {
    // Don't allow lightning unless we're in dialog 2 or higher.
    if (terminalMachine.currentState === '1') {
        return;
    };
    animateLightning(event);
});

// event listener for rain button to trigger rain animation + next stage.
document.getElementById("rain-button").addEventListener("click", function () {
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + dialog2 + "<span class='blinker'></span>").length != 0) {
        return;
    };
    // Don't allow rain to trigger unless we're in dialog 3.
    if (terminalMachine.currentState != '2') {
        return;
    };
    animateRain();
    const rainBtn = document.getElementById("rain-button");
    rainBtn.removeEventListener("click", arguments.callee);
    rainBtn.remove();
    terminalMachine.transition('3');
});

// --------------------------------------------DIALOG 3 EVENTS--------------------------------------------
terminalMachine.onEnter('3', () => {
    writeStyles(dialog3, 0, 35, 'css-terminal-body', 'style');
});


// Down button event listener for mobile to trigger next stage.
document.getElementById("up-button").addEventListener("click", function () {
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + dialog2 + dialog3 + "<span class='blinker'></span>").length != 0) {
        return;
    };

    // If dialog1 is not complete, return.
    const terminalElement = document.getElementById("css-terminal");
    if (terminalMachine.currentState != '3') {
        return;
    }

    // CSS.
    terminalElement.style.transition = "all 1s";
    terminalElement.style.top = "0%";

    // Cleanup & state change.
    const btnElement = document.getElementById("up-button");
    btnElement.removeEventListener("click", arguments.callee);
    btnElement.remove();
    terminalElement.removeEventListener("mouseup", arguments.callee);
    terminalMachine.transition('4');
});

// Check position event listener to trigger next stage.
document.getElementById("css-terminal").addEventListener("mouseup", function () {
    // Confirm we are done writing the dialog.
    if (document.getElementById("css-terminal-body").innerHTML.length - (dialog1 + dialog2 + dialog3 + "<span class='blinker'></span>").length != 0) {
        return;
    };
    const terminalElement = document.getElementById("css-terminal");
    // Main condition: check if terminal is in the right position.
    if (terminalElement.getBoundingClientRect().top > window.innerHeight * 0.1) {
        return;
    }
    // Prevent double triggering.
    if (terminalMachine.currentState != '3') {
        return;
    }

    // Cleanup & state change.
    terminalElement.removeEventListener("mouseup", arguments.callee);
    document.getElementById("up-button").remove();
    terminalMachine.transition('4');
});


// --------------------------------------------DIALOG 4 EVENTS--------------------------------------------
terminalMachine.onEnter('4', () => {
    writeStyles(dialog4, 0, 35, 'css-terminal-body', 'style');
});

// --------------------------------------------STATE 5 EVENTS--------------------------------------------

/*
* Canvas States:
* inactive: on load, do nothing.
* active: triggers after first interaction, animate rain.
*/

/*
* Book States:
* idle: show closed book with title.
* toc: triggers after clicking on cover or "back" button on any page, show open book turned to table of contents.
* python: triggers after clicking on "Python" chapter, show open book turned to python chapter.
* webdev: triggers after clicking on "Web Development" chapter, show open book turned to webdev chapter.
* assembly: triggers after clicking on "NES 6502 Assembly" chapter, show open book turned to assembly chapter.
*/

// --------------------------------------------TERMINAL WRITING--------------------------------------------
let comment = false;
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
            speed = .800; // Pause after each sentence.
        } else if (comment == true) {
            speed = .35; // Slow down comment typing.
        } else {
            speed = .15; // Otherwise go fast so no one loses attention span.
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