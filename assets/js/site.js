const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    primaryNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navToggle.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".primary-nav a").forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const buttons = group.querySelectorAll("[data-filter]");
  const targetSelector = group.getAttribute("data-filter-target");
  const items = targetSelector ? document.querySelectorAll(targetSelector) : [];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      items.forEach((item) => {
        const categories = item.getAttribute("data-category") || "";
        const shouldShow = filter === "all" || categories.split(" ").includes(filter);
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    if (answer) {
      answer.classList.toggle("is-open", !isOpen);
    }
  });
});
