const canvas = document.getElementById("skyCanvas");
const ctx = canvas.getContext("2d");

let width, height;
let snowflakes = [];
let santa = {
    x: width,
    y: height * 0.1,
    width: 150,
    height: 80,
    image: new Image(),
    time: 0,
};

santa.image.src =
    "https://i.ibb.co/rbHJDQB/DALL-E-2024-12-02-23-37-removebg-preview.png";

function init() {
    resize();
    createSnowflakes();
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    santa.x = width;
    santa.y = height * 0.1;
    santa.width = width * 0.4;
    santa.height = height * 0.4;
}

window.addEventListener("resize", resize);

function createSnowflakes() {
    let count = width / 8;
    snowflakes = [];
    for (let i = 0; i < count; i++) {
        snowflakes.push(new Snowflake());
    }
}

// Flocon de neige
function Snowflake() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 4 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 3 + 1;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.05 + 0.02;
    this.angle = Math.random() * Math.PI * 2;
}

Snowflake.prototype.update = function () {
    this.angle += this.swingSpeed;
    this.x += Math.cos(this.angle) * this.swing + this.speedX;
    this.y += this.speedY;

    if (this.y > height) {
        this.y = 0;
        this.x = Math.random() * width;
    }

    if (this.x > width) {
        this.x = 0;
    }
    if (this.x < 0) {
        this.x = width;
    }
};

Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    let gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius * 2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255," + this.opacity + ")");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = gradient;
    ctx.fill();
};

function updateSanta() {
    santa.time += 0.05;
    santa.x -= 3;
    santa.y = height * 0.1 + Math.sin(santa.time) * 50;

    if (santa.x + santa.width < 0) {
        santa.x = width;
    }
}

function drawSanta() {
    ctx.drawImage(santa.image, santa.x, santa.y, santa.width, santa.height);
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    snowflakes.forEach((flake) => {
        flake.update();
        flake.draw();
    });

    updateSanta();
    drawSanta();

    requestAnimationFrame(animate);
}

init();
