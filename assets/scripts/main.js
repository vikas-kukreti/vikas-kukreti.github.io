// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });
}

// ========================================
// Animated Background Canvas
// ========================================
const bgCanvas = document.getElementById("bg-canvas");
const ctx = bgCanvas.getContext("2d");

let width, height;
let particles = [];

function resize() {
  const dpi = window.devicePixelRatio * 2;
  width = window.innerWidth;
  height = window.innerHeight;
  bgCanvas.width = width * dpi;
  bgCanvas.height = height * dpi;
  ctx.scale(dpi, dpi);
  initParticles();
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / 15000);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
}

function drawParticles() {
  const color = getPreferredTheme() === "light" ? "50,50,100" : "200,200,255";
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
    ctx.fill();
  });

  // Draw connections
  particles.forEach((p1, i) => {
    particles.slice(i + 1).forEach((p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(${color}, ${0.15 * (1 - dist / 150)})`;
        ctx.stroke();
      }
    });
  });

  requestAnimationFrame(drawParticles);
}

resize();
window.addEventListener("resize", resize);
drawParticles();

// ========================================
// Scroll Animations
// ========================================
const sections = document.querySelectorAll(".section");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// ========================================
// Smooth Scroll for Navigation
// ========================================

// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navLinks.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-mobile-open");
  });
}

// ========================================
// Timeline Animation
// ========================================
const timelineItems = document.querySelectorAll(".timeline-item");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, index * 150);
      }
    });
  },
  { threshold: 0.2 },
);

timelineItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-20px)";
  item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  timelineObserver.observe(item);
});
