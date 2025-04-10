

// Subtle Fade-In On Scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document
  .querySelectorAll("section, .card, .story-card, .blog, .webinar")
  .forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// Animation Styles (Injecting via JS)
const style = document.createElement("style");
style.textContent = `
  .hidden {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .fade-in {
    opacity: 1;
    transform: translateY(0px);
  }
`;
document.head.appendChild(style);

// Easter Egg for the Curious 👀
console.log(
  "%cTFAR – Powered by Purpose 💡",
  "color: #3fd0d4; font-weight: bold; font-size: 16px;"
);
console.log(
  "%cBuilt by the legendary Dhar's frontend warrior 🛡️",
  "color: #ccc; font-size: 13px;"
);
// Cursor-responsive background particles
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";
canvas.style.pointerEvents = "none";
canvas.style.width = "100vw";
canvas.style.height = "100vh";

document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener("resize", () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
});

// Particle constructor
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.alpha = 1;
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.color = `rgba(63, 208, 212, ${this.alpha})`;
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    this.alpha -= 0.01;
    this.color = `rgba(63, 208, 212, ${this.alpha})`;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  particles = particles.filter((p) => p.alpha > 0);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
// === Grid Background Responsive to Cursor ===
const gridCanvas = document.createElement("canvas");
gridCanvas.style.position = "fixed";
gridCanvas.style.top = 0;
gridCanvas.style.left = 0;
gridCanvas.style.width = "100vw";
gridCanvas.style.height = "100vh";
gridCanvas.style.zIndex = "-2";
gridCanvas.style.pointerEvents = "none";
document.body.appendChild(gridCanvas);

const gridCtx = gridCanvas.getContext("2d");
let gridW = window.innerWidth;
let gridH = window.innerHeight;
gridCanvas.width = gridW;
gridCanvas.height = gridH;

let mouseX = gridW / 2;
let mouseY = gridH / 2;

window.addEventListener("resize", () => {
  gridW = window.innerWidth;
  gridH = window.innerHeight;
  gridCanvas.width = gridW;
  gridCanvas.height = gridH;
});

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawGrid() {
  gridCtx.clearRect(0, 0, gridW, gridH);
  const spacing = 40;
  const radius = 80;

  for (let x = 0; x < gridW; x += spacing) {
    for (let y = 0; y < gridH; y += spacing) {
      const dx = mouseX - x;
      const dy = mouseY - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const offsetX = (dx / dist) * Math.min((radius / dist) * 10, 5);
      const offsetY = (dy / dist) * Math.min((radius / dist) * 10, 5);

      gridCtx.beginPath();
      gridCtx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
      gridCtx.fillStyle = "rgba(63, 208, 212, 0.15)";
      gridCtx.fill();
    }
  }

  requestAnimationFrame(drawGrid);
}

drawGrid();

document
  .querySelectorAll(".card, .story-card, .blog, .webinar, .resource-card")
  .forEach((card) => {
    const emoji = card.querySelector(".emoji");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -(y - centerY) / 6;
      const rotateY = (x - centerX) / 6;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

      if (emoji) {
        emoji.style.transform = `rotateX(${rotateX * 2}deg) rotateY(${
          rotateY * 2
        }deg) scale(1.4)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
      if (emoji) {
        emoji.style.transform = "rotate(0deg) scale(1)";
      }
    });
  });
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = "0 5px 20px rgba(0, 255, 255, 0.2)";
  } else {
    navbar.style.boxShadow = "0 0 15px rgba(0, 255, 255, 0.08)";
  }
});
document
  .querySelector(".contact-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("success-popup").style.display = "flex";
  });

function closePopup() {
  document.getElementById("success-popup").style.display = "none";

  // Reset form inputs
  const form = document.querySelector(".contact-form");
  if (form) form.reset();
}
