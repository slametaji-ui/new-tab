window.LuminaPresets = {
  DEFAULT_SETTINGS: {
    name: "",
    lang: "en",
    font: "sans",
    showClock: true,
    use24h: true,
    showSeconds: false,
    showGreeting: true,
    showSearch: true,
    showLinks: true,
    showFocus: true,
    showWeather: true,
    showQuote: true,
    searchEngine: "google",
    city: "",
    bgMode: "gradient",
    gradientId: "aurora",
    photoSeed: 1,
    customBgUrl: "",
    blur: 0,
    dim: 25,
    focusText: "",
    focusDone: false,
    links: [
      { title: "YouTube", url: "https://www.youtube.com" },
      { title: "GitHub", url: "https://github.com" },
      { title: "Gmail", url: "https://mail.google.com" },
      { title: "ChatGPT", url: "https://chatgpt.com" }
    ]
  },

  GRADIENTS: [
    {
      id: "aurora",
      name: "Midnight Aurora",
      css: "radial-gradient(at 15% 20%, #1e3a8a 0px, transparent 55%), radial-gradient(at 85% 15%, #0f766e 0px, transparent 50%), radial-gradient(at 50% 85%, #4c1d95 0px, transparent 55%), #090d16"
    },
    {
      id: "sunset",
      name: "Warm Dusk",
      css: "radial-gradient(at 20% 20%, #9a3412 0px, transparent 55%), radial-gradient(at 80% 30%, #be185d 0px, transparent 50%), radial-gradient(at 50% 90%, #312e81 0px, transparent 60%), #130f1e"
    },
    {
      id: "ocean",
      name: "Deep Ocean",
      css: "radial-gradient(at 10% 10%, #0369a1 0px, transparent 50%), radial-gradient(at 85% 80%, #115e59 0px, transparent 55%), #07131d"
    },
    {
      id: "forest",
      name: "Forest Mist",
      css: "radial-gradient(at 25% 25%, #14532d 0px, transparent 55%), radial-gradient(at 80% 75%, #1e293b 0px, transparent 55%), #09110d"
    },
    {
      id: "rose",
      name: "Velvet Plum",
      css: "radial-gradient(at 20% 25%, #701a75 0px, transparent 55%), radial-gradient(at 85% 20%, #1e1b4b 0px, transparent 55%), #110b16"
    },
    {
      id: "slate",
      name: "Minimal Slate",
      css: "radial-gradient(at 50% 0%, #334155 0px, transparent 65%), #0f172a"
    }
  ],

  SEARCH_ENGINES: {
    google: { label: "G", name: "Google", url: "https://www.google.com/search?q=" },
    duckduckgo: { label: "DDG", name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
    bing: { label: "B", name: "Bing", url: "https://www.bing.com/search?q=" },
    perplexity: { label: "PX", name: "Perplexity", url: "https://www.perplexity.ai/search?q=" },
    youtube: { label: "YT", name: "YouTube", url: "https://www.youtube.com/results?search_query=" },
    github: { label: "GH", name: "GitHub", url: "https://github.com/search?q=" }
  },

  QUOTES: [
    { text: "Simplicity is about subtracting the obvious and adding the meaningful.", author: "John Maeda" },
    { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
    { text: "Focus is a matter of deciding what things you're not going to do.", author: "John Carmack" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Less, but better.", author: "Dieter Rams" },
    { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
    { text: "Clarity precedes mastery.", author: "Robin Sharma" },
    { text: "Well begun is half done.", author: "Aristotle" }
  ],

  I18N: {
    en: {
      morning: "Good morning",
      afternoon: "Good afternoon",
      evening: "Good evening",
      night: "Good night",
      searchPlaceholder: "Search the web... (press /)",
      focusLabel: "What is your main focus today?",
      focusPlaceholder: "Write your focus..."
    },
    id: {
      morning: "Selamat pagi",
      afternoon: "Selamat siang",
      evening: "Selamat sore",
      night: "Selamat malam",
      searchPlaceholder: "Cari di web... (tekan /)",
      focusLabel: "Apa fokus utamamu hari ini?",
      focusPlaceholder: "Tulis fokusmu..."
    }
  }
};
