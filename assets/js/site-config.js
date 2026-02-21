(function () {
  async function loadConfig() {
    try {
      const res = await fetch("assets/js/site-config.json", {
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
