// File to rewrite rain.js in the style of paint.js
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
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
        // initialize some variables
        super(x, y);
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

class Wind {
    constructor() {
        this.windSpeed = 0;
    }

    update() {
        // Make the windspeed follow a slow sine wave
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
        this.addDrops(100);
    }

    addDrops(count) {
        for (let i = 0; i < count; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height - canvas.height;
            this.rainDrops.push(new RainDrop(x, y));
        }
    }

    update() {
        this.wind.update();
        // Slowly vary the number of target drops
        let targetDropCount = Math.abs(Math.floor(Math.sin(Date.now() / 10000) * 100)) + 50;

        // log the target and actual drop count
        console.log(targetDropCount, this.rainDrops.length);

        // If there are not enough drops, create some
        if (this.rainDrops.length < targetDropCount) {
            this.addDrops(targetDropCount - this.rainDrops.length)
        }

        // If there are too many drops, remove any that are at the bottom of the screen
        else if (this.rainDrops.length > targetDropCount) {
            // use foreach
            this.rainDrops.forEach((rainDrop, index) => {
                if (rainDrop.y >= canvas.height - (5 * (Math.abs(this.wind.windSpeed) + 1))) {
                    this.rainDrops.splice(index, 1);
                }
            });
            /*for (let i = this.rainDrops.length - 1; i >= 0; i--) {
                if (this.rainDrops[i].y >= canvas.height - 5) {
                    this.rainDrops.splice(i, 1);
                }
            }*/
        }
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