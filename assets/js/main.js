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

  // 11. Smooth textarea resize
  initializeSmoothTextareaResize();

  // 12. Temporary GitHub version badge
  injectGithubVersionBadge();
});

function injectGithubVersionBadge() {
  if (document.querySelector(".github-version-pill")) return;

  const badge = document.createElement("div");
  badge.className = "github-version-pill";
  const versionMessage =
    window.SITE_CONFIG?.meta?.versionMessage ||
    window.VERSION_MESSAGE ||
    localStorage.getItem("site-version-message") ||
    "v1.1.13";

  badge.textContent = versionMessage;
  badge.setAttribute("aria-label", "Version message");

  document.body.appendChild(badge);
}

/* Theme handling: detect system preference, persist selection, and provide a navbar toggle */
(function () {
  const STORAGE_KEY = "site-theme";
  const mqDark = window.matchMedia("(prefers-color-scheme: dark)");

  function setTheme(theme) {
    if (theme === "light")
      document.documentElement.classList.add("theme-light");
    else document.documentElement.classList.remove("theme-light");
    updateToggleState(theme);
  }

  function updateToggleState(theme) {
    const btns = document.querySelectorAll(".theme-toggle");
    btns.forEach((b) => {
      b.setAttribute("aria-pressed", theme === "light");
      b.title = theme === "light" ? "Aydın tema" : "Karanlık tema";
      b.innerText = theme === "light" ? "✨" : "🌙";
    });
  }

  function detectTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return mqDark.matches ? "dark" : "light";
  }

  function toggleTheme() {
    const isLight = document.documentElement.classList.contains("theme-light");
    const next = isLight ? "dark" : "light";
    localStorage.setItem(STORAGE_KEY, next);
    setTheme(next);
  }

  function initTheme() {
    // Desktop/nav mount point
    const desktopMountPoint =
      document.querySelector(".navbar .nav-menu .lang-selector") ||
      document.querySelector(".navbar .nav-menu") ||
      document.querySelector(".navbar .nav-menu-wrapper") ||
      document.querySelector(".navbar .navbar-wrapper") ||
      document.querySelector(".navbar") ||
      document.body;

    if (desktopMountPoint && !document.querySelector(".theme-toggle-desktop")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "theme-toggle theme-toggle-desktop";
      btn.setAttribute("aria-label", "Toggle theme");
      btn.setAttribute("aria-pressed", "false");
      btn.style.marginLeft = "8px";
      btn.innerText = "🌙";
      desktopMountPoint.appendChild(btn);
    }

    // Always ensure a visible mobile navbar toggle exists
    const mobileMountPoint =
      document.querySelector(".navbar .navbar-wrapper") ||
      document.querySelector(".navbar") ||
      document.body;
    if (mobileMountPoint && !document.querySelector(".theme-toggle-mobile")) {
      const mobileBtn = document.createElement("button");
      mobileBtn.type = "button";
      mobileBtn.className = "theme-toggle theme-toggle-mobile";
      mobileBtn.setAttribute("aria-label", "Toggle theme");
      mobileBtn.setAttribute("aria-pressed", "false");
      mobileBtn.innerText = "🌙";
      mobileMountPoint.appendChild(mobileBtn);
    }

    document.addEventListener("click", function (e) {
      const t = e.target.closest && e.target.closest(".theme-toggle");
      if (!t) return;
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });

    mqDark.addEventListener("change", () => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(mqDark.matches ? "dark" : "light");
      }
    });

    setTheme(detectTheme());
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initTheme);
  else initTheme();
})();

// ============================================
// 1. MOBILE MENU TOGGLE
// ============================================
function initializeMobileMenu() {
  // Support multiple menu buttons if present
  const menuButtons = document.querySelectorAll(".menu-button");
  const navMenuWrapper = document.querySelector(".nav-menu-wrapper");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuButtons.length || !navMenuWrapper) return;
  ensureFallbackMenu();

  function openMenu(btn) {
    btn.classList.add("active");
    const parentNav = navMenuWrapper.closest(".w-nav");
    if (parentNav) parentNav.classList.add("w--nav-open");
    document.body.classList.add("nav-open");
    // Ensure fallback cloned menu exists and show it (fixes Webflow white-box issues)
    ensureFallbackMenu();
    const fallback = document.getElementById("mobileFallbackMenu");
    if (fallback) fallback.classList.add("open");
  }

  function closeMenu() {
    menuButtons.forEach((b) => b.classList.remove("active"));
    const parentNav = navMenuWrapper.closest(".w-nav");
    if (parentNav) parentNav.classList.remove("w--nav-open");
    document.body.classList.remove("nav-open");
    const fallback = document.getElementById("mobileFallbackMenu");
    if (fallback) fallback.classList.remove("open");
  }

  function toggleMenu(menuButton) {
    if (menuButton.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu(menuButton);
    }
  }

  // Add click / pointer handlers
  menuButtons.forEach((menuButton) => {
    menuButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleMenu(menuButton);
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
    const fallback = document.getElementById("mobileFallbackMenu");

    const clickedMenuButton = Array.from(menuButtons).some((b) =>
      b.contains(e.target),
    );

    const clickedNavMenu =
      navMenuWrapper.contains(e.target) ||
      (fallback && fallback.contains(e.target));

    if (!clickedMenuButton && !clickedNavMenu) {
      closeMenu();
    }
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close menu on window resize (switch to desktop)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991) {
      closeMenu();
    }
  });

  window.addEventListener("orientationchange", closeMenu);
}

// ==========================
// MOBILE FALLBACK MENU
// Creates a body-level cloned menu to avoid Webflow container styling
// ==========================
function ensureFallbackMenu() {
  if (document.getElementById("mobileFallbackMenu")) return;

  const navMenuWrapper = document.querySelector(".nav-menu-wrapper");
  if (!navMenuWrapper) return;

  const fallback = document.createElement("div");
  fallback.id = "mobileFallbackMenu";
  fallback.className = "mobile-fallback-menu";

  // Build a clean menu structure to avoid copying Webflow container styles
  const inner = document.createElement("div");
  inner.className = "mobile-fallback-inner";

  const linksList = document.createElement("ul");
  linksList.className = "mobile-fallback-links-list";

  // collect primary nav links
  const navLinks = navMenuWrapper.querySelectorAll("a.nav-link");
  navLinks.forEach((a) => {
    const li = document.createElement("li");
    li.className = "mobile-fallback-item";
    const clone = document.createElement("a");
    clone.href = a.getAttribute("href") || "#";
    clone.className = "nav-link fallback-link";
    clone.textContent = a.textContent.trim();
    li.appendChild(clone);
    linksList.appendChild(li);
  });

  inner.appendChild(linksList);

  // actions area (primary button + language)
  const actions = document.createElement("div");
  actions.className = "mobile-fallback-actions";

  const primary = navMenuWrapper.querySelector(".primary-btn-wrap");
  if (primary) {
    const primaryClone = primary.cloneNode(true);
    primaryClone.classList.add("fallback-primary-btn");
    actions.appendChild(primaryClone);
  }

  // clone language buttons
  const langWrapper = document.createElement("div");
  langWrapper.className = "mobile-fallback-lang";
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((b) => {
    const btn = document.createElement("button");
    btn.className = "lang-btn fallback-lang-btn";
    const dataLang = b.getAttribute("data-lang") || "tr";
    btn.setAttribute("data-lang", dataLang);
    btn.textContent = b.textContent.trim();
    // Mark active if it matches current language
    if (dataLang === (localStorage.getItem("language") || "tr")) {
      btn.classList.add("active");
    }
    langWrapper.appendChild(btn);
  });

  actions.appendChild(langWrapper);

  // add theme toggle to fallback menu
  const fallbackThemeBtn = document.createElement("button");
  fallbackThemeBtn.type = "button";
  fallbackThemeBtn.className = "theme-toggle theme-toggle-fallback";
  fallbackThemeBtn.setAttribute("aria-label", "Toggle theme");
  const lightActive =
    document.documentElement.classList.contains("theme-light");
  fallbackThemeBtn.setAttribute("aria-pressed", lightActive ? "true" : "false");
  fallbackThemeBtn.title = lightActive ? "Aydın tema" : "Karanlık tema";
  fallbackThemeBtn.innerText = lightActive ? "✨" : "🌙";
  actions.appendChild(fallbackThemeBtn);

  inner.appendChild(actions);

  fallback.appendChild(inner);
  document.body.appendChild(fallback);

  // Close when clicking overlay background
  fallback.addEventListener("click", (e) => {
    if (e.target === fallback) {
      closeMenuFallback();
    }
  });

  // Wire up links inside fallback to close menu and navigate
  fallback.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      // allow normal anchor behaviour (scroll) then close
      setTimeout(() => {
        closeMenuFallback();
      }, 50);
    });
  });

  // Wire language buttons in fallback menu
  fallback.querySelectorAll(".fallback-lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      // Trigger the language change via the original buttons
      const originalBtn = document.querySelector(
        `.lang-btn[data-lang="${lang}"]`,
      );
      if (originalBtn) originalBtn.click();
    });
  });

  // Helper to sync fallback texts and active state with the main nav and language
  function syncFallback() {
    const currentLang = localStorage.getItem("language") || "tr";
    // sync active state for fallback lang buttons
    fallback.querySelectorAll(".fallback-lang-btn").forEach((b) => {
      if (b.getAttribute("data-lang") === currentLang)
        b.classList.add("active");
      else b.classList.remove("active");
    });

    // sync nav link texts from the main nav (use current DOM values)
    const primaryLinks = navMenuWrapper.querySelectorAll("a.nav-link");
    const fallbackLinks = fallback.querySelectorAll(
      ".mobile-fallback-links-list .fallback-link",
    );
    if (primaryLinks.length && fallbackLinks.length) {
      if (primaryLinks.length === fallbackLinks.length) {
        primaryLinks.forEach((a, i) => {
          fallbackLinks[i].textContent = a.textContent.trim();
        });
      } else {
        // match by href if counts differ
        fallbackLinks.forEach((fb) => {
          const href = fb.getAttribute("href");
          const match = Array.from(primaryLinks).find(
            (a) => a.getAttribute("href") === href,
          );
          if (match) fb.textContent = match.textContent.trim();
        });
      }
    }
  }

  // Initial sync and keep in sync when translations change
  syncFallback();
  document.addEventListener("languageChanged", () => syncFallback());

  function closeMenuFallback() {
    document
      .querySelectorAll(".menu-button")
      .forEach((b) => b.classList.remove("active"));
    fallback.classList.remove("open");
    document.body.classList.remove("nav-open");
  }
}

// ============================================
// 2. NAVBAR SCROLL EFFECT
// ============================================
function initializeNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
      navbar.classList.add("scroll-visible");
    } else {
      navbar.classList.remove("scrolled");
      navbar.classList.remove("scroll-visible");
    }
  });
}

function initializeSmoothTextareaResize() {
  const textareas = document.querySelectorAll("textarea.contact-input");
  if (!textareas.length) return;

  textareas.forEach((textarea) => {
    const resizeTextarea = () => {
      textarea.style.height = "auto";
      const nextHeight = Math.max(textarea.scrollHeight, 120);
      textarea.style.height = `${nextHeight}px`;
    };

    resizeTextarea();
    textarea.addEventListener("input", resizeTextarea);
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
  const serviceSections = document.querySelectorAll(".services-section");
  if (!serviceSections.length) return;

  const syncMode = () => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    serviceSections.forEach((section) => {
      const items = section.querySelectorAll(".service-item-wrap");
      if (!items.length) return;

      if (mobile) {
        section.classList.add("services-mobile-accordion");

        items.forEach((item) => {
          const serviceId = getServiceIdFromItem(item);
          if (!serviceId) return;

          let inlineContent = item.querySelector(".service-inline-content");
          if (!inlineContent) {
            inlineContent = document.createElement("div");
            inlineContent.className = "service-inline-content";
            item.appendChild(inlineContent);
          }

          if (!inlineContent.innerHTML.trim()) {
            const sourceBlock = section.querySelector("#content-" + serviceId);
            if (sourceBlock) inlineContent.innerHTML = sourceBlock.innerHTML;
          }
        });

        const currentActive =
          section.querySelector(".service-item-wrap.active-service") ||
          items[0];
        if (currentActive) openMobileServiceItem(currentActive, true);
      } else {
        section.classList.remove("services-mobile-accordion");
        items.forEach((item) => {
          const inlineContent = item.querySelector(".service-inline-content");
          if (inlineContent) inlineContent.classList.remove("active");
        });
      }
    });
  };

  syncMode();
  window.addEventListener("resize", syncMode);
}

function getServiceIdFromItem(item) {
  const onclick = item.getAttribute("onclick") || "";
  const match = onclick.match(/toggleService\('([^']+)'/);
  return match ? match[1] : null;
}

function openMobileServiceItem(item, forceOpen = false) {
  const section = item.closest(".services-section");
  if (!section) return;

  const items = section.querySelectorAll(".service-item-wrap");
  const wasActive = item.classList.contains("active-service");

  items.forEach((el) => {
    el.classList.remove("active-service");
    const inlineContent = el.querySelector(".service-inline-content");
    if (inlineContent) inlineContent.classList.remove("active");
  });

  if (wasActive && !forceOpen) return;

  item.classList.add("active-service");
  const inlineContent = item.querySelector(".service-inline-content");
  if (inlineContent) inlineContent.classList.add("active");
}

function toggleService(serviceId, element) {
  const section = element.closest(".services-section") || document;

  if (
    section.classList &&
    section.classList.contains("services-mobile-accordion") &&
    window.matchMedia("(max-width: 767px)").matches
  ) {
    openMobileServiceItem(element);
    return;
  }

  // Tıklanan öğe zaten aktif mi kontrol et
  const isActive = element.classList.contains("active-service");

  // Tüm butonlardan aktif sınıfını kaldır
  section
    .querySelectorAll(".service-item-wrap")
    .forEach((el) => el.classList.remove("active-service"));

  // Tüm içerik bloklarını gizle
  section
    .querySelectorAll(".content-block")
    .forEach((el) => el.classList.remove("active"));

  if (isActive) {
    // EĞER ZATEN AKTİFSE: Varsayılana dön (Reset)
    const defaultContent = section.querySelector("#content-default");
    if (defaultContent) defaultContent.classList.add("active");
  } else {
    // EĞER AKTİF DEĞİLSE: Yeni içeriği aç
    element.classList.add("active-service");

    const targetContent = section.querySelector("#content-" + serviceId);
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
  const t =
    window.SITE_TEXTS && window.SITE_TEXTS[currentLang]
      ? window.SITE_TEXTS[currentLang]
      : null;

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

  // Update modal section heads with translations (if available)
  if (t && t.modal) {
    if (t.modal.description)
      document.getElementById("modalLabelDescription").textContent =
        t.modal.description;
    if (t.modal.challenge)
      document.getElementById("modalLabelChallenge").textContent =
        t.modal.challenge;
    if (t.modal.solution)
      document.getElementById("modalLabelSolution").textContent =
        t.modal.solution;
    if (t.modal.results)
      document.getElementById("modalLabelResults").textContent =
        t.modal.results;
    if (t.modal.technologies)
      document.getElementById("modalLabelTechnologies").textContent =
        t.modal.technologies;
  }

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

  // Initial submit state (inactive until required fields are valid)
  updateSubmitButtonState(contactForm, inputs);

  // Add blur event listeners for real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input);
      updateSubmitButtonState(contactForm, inputs);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      }
      updateSubmitButtonState(contactForm, inputs);
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

function updateSubmitButtonState(form, inputs) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return;

  const requiredFields = Array.from(inputs).filter((input) => input.required);
  const allRequiredFilled = requiredFields.every(
    (field) => field.value.trim().length > 0,
  );

  const emailField = form.querySelector('input[type="email"]');
  const emailValid =
    !emailField ||
    !emailField.required ||
    (emailField.value.trim().length > 0 &&
      isValidEmail(emailField.value.trim()));

  const canSubmit = allRequiredFilled && emailValid;

  submitButton.disabled = !canSubmit;
  submitButton.style.opacity = canSubmit ? "1" : "0.55";
  submitButton.style.cursor = canSubmit ? "pointer" : "not-allowed";
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll("input, textarea");
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton ? submitButton.innerText : "";
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
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerText = "Gönderiliyor...";
      submitButton.style.opacity = "0.75";
      submitButton.style.cursor = "wait";
    }

    // Try to send using site config if available
    const contactConfig = window.SITE_CONFIG?.contact || {};
    const endpoint = contactConfig.endpoint;
    const contactEmail = contactConfig.email;
    const delivery =
      contactConfig.delivery ||
      ((contactConfig.useFetch ?? false) ? "endpoint" : "mailto");

    if (delivery === "endpoint" && endpoint) {
      // Post JSON to configured endpoint
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else if (delivery === "formsubmit" && contactEmail) {
      // No-backend option: formsubmit.co (first submit may require email activation)
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            _subject: data.subject || "New contact form message",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Formsubmit request failed");
      }
    } else if (contactEmail) {
      // Fallback: open user's mail client with prefilled subject/body
      const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(data.subject || "Contact")}&body=${encodeURIComponent("Name: " + data.name + "\nEmail: " + data.email + "\n\n" + data.message)}`;
      // Use location.href to open mail client; await a short delay to allow navigation
      window.location.href = mailto;
      // Give a short delay so the UX shows the sending state briefly
      await new Promise((resolve) => setTimeout(resolve, 600));
    } else {
      // No endpoint configured — preserve the previous simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

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
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
  } finally {
    if (submitButton) {
      submitButton.innerText = originalText;
    }
    updateSubmitButtonState(form, inputs);
  }
}
