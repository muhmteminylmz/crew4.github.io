// Language translations for Crew4 website
// Primary source is `window.SITE_TEXTS` (loaded from JSON). The large inline fallback has been removed
// to avoid duplication; page HTML contains default text and `site-texts.json` populates dynamic content.

// Get current language from localStorage or default to 'tr'
function getCurrentLanguage() {
  return localStorage.getItem("language") || "tr";
}

// Set language and update the page
function setLanguage(lang) {
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;
  updatePageLanguage(lang);
}

// Update all translatable elements
function updatePageLanguage(lang) {
  const t =
    window.SITE_TEXTS && window.SITE_TEXTS[lang]
      ? window.SITE_TEXTS[lang]
      : null;

  // If a JSON-backed translation object is available, apply it to data-translate targets.
  if (t) {
    // Update all elements with data-translate attribute
    document.querySelectorAll("[data-translate]").forEach((el) => {
      const keys = el.getAttribute("data-translate").split(".");
      let value = t;

      for (const key of keys) {
        value = value ? value[key] : null;
      }

      if (value) {
        el.textContent = value;
      }
    });

    // Update all input placeholders
    document.querySelectorAll("[data-translate-placeholder]").forEach((el) => {
      const keys = el.getAttribute("data-translate-placeholder").split(".");
      let value = t;

      for (const key of keys) {
        value = value ? value[key] : null;
      }

      if (value) {
        el.placeholder = value;
      }
    });

    // Update element content with inner HTML
    document.querySelectorAll("[data-translate-html]").forEach((el) => {
      const keys = el.getAttribute("data-translate-html").split(".");
      let value = t;

      for (const key of keys) {
        value = value ? value[key] : null;
      }

      if (value) {
        el.innerHTML = value;
      }
    });
  }

  // Apply site content from external `site-texts.js` if available.
  // Elements should use `data-content-key`, `data-content-html`, or `data-content-placeholder`.
  if (window.SITE_TEXTS && window.SITE_TEXTS[lang]) {
    const s = window.SITE_TEXTS[lang];

    document.querySelectorAll("[data-content-key]").forEach((el) => {
      const keys = el.getAttribute("data-content-key").split(".");
      let value = s;
      for (const key of keys) {
        value = value ? value[key] : null;
      }
      if (value) el.textContent = value;
    });

    document.querySelectorAll("[data-content-html]").forEach((el) => {
      const keys = el.getAttribute("data-content-html").split(".");
      let value = s;
      for (const key of keys) {
        value = value ? value[key] : null;
      }
      if (value) el.innerHTML = value;
    });

    document.querySelectorAll("[data-content-placeholder]").forEach((el) => {
      const keys = el.getAttribute("data-content-placeholder").split(".");
      let value = s;
      for (const key of keys) {
        value = value ? value[key] : null;
      }
      if (value) el.placeholder = value;
    });
  }

  // Update page title
  if (lang === "en") {
    document.title =
      "Crew4 - Digital Advertising & Design Agency | Web Design Services";
  } else {
    document.title =
      "Crew4 - Dijital Reklam & Tasarım Ajansı | Web Tasarım SEO Hizmetleri";
  }

  // Update active state for language buttons (desktop and fallback)
  document.querySelectorAll(".lang-btn, .fallback-lang-btn").forEach((btn) => {
    const bLang = btn.getAttribute("data-lang");
    if (bLang === lang) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  // If mobile fallback menu exists, sync its nav link texts with the primary nav
  const fallback = document.getElementById("mobileFallbackMenu");
  const navMenuWrapper = document.querySelector(".nav-menu-wrapper");
  if (fallback && navMenuWrapper) {
    const primaryLinks = navMenuWrapper.querySelectorAll("a.nav-link");
    const fallbackLinks = fallback.querySelectorAll(
      ".mobile-fallback-links-list .fallback-link",
    );
    // Match by index/href where possible
    if (primaryLinks.length && fallbackLinks.length) {
      // If counts mismatch, try matching by href
      if (primaryLinks.length === fallbackLinks.length) {
        primaryLinks.forEach((a, i) => {
          fallbackLinks[i].textContent = a.textContent.trim();
        });
      } else {
        // Fallback: match by href
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

  // Dispatch an event in case other modules want to react
  document.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getCurrentLanguage();
  updatePageLanguage(currentLang);

  // Update language button
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    if (btn.getAttribute("data-lang") === currentLang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
});
