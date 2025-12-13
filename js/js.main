/**
 * main.js - Handles Theme and Language Toggling
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggling Logic ---
    const themeToggleBright = document.getElementById('theme-toggle-bright');
    const themeToggleDark = document.getElementById('theme-toggle-dark');
    const themeToggleSystem = document.getElementById('theme-toggle-system');
    const body = document.body;

    // Helper to check system preference
    const isSystemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply the theme based on preference or system
    const applyTheme = (theme) => {
        body.classList.remove('theme-light', 'theme-dark');

        let activeTheme;
        if (theme === 'dark') {
            body.classList.add('theme-dark');
            activeTheme = 'dark';
        } else if (theme === 'light') {
            body.classList.add('theme-light');
            activeTheme = 'light';
        } else { // system
            if (isSystemDark()) {
                body.classList.add('theme-dark');
            } else {
                body.classList.add('theme-light');
            }
            activeTheme = 'system';
        }

        // Update button visual state
        [themeToggleBright, themeToggleDark, themeToggleSystem].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (activeTheme === 'light' && themeToggleBright) themeToggleBright.classList.add('active');
        if (activeTheme === 'dark' && themeToggleDark) themeToggleDark.classList.add('active');
        if (activeTheme === 'system' && themeToggleSystem) themeToggleSystem.classList.add('active');

        localStorage.setItem('theme', activeTheme);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Listen for system changes (if set to system)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === 'system') {
            applyTheme('system');
        }
    });

    // Event listeners for theme buttons
    if (themeToggleBright) themeToggleBright.addEventListener('click', () => applyTheme('light'));
    if (themeToggleDark) themeToggleDark.addEventListener('click', () => applyTheme('dark'));
    if (themeToggleSystem) themeToggleSystem.addEventListener('click', () => applyTheme('system'));


    // --- 2. Language Toggling Logic ---
    const langToggleSlo = document.getElementById('lang-toggle-slo');
    const langToggleEng = document.getElementById('lang-toggle-eng');

    // Simple dictionary for demonstration
    const content = {
        'HRCO_TITLE': { 'en': 'HRCO Portfolio', 'sl': 'HRCO Portfoljo' },
        'HOME_LINK': { 'en': 'Home', 'sl': 'Domov' },
        'FOTO_LINK': { 'en': 'Gallery', 'sl': 'Fotografije' },
        'ABOUT_LINK': { 'en': 'About Me', 'sl': 'O Meni' },
        'SUGGESTIONS_LINK': { 'en': 'Suggestions', 'sl': 'Priporočila' },
        'GREETING': { 'en': 'Hello, I am HRCO.', 'sl': 'Zdravo, sem HRCO.' },
        'DESCRIPTION': { 'en': 'Welcome to my portfolio website, created with a reusable, pure HTML/CSS/JS template. Check out the clean theme and language toggles!', 'sl': 'Dobrodošli na moji spletni strani, ustvarjeni s predlogo za večkratno uporabo, v čistem HTML/CSS/JS. Preizkusite čisto menjavo teme in jezika!' }
        // ... add more keys for all translatable content
    };

    const updateTextContent = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (content[key] && content[key][lang]) {
                element.textContent = content[key][lang];
            }
        });

        // Update button visual state
        [langToggleSlo, langToggleEng].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
        if (lang === 'sl' && langToggleSlo) langToggleSlo.classList.add('active');
        if (lang === 'en' && langToggleEng) langToggleEng.classList.add('active');

        localStorage.setItem('language', lang);
    };

    // Initialize Language
    const savedLanguage = localStorage.getItem('language') || 'en';
    updateTextContent(savedLanguage);

    // Event listeners for language buttons
    if (langToggleSlo) langToggleSlo.addEventListener('click', () => updateTextContent('sl'));
    if (langToggleEng) langToggleEng.addEventListener('click', () => updateTextContent('en'));
});
