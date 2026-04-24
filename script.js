document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link
  const navLinks = document.querySelectorAll(".nav a");
  const currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  navLinks.forEach((link) => {
    if (link.getAttribute("href").toLowerCase() === currentPage) {
      link.classList.add("active");
    }
  });

  // Reveal-on-scroll animation
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealItems.forEach((el) => observer.observe(el));

  // Back-to-top button
  const backToTop = document.getElementById("backToTop");
  const toggleBackToTop = () => {
    if (!backToTop) return;
    if (window.scrollY > 320) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };
  if (backToTop) {
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop);
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // Smooth scroll for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", targetId);
      }
    });
  });
});
