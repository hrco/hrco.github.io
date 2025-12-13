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
        'DESCRIPTION': { 'en': 'Welcome to my portfolio website, created with a reusable, pure HTML/CSS/JS template. Check out the clean theme and language toggles!', 'sl': 'Dobrodošli na moji spletni strani, ustvarjeni s predlogo za večkratno uporabo, v čistem HTML/CSS/JS. Preizkusite čisto menjavo teme in jezika!' },
        'SUGGESTIONS_TITLE': { 'en': 'My Suggestions of worthy Influencers', 'sl': 'Moja Priporočila vrednih Influencerjev' },
        'SUGGESTIONS_INTRO': { 'en': 'A curated list of individuals whose content I find consistently valuable and insightful across various fields, from science to philosophy.', 'sl': 'Izbran seznam posameznikov, katerih vsebino se mi zdi dosledno dragocena in pronicljiva na različnih področjih, od znanosti do filozofije.' },
        
        // Alan Woods
        'ALAN_WOODS_TITLE': { 'en': 'Alan Woods', 'sl': 'Alan Woods' },
        'ALAN_WOODS_DESC': { 'en': 'Veteran Marxist thinker and author, focusing on philosophy, history, and socialist theory.', 'sl': 'Veteranski marksistični mislec in avtor, ki se osredotoča na filozofijo, zgodovino in socialistično teorijo.' },
        
        // Joe Rogan
        'JOE_ROGAN_TITLE': { 'en': 'Joe Rogan', 'sl': 'Joe Rogan', },
        'JOE_ROGAN_DESC': { 'en': 'Host of The Joe Rogan Experience, covering everything from current events, comedy, fitness, and complex scientific topics.', 'sl': 'Gostitelj oddaje The Joe Rogan Experience, ki pokriva vse od aktualnih dogodkov, komedije, fitnesa in kompleksnih znanstvenih tem.' },
        
        // Lex Fridman
        'LEX_FRIDMAN_TITLE': { 'en': 'Lex Fridman', 'sl': 'Lex Fridman' },
        'LEX_FRIDMAN_DESC': { 'en': 'AI researcher and podcast host, known for deep, long-form interviews with leading figures in technology, science, and philosophy.', 'sl': 'Raziskovalec umetne inteligence in gostitelj podcastov, znan po dolgih, poglobljenih intervjujih z vodilnimi osebnostmi v tehnologiji, znanosti in filozofiji.' },
        
        // Andrew Huberman
        'HUBERMAN_TITLE': { 'en': 'Andrew Huberman', 'sl': 'Andrew Huberman' },
        'HUBERMAN_DESC': { 'en': 'Neuroscientist at Stanford, specializing in brain function, behavior, and tools for self-improvement based on scientific evidence.', 'sl': 'Nevroznanstvenik na Stanfordu, specializiran za delovanje možganov, vedenje in orodja za samoizboljšanje, ki temeljijo na znanstvenih dokazih.' },
        
        // Paul Stamets
        'STAMETS_TITLE': { 'en': 'Paul Stamets', 'sl': 'Paul Stamets' },
        'STAMETS_DESC': { 'en': 'Mycology expert and entrepreneur, dedicated to the medicinal and environmental benefits of mushrooms.', 'sl': 'Strokovnjak za mikologijo in podjetnik, posvečen zdravilnim in okoljskim koristim gob.' },

        //About_me.html
        'ABOUT_ME_TITLE': { 'en': 'About HRCO', 'sl': 'O Meni (HRCO)' },
        'ABOUT_ME_INTRO_TITLE': { 'en': 'Introduction & Background', 'sl': 'Uvod in Ozadje' },
        'ABOUT_ME_INTRO_P1': { 'en': 'Hello! I am HRCO, an enthusiast deeply involved in technology, photography, and personal growth. This portfolio showcases my journey and skills, built using a clean, custom-themed web template.', 'sl': 'Pozdravljeni! Sem HRCO, navdušenec, globoko vpleten v tehnologijo, fotografijo in osebno rast. Ta portfelj prikazuje mojo pot in spretnosti, zgrajen z uporabo čiste, prilagojene spletne predloge.' },
        'ABOUT_ME_INTRO_P2': { 'en': 'My main focus areas are system architecture, web development (especially clean JavaScript implementations), and exploring the synergy between engineering and creative pursuits.', 'sl': 'Moja glavna področja so sistemska arhitektura, spletni razvoj (zlasti čiste implementacije JavaScripta) in raziskovanje sinergije med inženiringom in ustvarjalnimi dejavnostmi.' },

        'EXPERIENCE_TITLE': { 'en': 'Key Experience & Skills', 'sl': 'Ključne Izkušnje in Spretnosti' },
        'EXP_1_TITLE': { 'en': 'System Architect & Developer', 'sl': 'Sistemski Arhitekt in Razvijalec' },
        'EXP_1_DESC': { 'en': 'Designing and implementing scalable, maintainable software systems with a focus on robust backend services and efficient front-end interfaces.', 'sl': 'Oblikovanje in implementacija razširljivih, vzdrževalnih programskih sistemov s poudarkom na robustnih zalednih storitvah in učinkovitih sprednjih vmesnikih.' },
        
        'EXP_2_TITLE': { 'en': 'Data Analysis & Automation', 'sl': 'Analiza Podatkov in Avtomatizacija' },
        'EXP_2_DESC': { 'en': 'Expertise in data modeling, scripting (Python/JS), and automating complex organizational workflows to boost efficiency.', 'sl': 'Strokovnost pri modeliranju podatkov, skriptiranju (Python/JS) in avtomatizaciji kompleksnih organizacijskih delovnih tokov za povečanje učinkovitosti.' },

        'SKILLS_TITLE': { 'en': 'Technical Toolkit', 'sl': 'Tehnično Orodje' },
        'SKILL_WEB': { 'en': 'Web (HTML5, CSS3/SASS, Vanilla JS)', 'sl': 'Splet (HTML5, CSS3/SASS, Vanilija JS)' },
        'SKILL_BACKEND': { 'en': 'Backend/System (Python, Node.js, Shell)', 'sl': 'Zaledje/Sistem (Python, Node.js, Shell)' },
        'SKILL_OTHER': { 'en': 'Other (DJI Platforms, Adobe Lightroom, GIS)', 'sl': 'Drugo (DJI Platforme, Adobe Lightroom, GIS)' },

       

        // Foto Page specific keys
        'FOTO_TITLE': { 'en': 'Photo & DJI Gallery', 'sl': 'FOTO Galerija' },
        'FOTO_INTRO': { 'en': 'A collection of my recent photography work, featuring landscape shots and aerial captures taken with DJI platforms. All images are processed with Adobe Lightroom.', 'sl': 'Zbirka mojih nedavnih fotografskih del, vključno s posnetki pokrajin in posnetki iz zraka, narejenimi s platformami DJI. Vse slike so obdelane z Adobe Lightroom.' },
        'FOTO_SECTION_1_TITLE': { 'en': 'Landscape Photography', 'sl': 'Pokrajinska Fotografija' },
        'FOTO_SECTION_2_TITLE': { 'en': 'Aerial (DJI) Showcase', 'sl': 'Predstavitev iz Zraka (DJI)' },
        'PHOTO_CAPTION_1': { 'en': 'Mountain view at sunrise.', 'sl': 'Pogled na gore ob sončnem vzhodu.' },
        'PHOTO_CAPTION_2': { 'en': 'Coastal path in the evening.', 'sl': 'Obalna pot zvečer.' },
        'DJI_CAPTION_1': { 'en': 'Drone shot over the river valley.', 'sl': 'Posnetek drona nad rečno dolino.' },


        // Footer Keys
        'FOOTER_TEXT': { 'en': 'Built by HRCO.', 'sl': 'Izdelal HRCO.' },
        // NOTE: The year will be added dynamically by the script
// ... add more keys for all translatable content
    };
// --- 3. Dynamic Footer/UI Enhancements ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
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
