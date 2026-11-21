(() => {
  const { DEFAULT_SETTINGS, GRADIENTS, SEARCH_ENGINES, QUOTES, I18N } = window.LuminaPresets;

  let settings = structuredClone(DEFAULT_SETTINGS);

  const el = {
    bgLayer: document.getElementById("bg-layer"),
    clockWidget: document.getElementById("clock-widget"),
    clockTime: document.getElementById("clock-time"),
    clockDate: document.getElementById("clock-date"),
    greetingWidget: document.getElementById("greeting-widget"),
    searchWidget: document.getElementById("search-widget"),
    searchEngineBtn: document.getElementById("search-engine-btn"),
    searchEngineLabel: document.getElementById("search-engine-label"),
    searchInput: document.getElementById("search-input"),
    linksWidget: document.getElementById("links-widget"),
    linksGrid: document.getElementById("links-grid"),
    focusWidget: document.getElementById("focus-widget"),
    focusPromptWrap: document.getElementById("focus-prompt-wrap"),
    focusLabel: document.querySelector(".focus-label"),
    focusInput: document.getElementById("focus-input"),
    focusActiveWrap: document.getElementById("focus-active-wrap"),
    focusCheckBtn: document.getElementById("focus-check-btn"),
    focusText: document.getElementById("focus-text"),
    focusClearBtn: document.getElementById("focus-clear-btn"),
    weatherWidget: document.getElementById("weather-widget"),
    weatherIcon: document.getElementById("weather-icon"),
    weatherTemp: document.getElementById("weather-temp"),
    weatherCity: document.getElementById("weather-city"),
    quoteWidget: document.getElementById("quote-widget"),
    quoteText: document.getElementById("quote-text"),
    quoteAuthor: document.getElementById("quote-author"),
    bgCredit: document.getElementById("bg-credit"),
    btnRefreshBg: document.getElementById("btn-refresh-bg"),
    btnOpenSettings: document.getElementById("btn-open-settings"),
    btnCloseSettings: document.getElementById("btn-close-settings"),
    settingsBackdrop: document.getElementById("settings-backdrop"),
    settingsDrawer: document.getElementById("settings-drawer"),
    optName: document.getElementById("opt-name"),
    optLang: document.getElementById("opt-lang"),
    optFont: document.getElementById("opt-font"),
    optShowClock: document.getElementById("opt-show-clock"),
    opt24h: document.getElementById("opt-24h"),
    optSeconds: document.getElementById("opt-seconds"),
    optShowGreeting: document.getElementById("opt-show-greeting"),
    optShowSearch: document.getElementById("opt-show-search"),
    optShowLinks: document.getElementById("opt-show-links"),
    optShowFocus: document.getElementById("opt-show-focus"),
    optShowWeather: document.getElementById("opt-show-weather"),
    optShowQuote: document.getElementById("opt-show-quote"),
    optCity: document.getElementById("opt-city"),
    btnSaveCity: document.getElementById("btn-save-city"),
    optBgMode: document.getElementById("opt-bg-mode"),
    gradientPicker: document.getElementById("gradient-picker"),
    customBgControls: document.getElementById("custom-bg-controls"),
    optBgUrl: document.getElementById("opt-bg-url"),
    btnApplyUrl: document.getElementById("btn-apply-url"),
    optBgFile: document.getElementById("opt-bg-file"),
    optBlur: document.getElementById("opt-blur"),
    valBlur: document.getElementById("val-blur"),
    optDim: document.getElementById("opt-dim"),
    valDim: document.getElementById("val-dim"),
    linksManagerList: document.getElementById("links-manager-list"),
    newLinkTitle: document.getElementById("new-link-title"),
    newLinkUrl: document.getElementById("new-link-url"),
    btnAddLink: document.getElementById("btn-add-link"),
    btnExport: document.getElementById("btn-export"),
    optImport: document.getElementById("opt-import"),
    btnReset: document.getElementById("btn-reset")
  };

  async function saveSettings() {
    await window.LuminaStorage.set(settings);
  }

  function applyTypographyAndVisibility() {
    document.body.className = `font-${settings.font}`;
    el.clockWidget.classList.toggle("hidden", !settings.showClock);
    el.greetingWidget.classList.toggle("hidden", !settings.showGreeting);
    el.searchWidget.classList.toggle("hidden", !settings.showSearch);
    el.linksWidget.classList.toggle("hidden", !settings.showLinks);
    el.focusWidget.classList.toggle("hidden", !settings.showFocus);
    el.weatherWidget.classList.toggle("hidden", !settings.showWeather);
    el.quoteWidget.classList.toggle("hidden", !settings.showQuote);

    const t = I18N[settings.lang] || I18N.en;
    el.searchInput.placeholder = t.searchPlaceholder;
    el.focusLabel.textContent = t.focusLabel;
    el.focusInput.placeholder = t.focusPlaceholder;
  }

  function updateClockAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");

    let timeStr = "";
    if (settings.use24h) {
      timeStr = `${String(hours).padStart(2, "0")}:${mins}`;
    } else {
      const h12 = hours % 12 || 12;
      timeStr = `${h12}:${mins}`;
    }
    if (settings.showSeconds) {
      timeStr += `:${secs}`;
    }
    el.clockTime.textContent = timeStr;

    const locale = settings.lang === "id" ? "id-ID" : "en-US";
    el.clockDate.textContent = now.toLocaleDateString(locale, {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

    const t = I18N[settings.lang] || I18N.en;
    let greet = t.night;
    if (hours >= 5 && hours < 12) greet = t.morning;
    else if (hours >= 12 && hours < 16) greet = t.afternoon;
    else if (hours >= 16 && hours < 20) greet = t.evening;

    const namePart = settings.name.trim() ? `, ${settings.name.trim()}` : "";
    el.greetingWidget.textContent = `${greet}${namePart}.`;
  }

  function renderBackground() {
    document.documentElement.style.setProperty("--bg-blur", `${settings.blur}px`);
    document.documentElement.style.setProperty("--bg-dim", String(settings.dim / 100));

    el.gradientPicker.classList.toggle("hidden", settings.bgMode !== "gradient");
    el.customBgControls.classList.toggle("hidden", settings.bgMode !== "custom");

    if (settings.bgMode === "gradient") {
      const g = GRADIENTS.find((item) => item.id === settings.gradientId) || GRADIENTS[0];
      el.bgLayer.style.backgroundImage = g.css;
      el.bgCredit.textContent = g.name;
    } else if (settings.bgMode === "photo") {
      const url = `https://picsum.photos/1920/1080?random=${settings.photoSeed}`;
      el.bgLayer.style.backgroundImage = `url("${url}")`;
      el.bgCredit.textContent = "Picsum Photography";
    } else if (settings.bgMode === "custom") {
      if (settings.customBgUrl) {
        el.bgLayer.style.backgroundImage = `url("${settings.customBgUrl}")`;
        el.bgCredit.textContent = "Custom Background";
      } else {
        el.bgLayer.style.backgroundImage = GRADIENTS[0].css;
        el.bgCredit.textContent = "";
      }
    }
  }

  function renderGradientSwatches() {
    el.gradientPicker.innerHTML = "";
    GRADIENTS.forEach((g) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gradient-swatch" + (g.id === settings.gradientId ? " active" : "");
      btn.style.backgroundImage = g.css;
      btn.title = g.name;
      btn.addEventListener("click", () => {
        settings.bgMode = "gradient";
        settings.gradientId = g.id;
        el.optBgMode.value = "gradient";
        renderGradientSwatches();
        renderBackground();
        saveSettings();
      });
      el.gradientPicker.appendChild(btn);
    });
  }

  function renderSearchEngine() {
    const engine = SEARCH_ENGINES[settings.searchEngine] || SEARCH_ENGINES.google;
    el.searchEngineLabel.textContent = engine.label;
    el.searchEngineBtn.title = `Search with ${engine.name} (click to switch)`;
  }

  function getDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  }

  function renderLinks() {
    el.linksGrid.innerHTML = "";
    settings.links.forEach((link) => {
      const a = document.createElement("a");
      a.className = "link-chip";
      a.href = link.url;
      a.rel = "noopener noreferrer";

      const domain = getDomain(link.url);
      if (domain) {
        const img = document.createElement("img");
        img.className = "link-favicon";
        img.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
        img.alt = "";
        img.addEventListener("error", () => {
          img.remove();
        });
        a.appendChild(img);
      } else {
        const mono = document.createElement("span");
        mono.className = "link-monogram";
        mono.textContent = (link.title || "?").charAt(0).toUpperCase();
        a.appendChild(mono);
      }

      const span = document.createElement("span");
      span.textContent = link.title;
      a.appendChild(span);
      el.linksGrid.appendChild(a);
    });
  }

  function renderLinksManager() {
    el.linksManagerList.innerHTML = "";
    settings.links.forEach((link, idx) => {
      const item = document.createElement("div");
      item.className = "link-manager-item";

      const meta = document.createElement("div");
      meta.className = "link-manager-meta";
      const strong = document.createElement("strong");
      strong.textContent = link.title;
      const span = document.createElement("span");
      span.textContent = link.url;
      meta.append(strong, span);

      const del = document.createElement("button");
      del.type = "button";
      del.className = "link-delete-btn";
      del.innerHTML = "&times;";
      del.title = "Remove link";
      del.addEventListener("click", () => {
        settings.links.splice(idx, 1);
        renderLinks();
        renderLinksManager();
        saveSettings();
      });

      item.append(meta, del);
      el.linksManagerList.appendChild(item);
    });
  }

  function renderFocus() {
    if (settings.focusText) {
      el.focusPromptWrap.classList.add("hidden");
      el.focusActiveWrap.classList.remove("hidden");
      el.focusText.textContent = settings.focusText;
      el.focusText.classList.toggle("done", settings.focusDone);
      el.focusCheckBtn.classList.toggle("done", settings.focusDone);
    } else {
      el.focusPromptWrap.classList.remove("hidden");
      el.focusActiveWrap.classList.add("hidden");
      el.focusInput.value = "";
    }
  }

  function renderQuote() {
    const dayIndex = Math.floor(Date.now() / 86400000) % QUOTES.length;
    const q = QUOTES[dayIndex];
    el.quoteText.textContent = `“${q.text}”`;
    el.quoteAuthor.textContent = `— ${q.author}`;
  }

  function weatherCodeToIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  }

  async function fetchWeather() {
    if (!settings.showWeather) return;
    try {
      let lat, lon, cityName;
      if (settings.city.trim()) {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(settings.city.trim())}&count=1`
        );
        const geoData = await geoRes.json();
        if (!geoData.results || !geoData.results.length) {
          el.weatherCity.textContent = "City not found";
          el.weatherTemp.textContent = "--°";
          return;
        }
        lat = geoData.results[0].latitude;
        lon = geoData.results[0].longitude;
        cityName = geoData.results[0].name;
      } else {
        const pos = await new Promise((resolve, reject) => {
          if (!navigator.geolocation) return reject(new Error("No geo"));
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 6000 });
        });
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
        cityName = "Local";
      }

      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
      );
      const wData = await wRes.json();
      const temp = Math.round(wData.current.temperature_2m);
      const code = wData.current.weather_code;

      el.weatherIcon.textContent = weatherCodeToIcon(code);
      el.weatherTemp.textContent = `${temp}°C`;
      el.weatherCity.textContent = cityName;
    } catch {
      el.weatherIcon.textContent = "🌤️";
      el.weatherTemp.textContent = "--°";
      el.weatherCity.textContent = settings.city || "Set city";
    }
  }

  function syncSettingsUI() {
    el.optName.value = settings.name;
    el.optLang.value = settings.lang;
    el.optFont.value = settings.font;
    el.optShowClock.checked = settings.showClock;
    el.opt24h.checked = settings.use24h;
    el.optSeconds.checked = settings.showSeconds;
    el.optShowGreeting.checked = settings.showGreeting;
    el.optShowSearch.checked = settings.showSearch;
    el.optShowLinks.checked = settings.showLinks;
    el.optShowFocus.checked = settings.showFocus;
    el.optShowWeather.checked = settings.showWeather;
    el.optShowQuote.checked = settings.showQuote;
    el.optCity.value = settings.city;
    el.optBgMode.value = settings.bgMode;
    el.optBgUrl.value = settings.customBgUrl.startsWith("data:") ? "" : settings.customBgUrl;
    el.optBlur.value = settings.blur;
    el.valBlur.textContent = `${settings.blur}px`;
    el.optDim.value = settings.dim;
    el.valDim.textContent = `${settings.dim}%`;
  }

  function openDrawer() {
    el.settingsBackdrop.classList.remove("hidden");
    el.settingsDrawer.classList.remove("hidden");
  }

  function closeDrawer() {
    el.settingsBackdrop.classList.add("hidden");
    el.settingsDrawer.classList.add("hidden");
  }

  function bindEvents() {
    // Keyboard shortcut '/' for search, 'Escape' to close drawer
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement.tagName !== "INPUT") {
        e.preventDefault();
        el.searchInput.focus();
      } else if (e.key === "Escape") {
        closeDrawer();
      }
    });

    // Search
    el.searchEngineBtn.addEventListener("click", () => {
      const keys = Object.keys(SEARCH_ENGINES);
      const next = keys[(keys.indexOf(settings.searchEngine) + 1) % keys.length];
      settings.searchEngine = next;
      renderSearchEngine();
      saveSettings();
    });

    el.searchWidget.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = el.searchInput.value.trim();
      if (!q) return;
      const engine = SEARCH_ENGINES[settings.searchEngine] || SEARCH_ENGINES.google;
      window.location.href = engine.url + encodeURIComponent(q);
    });

    // Focus
    el.focusInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = el.focusInput.value.trim();
        if (!val) return;
        settings.focusText = val;
        settings.focusDone = false;
        renderFocus();
        saveSettings();
      }
    });

    el.focusCheckBtn.addEventListener("click", () => {
      settings.focusDone = !settings.focusDone;
      renderFocus();
      saveSettings();
    });

    el.focusClearBtn.addEventListener("click", () => {
      settings.focusText = "";
      settings.focusDone = false;
      renderFocus();
      saveSettings();
    });

    // Refresh background quick button
    el.btnRefreshBg.addEventListener("click", () => {
      if (settings.bgMode === "photo") {
        settings.photoSeed = Math.floor(Math.random() * 100000);
      } else {
        settings.bgMode = "gradient";
        const idx = GRADIENTS.findIndex((g) => g.id === settings.gradientId);
        settings.gradientId = GRADIENTS[(idx + 1) % GRADIENTS.length].id;
        el.optBgMode.value = "gradient";
        renderGradientSwatches();
      }
      renderBackground();
      saveSettings();
    });

    // Weather click refresh
    el.weatherWidget.addEventListener("click", fetchWeather);

    // Drawer open/close
    el.btnOpenSettings.addEventListener("click", openDrawer);
    el.btnCloseSettings.addEventListener("click", closeDrawer);
    el.settingsBackdrop.addEventListener("click", closeDrawer);

    // General inputs
    el.optName.addEventListener("input", () => {
      settings.name = el.optName.value;
      updateClockAndGreeting();
      saveSettings();
    });

    el.optLang.addEventListener("change", () => {
      settings.lang = el.optLang.value;
      applyTypographyAndVisibility();
      updateClockAndGreeting();
      saveSettings();
    });

    el.optFont.addEventListener("change", () => {
      settings.font = el.optFont.value;
      applyTypographyAndVisibility();
      saveSettings();
    });

    // Widget toggles
    const toggles = [
      ["optShowClock", "showClock"],
      ["opt24h", "use24h"],
      ["optSeconds", "showSeconds"],
      ["optShowGreeting", "showGreeting"],
      ["optShowSearch", "showSearch"],
      ["optShowLinks", "showLinks"],
      ["optShowFocus", "showFocus"],
      ["optShowWeather", "showWeather"],
      ["optShowQuote", "showQuote"]
    ];

    toggles.forEach(([domKey, settingKey]) => {
      el[domKey].addEventListener("change", () => {
        settings[settingKey] = el[domKey].checked;
        applyTypographyAndVisibility();
        updateClockAndGreeting();
        if (settingKey === "showWeather" && settings.showWeather) fetchWeather();
        saveSettings();
      });
    });

    // Weather city
    el.btnSaveCity.addEventListener("click", () => {
      settings.city = el.optCity.value.trim();
      saveSettings();
      fetchWeather();
    });

    // Background mode & sliders
    el.optBgMode.addEventListener("change", () => {
      settings.bgMode = el.optBgMode.value;
      renderBackground();
      saveSettings();
    });

    el.btnApplyUrl.addEventListener("click", () => {
      const url = el.optBgUrl.value.trim();
      if (!url) return;
      settings.bgMode = "custom";
      settings.customBgUrl = url;
      renderBackground();
      saveSettings();
    });

    el.optBgFile.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        settings.bgMode = "custom";
        settings.customBgUrl = reader.result;
        renderBackground();
        saveSettings();
      };
      reader.readAsDataURL(file);
    });

    el.optBlur.addEventListener("input", () => {
      settings.blur = Number(el.optBlur.value);
      el.valBlur.textContent = `${settings.blur}px`;
      renderBackground();
      saveSettings();
    });

    el.optDim.addEventListener("input", () => {
      settings.dim = Number(el.optDim.value);
      el.valDim.textContent = `${settings.dim}%`;
      renderBackground();
      saveSettings();
    });

    // Add link
    el.btnAddLink.addEventListener("click", () => {
      const title = el.newLinkTitle.value.trim();
      let url = el.newLinkUrl.value.trim();
      if (!title || !url) return;
      if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
      settings.links.push({ title, url });
      el.newLinkTitle.value = "";
      el.newLinkUrl.value = "";
      renderLinks();
      renderLinksManager();
      saveSettings();
    });

    // Export / Import / Reset
    el.btnExport.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "lumina-tab-settings.json";
      a.click();
      URL.revokeObjectURL(url);
    });

    el.optImport.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const parsed = JSON.parse(reader.result);
          settings = { ...structuredClone(DEFAULT_SETTINGS), ...parsed };
          await saveSettings();
          initUI();
        } catch {
          // Ignore malformed JSON
        }
      };
      reader.readAsText(file);
    });

    el.btnReset.addEventListener("click", async () => {
      settings = structuredClone(DEFAULT_SETTINGS);
      await window.LuminaStorage.clear();
      initUI();
    });
  }

  function initUI() {
    syncSettingsUI();
    applyTypographyAndVisibility();
    updateClockAndGreeting();
    renderGradientSwatches();
    renderBackground();
    renderSearchEngine();
    renderLinks();
    renderLinksManager();
    renderFocus();
    renderQuote();
    fetchWeather();
  }

  async function boot() {
    const saved = await window.LuminaStorage.get();
    if (saved) {
      settings = { ...structuredClone(DEFAULT_SETTINGS), ...saved };
    }
    bindEvents();
    initUI();
    setInterval(updateClockAndGreeting, 1000);
  }

  boot();
})();
