/**
 * Cross-browser storage adapter.
 * Uses browser.storage.local (Firefox/Safari), chrome.storage.local (Chromium),
 * and falls back to localStorage when opened directly as a webpage.
 */
window.LuminaStorage = (() => {
  const STORAGE_KEY = "lumina_tab_settings_v1";

  const hasBrowserStorage =
    typeof browser !== "undefined" && browser.storage && browser.storage.local;
  const hasChromeStorage =
    typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

  async function get() {
    if (hasBrowserStorage) {
      const res = await browser.storage.local.get(STORAGE_KEY);
      return res[STORAGE_KEY] || null;
    }
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (res) => {
          resolve(res[STORAGE_KEY] || null);
        });
      });
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  async function set(data) {
    if (hasBrowserStorage) {
      await browser.storage.local.set({ [STORAGE_KEY]: data });
      return;
    }
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: data }, resolve);
      });
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore quota errors in fallback mode
    }
  }

  async function clear() {
    if (hasBrowserStorage) {
      await browser.storage.local.remove(STORAGE_KEY);
      return;
    }
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.remove([STORAGE_KEY], resolve);
      });
    }
    localStorage.removeItem(STORAGE_KEY);
  }

  return { get, set, clear };
})();
