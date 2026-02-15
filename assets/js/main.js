// ============================================
// CREW4 Website Enhancement Script
// ============================================

// Sayfa Yüklendiğinde Çalışacaklar
document.addEventListener("DOMContentLoaded", () => {
  // 1. Webflow Badge'ini Temizle
  const badges = document.querySelectorAll(".w-webflow-badge");
  badges.forEach((e) => e.remove());

  // 2. AOS Animasyonlarını Başlat
  AOS.init({
    once: true,
    offset: 100,
    duration: 800,
    easing: "ease-out-cubic",
  });

  // 3. Form validation başlat
  initializeFormValidation();

  // 4. Navbar scroll effect
  initializeNavbarScroll();

  // 5. Smooth scroll behavior
  initializeSmoothScroll();

  // 6. Mobile menu initialization
  initializeMobileMenu();

  // 7. Service toggle initialization
  initializeServiceToggle();

  // 8. Language switcher
  initializeLanguageSwitcher();

  // 9. Projects initialization
  initializeProjects();

  // 10. Project modal setup
  initializeProjectModal();
});

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
function initializeMobileMenu() {
  // Support multiple menu buttons if present
  const menuButtons = document.querySelectorAll(".menu-button");
  const navMenuWrapper = document.querySelector(".nav-menu-wrapper");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuButtons.length || !navMenuWrapper) return;

  function openMenu(btn) {
    btn.classList.add("active");
    navMenuWrapper.classList.add("mobile-open");
    navMenuWrapper.classList.add("w--open");
    const parentNav = navMenuWrapper.closest(".w-nav");
    if (parentNav) parentNav.classList.add("w--nav-open");
    document.body.classList.add("nav-open");
  }

  function closeMenu() {
    menuButtons.forEach((b) => b.classList.remove("active"));
    navMenuWrapper.classList.remove("mobile-open");
    navMenuWrapper.classList.remove("w--open");
    const parentNav = navMenuWrapper.closest(".w-nav");
    if (parentNav) parentNav.classList.remove("w--nav-open");
    document.body.classList.remove("nav-open");
  }

  // Add click / pointer handlers
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (menuButton.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu(menuButton);
      }
    });
    // also support touchstart for instant response
    menuButton.addEventListener("touchstart", (e) => {
      e.stopPropagation();
      if (menuButton.classList.contains("active")) closeMenu();
      else openMenu(menuButton);
    });
  });

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !Array.from(menuButtons).some((b) => b.contains(e.target)) &&
      !navMenuWrapper.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close menu on window resize (switch to desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      closeMenu();
    }
  });
}

// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
function initializeNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// ============================================
// 3. SMOOTH SCROLL BEHAVIOR
// ============================================
function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || href === "") return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ============================================
// 4. SERVICE TOGGLE WITH ENHANCED LOGIC
// ============================================
function initializeServiceToggle() {
  // Optional: Add click event listeners programmatically if needed
}

function toggleService(serviceId, element) {
  // Tıklanan öğe zaten aktif mi kontrol et
  const isActive = element.classList.contains("active-service");

  // Tüm butonlardan aktif sınıfını kaldır
  document
    .querySelectorAll(".service-item-wrap")
    .forEach((el) => el.classList.remove("active-service"));

  // Tüm içerik bloklarını gizle
  document
    .querySelectorAll(".content-block")
    .forEach((el) => el.classList.remove("active"));

  if (isActive) {
    // EĞER ZATEN AKTİFSE: Varsayılana dön (Reset)
    document.getElementById("content-default").classList.add("active");
  } else {
    // EĞER AKTİF DEĞİLSE: Yeni içeriği aç
    element.classList.add("active-service");

    const targetContent = document.getElementById("content-" + serviceId);
    if (targetContent) {
      targetContent.classList.add("active");
    }
  }
}

// ============================================
// 5. LANGUAGE SWITCHER
// ============================================
function initializeLanguageSwitcher() {
  const langButtons = document.querySelectorAll(".lang-btn");

  langButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);

      // Update button states
      langButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ============================================
// 6. PROJECTS INITIALIZATION
// ============================================
function initializeProjects() {
  const projectsContainer = document.getElementById("projectsContainer");
  if (!projectsContainer) return;

  const projects = getProjects();

  projectsContainer.innerHTML = "";
  projects.forEach((project, index) => {
    const delay = index * 100;
    const projectEl = document.createElement("div");
    projectEl.className = "project-wrap";
    projectEl.setAttribute("data-aos", "fade-up");
    projectEl.setAttribute("data-aos-delay", delay);
    projectEl.innerHTML = `
      <div class="project-image-wrap">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <h5 class="project-title" style="color:white; margin-top:10px;">${project.title}</h5>
    `;

    projectEl.addEventListener("click", (e) => {
      e.preventDefault();
      openProjectModal(project);
    });

    projectsContainer.appendChild(projectEl);
  });

  // Reinitialize AOS for dynamically added elements
  setTimeout(() => {
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  }, 100);
}

// ============================================
// 7. PROJECT MODAL
// ============================================
function initializeProjectModal() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.querySelector(".project-modal-close");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeProjectModal);
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  const currentLang = getCurrentLanguage();
  const t = translations[currentLang];

  document.getElementById("modalProjectImage").src = project.image;
  document.getElementById("modalProjectTitle").textContent = project.title;
  document.getElementById("modalProjectCategory").textContent =
    project.category;
  document.getElementById("modalProjectDescription").textContent =
    project.description;
  document.getElementById("modalProjectChallenge").textContent =
    project.challenge;
  document.getElementById("modalProjectSolution").textContent =
    project.solution;

  // Update modal section heads with translations
  document.getElementById("modalLabelDescription").textContent =
    t.modal.description;
  document.getElementById("modalLabelChallenge").textContent =
    t.modal.challenge;
  document.getElementById("modalLabelSolution").textContent = t.modal.solution;
  document.getElementById("modalLabelResults").textContent = t.modal.results;
  document.getElementById("modalLabelTechnologies").textContent =
    t.modal.technologies;

  const resultsList = document.getElementById("modalProjectResults");
  resultsList.innerHTML = "";
  project.results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    resultsList.appendChild(li);
  });

  const techTags = document.getElementById("modalProjectTechnologies");
  techTags.innerHTML = "";
  project.technologies.forEach((tech) => {
    const span = document.createElement("span");
    span.textContent = tech;
    techTags.appendChild(span);
  });

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  modal.classList.remove("open");
  document.body.style.overflow = "auto";
}

// ============================================
// 7. FORM VALIDATION SERVICE
// ============================================
function initializeFormValidation() {
  const contactForm = document.querySelector(".contact-form-container form");

  if (!contactForm) return;

  // Create success message container if it doesn't exist
  let successMessage = document.querySelector(".form-success-message");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.className = "form-success-message";
    successMessage.innerHTML =
      "✓ Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.";
    contactForm.parentElement.insertBefore(successMessage, contactForm);
  }

  // Get all form inputs
  const inputs = contactForm.querySelectorAll("input, textarea");

  // Add blur event listeners for real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      }
    });
  });

  // Form submission handler
  contactForm.addEventListener("submit", handleFormSubmit);
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  let isValid = true;

  // Remove existing error message
  const existingError = field.nextElementSibling;
  if (existingError && existingError.classList.contains("form-error-message")) {
    existingError.remove();
  }

  // Validation rules
  if (!value) {
    isValid = false;
    showFieldError(field, "Bu alan gereklidir");
  } else if (type === "email" && !isValidEmail(value)) {
    isValid = false;
    showFieldError(field, "Lütfen geçerli bir e-posta adresi girin");
  } else if (type === "text" && field.name === "name" && value.length < 3) {
    isValid = false;
    showFieldError(field, "Ad soyadı en az 3 karakter olmalıdır");
  }

  // Update field styling
  if (isValid) {
    field.classList.remove("error");
    field.classList.add("success");
  } else {
    field.classList.add("error");
    field.classList.remove("success");
  }

  return isValid;
}

function showFieldError(field, message) {
  if (field.nextElementSibling?.classList.contains("form-error-message")) {
    return;
  }

  const errorDiv = document.createElement("div");
  errorDiv.className = "form-error-message show";
  errorDiv.textContent = message;
  field.parentElement.insertBefore(errorDiv, field.nextSibling);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  const successMessage = form.parentElement.querySelector(
    ".form-success-message",
  );

  // Validate all fields
  let allValid = true;
  inputs.forEach((input) => {
    if (!validateField(input)) {
      allValid = false;
    }
  });

  if (!allValid) {
    return;
  }

  // Prepare form data
  const formData = new FormData(form);
  const data = {
    name: formData.get("name") || inputs[0].value,
    email: formData.get("email") || inputs[1].value,
    subject: formData.get("subject") || inputs[2].value,
    message: formData.get("message") || inputs[3].value,
  };

  try {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerText;
    submitButton.disabled = true;
    submitButton.innerText = "Gönderiliyor...";

    // Simulate API call (replace with actual endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    successMessage.classList.add("show");

    // Reset form
    form.reset();
    inputs.forEach((input) => {
      input.classList.remove("error", "success");
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);

    // Reset button
    submitButton.disabled = false;
    submitButton.innerText = originalText;
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
  }
}
