// Krystal Joy Brown — Portfolio interactions
// Nav scroll state, mobile menu toggle, letterbox shrink, scroll reveal.

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const bars = document.querySelectorAll(".letterbox-bar");

  // Header background on scroll
  const onScroll = () => {
    if (window.scrollY > 40) {
      header && header.classList.add("is-scrolled");
    } else {
      header && header.classList.remove("is-scrolled");
    }

    if (bars.length) {
      const shrink = Math.max(0, 1 - window.scrollY / 400);
      bars.forEach((bar) => {
        bar.style.height = `calc(${shrink} * clamp(18px, 6vh, 64px))`;
      });
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("is-open");
      toggle.classList.toggle("is-open");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => navLinks.classList.remove("is-open"))
    );
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // Mark active nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("is-active");
    }
  });
});
