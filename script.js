const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const bagCount = document.querySelector(".bag-count");
const bagButton = document.querySelector(".bag-button");
const toast = document.querySelector(".toast");
let itemCount = 0;
let toastTimer;

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  mainNav.classList.toggle("open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mainNav.classList.remove("open");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    bagCount.textContent = String(itemCount);
    bagButton.setAttribute("aria-label", `Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    showToast(`${button.dataset.product} added to your bag.`);
  });
});

document.querySelectorAll(".category-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelector(".category-pill.active").classList.remove("active");
    pill.classList.add("active");
    const category = pill.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  });
});

const newsletterForm = document.querySelector(".newsletter-form");
const emailInput = newsletterForm.querySelector('input[type="email"]');
const formMessage = document.querySelector(".form-message");

newsletterForm.noValidate = true;

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = emailInput.value.trim() !== "" && emailInput.validity.valid;

  if (!isValid) {
    newsletterForm.classList.add("has-error");
    emailInput.setAttribute("aria-invalid", "true");
    formMessage.textContent = "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  newsletterForm.classList.remove("has-error");
  emailInput.removeAttribute("aria-invalid");
  formMessage.textContent = "Thank you for joining us. Keep an eye on your inbox.";
  newsletterForm.reset();
});

emailInput.addEventListener("input", () => {
  if (emailInput.validity.valid) {
    newsletterForm.classList.remove("has-error");
    emailInput.removeAttribute("aria-invalid");
    formMessage.textContent = "";
  }
});