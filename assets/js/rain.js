// Add an eventlistener to trigger the first time the page is loaded
window.addEventListener("load", function () {
    // Start the rain effect
    typeText("startText", animateRain);
});

// event listener to every click on the page
window.addEventListener("click", function (event) {
    animateLightning(event);
});

// File to rewrite rain.js in the style of paint.js
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 0.001;

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
        this.lean = 0;
    }

    update() {
        this.blinkCount++;
        console.log(this.blinkCount)

        while (this.y < canvas.height) {
            // If within 100px of the side of the screen, lean the lightning
            if (this.x < 100) {
                this.lean = 50;
            }
            else if (this.x > canvas.width - 100) {
                this.lean = -50;
            }
            else {
                this.lean = 0;
            }

            // Add another branch if the lightning hasn't reached the bottom of the screen
            // A branch is an array of startX, startY, endX, endY, width.
            // The startX and startY are the same as the previous branch's endX and endY
            // The endX is random, and the endY is the current lightning's y + random height
            // The width is the current lightning's width - random width
            const startX = this.branches.length > 0 ? this.branches[this.branches.length - 1][2] : this.x;
            const startY = this.branches.length > 0 ? this.branches[this.branches.length - 1][3] : this.y;
            const width = (this.branches.length > 0 ? this.branches[this.branches.length - 1][4] : this.width) * 0.9;
            const endX = startX + (Math.random() * 100) - 50 + this.lean;
            const endY = startY + (Math.random() * 25) + 25;
            this.branches.push([startX, startY, endX, endY, width]);

            // Update the x, y and width of the lightning to be the
            // lowest endX, endY and width of the branches
            this.branches.forEach((branch) => {
                // check if current branch is the lowest using ?. Set the x and y based on endY
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

// Functions:
function animateRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rain.update();
    rain.draw();
    requestAnimationFrame(animateRain);
}

function animateLightning(event) {
    rain.addLightning(event);
}