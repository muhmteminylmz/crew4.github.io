// Loader that pulls canonical site texts from JSON and exposes them as `window.SITE_TEXTS`.
// Keeps the editable data in `assets/js/site-texts.json`.

(function () {
  const currentScript = document.currentScript;
  const fallbackBase = new URL(
    "assets/js/",
    window.location.origin + window.location.pathname,
  );
  const baseUrl = currentScript?.src
    ? new URL("./", currentScript.src)
    : fallbackBase;
  const url = new URL("site-texts.json", baseUrl).toString();

  function applySiteTexts(json) {
    window.SITE_TEXTS = json;
    // If translations are already initialized, re-run to apply content-driven nodes.
    try {
      if (typeof updatePageLanguage === "function") {
        const lang =
          typeof getCurrentLanguage === "function"
            ? getCurrentLanguage()
            : document.documentElement.lang || "tr";
        updatePageLanguage(lang);
      }
    } catch (e) {
      // ignore if translations.js not loaded yet
    }
    document.dispatchEvent(
      new CustomEvent("siteTextsLoaded", { detail: json }),
    );
  }

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch site texts JSON");
      return res.json();
    })
    .then((json) => applySiteTexts(json))
    .catch((err) => {
      console.warn("Could not load site texts JSON:", err);
    });
})();
