/* ================================================================
   MOBILE NAV TOGGLE
   ================================================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Close the mobile menu whenever a link is tapped
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* ================================================================
   SPARKLE FIELD
   Randomly places small glowing sparkles across the screen.
   Regenerated occasionally so they don't feel static.
   ================================================================ */
const sparkleField = document.getElementById("sparkleField");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createSparkle() {
  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";
  sparkle.style.left = Math.random() * 100 + "vw";
  sparkle.style.top = Math.random() * 100 + "vh";
  sparkle.style.animationDelay = Math.random() * 2 + "s";
  sparkleField.appendChild(sparkle);

  // Remove after its animation cycle so the DOM doesn't grow forever
  setTimeout(() => sparkle.remove(), 6000);
}

if (!reducedMotion) {
  for (let i = 0; i < 12; i++) createSparkle();
  setInterval(createSparkle, 1200);
}

/* ================================================================
   SCROLL-REVEAL ANIMATIONS
   Elements with [data-animate] fade/slide/scale into view once,
   the first time they enter the viewport.
   ================================================================ */
const animatedEls = document.querySelectorAll("[data-animate]");

if (reducedMotion) {
  animatedEls.forEach(el => el.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedEls.forEach(el => revealObserver.observe(el));
}

/* ================================================================
   ACTIVE NAV LINK HIGHLIGHTING
   Highlights the nav link matching whichever section is in view.
   ================================================================ */
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach(section => navObserver.observe(section));

/* ================================================================
   CONTACT FORM VALIDATION
   No backend — just checks the fields and shows a success message.
   ================================================================ */
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameField = document.getElementById("name");
  const emailField = document.getElementById("email");
  const messageField = document.getElementById("message");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  [nameField, emailField, messageField].forEach(field => field.classList.remove("invalid"));

  if (nameField.value.trim() === "") {
    nameField.classList.add("invalid");
    isValid = false;
  }
  if (!emailPattern.test(emailField.value.trim())) {
    emailField.classList.add("invalid");
    isValid = false;
  }
  if (messageField.value.trim() === "") {
    messageField.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    formFeedback.textContent = "Please fill in all fields with a valid email.";
    formFeedback.classList.add("error");
    return;
  }

  formFeedback.classList.remove("error");
  formFeedback.textContent = "Thank you! Your message has been noted. 🦋";
  contactForm.reset();
});