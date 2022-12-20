const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class PaintDrop {
    constructor(x, diameter) {
        // set the x position to a random value between 0 and the canvas width that is not currently occupied by another paint drop
        this.x = x;
        this.y = 0; // start at the top of the canvas
        this.radius = diameter / 2; // random radius between 5 and 20
        this.speedX = -0.1 + Math.random() * 0.2; // random speed in the range [-1, 1]
        this.speedY = 1 + Math.random() * 3; // random speed in the range [1, 4]
        // set the color to a random one of these values:
        /* https://lospec.com/palette-list/shido-cyberneon */
        this.color = [
            "#00033c",
            "#005260",
            "#009d4a",
            "#0aff52",
            "#003884",
            "#008ac5",
            "#00f7ff",
            "#ff5cff",
            "#ac29ce",
            "#600088",
            "#b10585",
            "#ff004e",
            "#2a2e79",
            "#4e6ea8",
            "#add4fa",
            "#ffffff",
        ][Math.round(Math.random() * 14)];
    }

    update() {
        this.x += this.speedX; // update the x and y positions based on the speeds
        this.y += this.speedY;
        // if the speed is 0, pass
        if (this.speedX === 0 || this.speedY === 0) {
            return;
        }
        // If the speed is less than 0.01, set it to 0
        if (Math.abs(this.speedY) < 0.01) {
            this.speedY = 0;
            this.speedX = 0;
            return;
        }
        // Make the speed decay over time until it reaches 0
        this.speedX *= 0.9923;
        this.speedY *= 0.9923;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}

class MetaBallsEffect {
    /*create, store and manage all the paint drops*/
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.paintDrops = [];
    }

    init(canvas) {
        // Set number of balls based on the width of the canvas
        const diameter = 400
        const numberOfBalls = Math.floor(canvas.width / diameter);
        for (let i = 0; i < numberOfBalls; i++) {
            const x = i / numberOfBalls * canvas.width + (diameter / 2);
            this.paintDrops.push(new PaintDrop(x, diameter + 50));
        }
    }

    update() {
        this.paintDrops.forEach((paintDrop) => paintDrop.update());
    }

    draw(context) {
        this.paintDrops.forEach((paintDrop) => paintDrop.draw(context));
    }
}

const effect = new MetaBallsEffect(canvas.width, canvas.height);
effect.init(canvas);

function animate() {
    effect.update();
    effect.draw(ctx);
    requestAnimationFrame(animate);
}

animate();