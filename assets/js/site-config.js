(function () {
  const currentScript = document.currentScript;
  const fallbackBase = new URL(
    "assets/js/",
    window.location.origin + window.location.pathname,
  );
  const baseUrl = currentScript?.src
    ? new URL("./", currentScript.src)
    : fallbackBase;
  const configUrl = new URL("site-config.json", baseUrl).toString();

  async function loadConfig() {
    try {
      const res = await fetch(configUrl, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to load site-config.json");
      window.SITE_CONFIG = await res.json();
      document.dispatchEvent(new Event("siteConfigLoaded"));
    } catch (err) {
      console.warn("site-config not available:", err);
      window.SITE_CONFIG = window.SITE_CONFIG || {};
      document.dispatchEvent(new Event("siteConfigLoaded"));
    }
  }

  // Start loading immediately
  loadConfig();
})();
