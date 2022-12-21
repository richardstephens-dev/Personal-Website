// File to rewrite rain.js in the style of paint.js
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = 4 * window.innerHeight;
let particlesArray = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.weight = 2;
        this.size = 100;
        this.deltaX = 0;
        this.style = "red";
    }

    update() {
        this.x += this.deltaX;
        this.y += this.weight;

        // If it reaches the bottom of the canvas, reset it to the top
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = this.style;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class RainDrop extends Particle {
    constructor(x, y) {
        super(x, y);
        this.deltaX = -0.1 + Math.random() * 0.2;
        this.weight = 14 + Math.random() * 1;
        this.size = 5 + Math.random() * 10;
        // Give it a linear gradient style between gothic-bit-waterloo and gothic-bit-cadet-blue
        // These two colors are in tailwind.config.js in theme extend colors.
        // They have been converted from hex to rgb here:
        this.style = ctx.createLinearGradient(0, 0, 70, 1);
        this.style.addColorStop(0, "rgba(83, 83, 115, 0)");
        this.style.addColorStop(0, "rgba(83, 83, 115, 0.5)");
        this.style.addColorStop(1, "rgba(166, 166, 191, 1)");
        // set style opacity to a random value between 0.5 and 0.9
        //this.style.opacity = 0.5 + Math.random() * 0.4;
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
        // Check if the drop is within the window inner height
        if (this.y > window.pageYOffset + window.innerHeight) {
            return;
        }
        ctx.fillStyle = this.style;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.atan2(this.weight, this.deltaX));
        ctx.fillRect(0, 0, 70, 1);
        ctx.restore();
    }
}

class Wind {
    constructor() {
        this.windSpeed = 0;
    }

    update() {
        // Make the windspeed follow a slow sine wave between -5 and 5
        this.windSpeed = Math.sin(Date.now() / 10000) * 5;
    }
}

class RainEffect {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.rainDrops = [];
        this.wind = new Wind();
    }

    init() {
        // create 100 rain drops
        for (let i = 0; i < 300; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            this.rainDrops.push(new RainDrop(x, y));
        }
    }

    update() {
        this.wind.update();
        this.rainDrops.forEach((rainDrop) => rainDrop.update(this.wind.windSpeed));
    }

    draw() {
        this.rainDrops.forEach((rainDrop) => rainDrop.draw());
    }
}

// Initialize animation managers:
const rain = new RainEffect(canvas.width, canvas.height);
rain.init();

// Animation loop:
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rain.update();
    rain.draw();
    requestAnimationFrame(animate);
}

animate();