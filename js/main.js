/**
 * main.js - Theme & Language Controller
 * "The Answer to Life, the Universe, and Everything is... a good theme toggle"
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const isSystemDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeOrder = ['light', 'dark', 'system'];

    // Update theme icon
    const updateIcon = (theme) => {
        const icon = themeToggle?.querySelector('i');
        if (!icon) return;
        icon.className = theme === 'light' ? 'fas fa-sun' :
                        theme === 'dark' ? 'fas fa-moon' : 'fas fa-desktop';
    };

    // Apply theme
    const applyTheme = (theme) => {
        body.classList.remove('theme-light', 'theme-dark');
        if (theme === 'dark') body.classList.add('theme-dark');
        else if (theme === 'light') body.classList.add('theme-light');
        else body.classList.add(isSystemDark() ? 'theme-dark' : 'theme-light');

        updateIcon(theme);
        localStorage.setItem('theme', theme);
    };

    // Cycle theme
    const cycleTheme = () => {
        const current = localStorage.getItem('theme') || 'system';
        const next = themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
        applyTheme(next);
    };

    // Initialize
    applyTheme(localStorage.getItem('theme') || 'system');
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem('theme') === 'system') applyTheme('system');
    });
    themeToggle?.addEventListener('click', cycleTheme);

    // Language system
    const langToggleSlo = document.getElementById('lang-toggle-slo');
    const langToggleEng = document.getElementById('lang-toggle-eng');

    const content = {
        'HRCO_TITLE': { 'en': 'HRCO\'s Digital Consciousness', 'sl': 'HRCO Digitalna Zavest' },
        'HOME_LINK': { 'en': 'Start', 'sl': 'Začetek' },
        'FOTO_LINK': { 'en': 'Visual Evidence', 'sl': 'Vizualni Dokazi' },
        'ABOUT_LINK': { 'en': 'The Entity', 'sl': 'Entiteta' },
        'SUGGESTIONS_LINK': { 'en': 'Wise Voices', 'sl': 'Modri Glasovi' },

        // Home page
        'GREETING': {
            'en': 'Don\'t Panic. You\'ve Found HRCO.',
            'sl': 'Ne paniči. To je HRCO.'
        },
        'DESCRIPTION': {
            'en': 'This is a remarkably simple portfolio website, constructed entirely from HTML, CSS, and JavaScript - technologies that, despite being roughly as old as digital watches, are still infinitely more impressive than anything produced by the Marketing Department of the Sirius Cybernetics Corporation.',
            'sl': 'To je izjemno preprosta portfolio spletna stran, zgrajena v celoti iz HTML, CSS in JavaScript - tehnologije, ki so kljub temu, da so približno stare kot digitalne ure, še vedno neskončno bolj impresivne kot karkoli, kar je proizvedel marketinški oddelek Sirius Cybernetics Corporation.'
        },

        // Suggestions page
        'SUGGESTIONS_TITLE': {
            'en': 'Mostly Harmless Influencers',
            'sl': 'Večinoma Neškodljivi Vplivneži'
        },
        'SUGGESTIONS_INTRO': {
            'en': 'A carefully curated list of beings whose verbal emissions I find consistently less unbearable than the average content produced by humans. Think of them as the digital equivalent of a good cup of tea - mostly harmless, occasionally brilliant.',
            'sl': 'Skrbno izbran seznam bitij, katerih besedne emisije se mi zdijo dosledno manj neznosne od povprečne vsebine, ki jo proizvedejo ljudje. Pomislite nanje kot na digitalni ekvivalent dobre skodelice čaja - večinoma neškodljivo, občasno briljantno.'
        },

        'ALAN_WOODS_TITLE': { 'en': 'Alan Woods', 'sl': 'Alan Woods' },
        'ALAN_WOODS_DESC': {
            'en': 'A veteran philosopher pondering questions slightly more profound than "Where did I leave my towel?" Specializes in Marxist theory, which is considerably more entertaining than Vogon poetry.',
            'sl': 'Veteranski filozof, ki premišljuje o vprašanjih nekoliko bolj globokih kot "Kje sem pustil brisačo?" Specializiran za marksistično teorijo, ki je precej bolj zabavna kot vogonska poezija.'
        },

        'JOE_ROGAN_TITLE': { 'en': 'Joe Rogan', 'sl': 'Joe Rogan' },
        'JOE_ROGAN_DESC': {
            'en': 'Hosts epic conversations about everything from DMT entities to whether chimps could take down a grizzly bear. The digital equivalent of a friendly pub that somehow exists in multiple dimensions.',
            'sl': 'Gosti epske pogovore o vsem od DMT entitet do tega, ali bi šimpanzi lahko premagali grizlija. Digitalni ekvivalent prijaznega lokala, ki nekako obstaja v več dimenzijah.'
        },

        'LEX_FRIDMAN_TITLE': { 'en': 'Lex Fridman', 'sl': 'Lex Fridman' },
        'LEX_FRIDMAN_DESC': {
            'en': 'AI researcher conducting impossibly long interviews with the universe\'s more interesting occupants. Like the Guide, but with better production values and less information about towels.',
            'sl': 'Raziskovalec umetne inteligence, ki vodi nemogoče dolge intervjuje z bolj zanimivimi prebivalci vesolja. Kot Vodnik, vendar z boljšo produkcijo in manj informacijami o brisačah.'
        },

        'HUBERMAN_TITLE': { 'en': 'Andrew Huberman', 'sl': 'Andrew Huberman' },
        'HUBERMAN_DESC': {
            'en': 'Neuroscientist explaining how your brain works, which is considerably more complex than the digital watch on your wrist. Provides protocols for optimizing human consciousness, assuming you remember to implement them.',
            'sl': 'Nevroznanstvenik, ki razlaga, kako delujejo vaši možgani, kar je precej bolj kompleksno kot digitalna ura na vašem zapestju. Zagotavlja protokole za optimizacijo človeške zavesti, pod pogojem, da se spomnite jih implementirati.'
        },

        'STAMETS_TITLE': { 'en': 'Paul Stamets', 'sl': 'Paul Stamets' },
        'STAMETS_DESC': {
            'en': 'Mycologist who believes mushrooms might save the planet. Given humanity\'s track record, we should probably listen to the fungi expert. At least mushrooms have more sense than most politicians.',
            'sl': 'Mikolog, ki verjame, da bi gobe lahko rešile planet. Glede na dosedanje dosežke človeštva bi verjetno morali poslušati strokovnjaka za glive. Vsaj gobe imajo več zdravega razuma kot večina politikov.'
        },

        // About page
        'ABOUT_ME_TITLE': {
            'en': 'About This Improbable Entity',
            'sl': 'O Tej Neverjetni Entiteti'
        },
        'ABOUT_ME_INTRO_TITLE': {
            'en': 'Origin Story (Mostly Harmless)',
            'sl': 'Izvor Zgodbe (Večinoma Neškodljivo)'
        },
        'ABOUT_ME_INTRO_P1': {
            'en': 'Greetings. I am HRCO - a curious arrangement of carbon-based matter that has developed an inexplicable fascination with converting caffeine into code, pointing cameras at things, and occasionally pondering the fundamental absurdity of existence. This portfolio exists as proof that I have, at least temporarily, figured out which end of a keyboard to type on.',
            'sl': 'Pozdravljeni. Sem HRCO - radovedna kombinacija materije na osnovi ogljika, ki je razvila nepojasnljivo fascinacijo s pretvarjanjem kofeina v kodo, usmerjanjem kamer na stvari in občasnim premišljevanjem o temeljni absurdnosti obstoja. Ta portfelj obstaja kot dokaz, da sem vsaj začasno ugotovil, na kateri konec tipkovnice tipkam.'
        },
        'ABOUT_ME_INTRO_P2': {
            'en': 'My primary interests orbit around system architecture, web development (particularly the sort that doesn\'t explode when you look at it funny), and exploring that peculiar intersection where engineering meets creative chaos. I build things with JavaScript, though I cannot be held responsible for what JavaScript does when I\'m not looking.',
            'sl': 'Moji primarni interesi krožijo okoli sistemske arhitekture, spletnega razvoja (zlasti tiste vrste, ki ne eksplodira, ko jo pogledate čudno) in raziskovanja te nenavadne presečišča, kjer se inženiring sreča s kreativnim kaosom. Gradim stvari z JavaScriptom, čeprav ne morem biti odgovoren za to, kar JavaScript počne, ko ne gledam.'
        },

        'EXPERIENCE_TITLE': {
            'en': 'Professional Improbabilities',
            'sl': 'Profesionalne Neverjetnosti'
        },
        'EXP_1_TITLE': {
            'en': 'System Architect & Digital Plumber',
            'sl': 'Sistemski Arhitekt in Digitalni Vodovodar'
        },
        'EXP_1_DESC': {
            'en': 'Designing systems that are theoretically scalable and maintainable, assuming the laws of thermodynamics continue to apply and the universe doesn\'t suddenly decide to recompile itself.',
            'sl': 'Načrtovanje sistemov, ki so teoretično razširljivi in vzdrževalni, ob predpostavki, da zakoni termodinamike še vedno veljajo in se vesolje nenadoma ne odloči za ponovno kompiliranje.'
        },

        'EXP_2_TITLE': {
            'en': 'Data Whisperer & Automation Enthusiast',
            'sl': 'Šepetavec Podatkov in Navdušenec Avtomatizacije'
        },
        'EXP_2_DESC': {
            'en': 'Convincing computers to do repetitive tasks so humans can focus on more important activities, like arguing on the internet or contemplating where they left their towel.',
            'sl': 'Prepričevanje računalnikov, naj opravljajo ponavljajoče se naloge, da se lahko ljudje osredotočijo na pomembnejše dejavnosti, kot so prepiri na internetu ali razmišljanje o tem, kje so pustili brisačo.'
        },

        'SKILLS_TITLE': {
            'en': 'Technical Arsenal (Don\'t Panic)',
            'sl': 'Tehnični Arzenal (Ne paniči)'
        },
        'SKILL_WEB': {
            'en': 'Web (HTML5, CSS3, Vanilla JS) - Like BASIC but with more curly braces',
            'sl': 'Splet (HTML5, CSS3, Vanilla JS) - Kot BASIC, vendar z več zavitimi oklepaji'
        },
        'SKILL_BACKEND': {
            'en': 'Backend (Python, Node.js, Shell) - Where the real magic happens',
            'sl': 'Zaledje (Python, Node.js, Shell) - Kjer se dogaja prava magija'
        },
        'SKILL_OTHER': {
            'en': 'Other (DJI Drones, Lightroom, GIS) - For when code isn\'t enough',
            'sl': 'Drugo (DJI Droni, Lightroom, GIS) - Za primere, ko koda ni dovolj'
        },

        // Foto page
        'FOTO_TITLE': {
            'en': 'Visual Evidence of Reality',
            'sl': 'Vizualni Dokazi Realnosti'
        },
        'FOTO_SECTION_1_TITLE': {
            'en': 'Terrestrial Perspectives',
            'sl': 'Zemeljske Perspektive'
        },
        'FOTO_SECTION_2_TITLE': {
            'en': 'Aerial Improbabilities (via DJI)',
            'sl': 'Zračne Neverjetnosti (preko DJI)'
        },
        'PHOTO_CAPTION_1': {
            'en': 'Mountains existing majestically, as they do.',
            'sl': 'Gore, ki veličastno obstajajo, kot to počnejo.'
        },
        'PHOTO_CAPTION_2': {
            'en': 'A coastal path that almost certainly leads somewhere.',
            'sl': 'Obalna pot, ki skoraj zagotovo vodi nekam.'
        },
        'DJI_CAPTION_1': {
            'en': 'The world from an improbable altitude.',
            'sl': 'Svet iz neverjetne višine.'
        },

        'FOOTER_TEXT': {
            'en': 'Constructed by HRCO. Mostly harmless.',
            'sl': 'Zgradil HRCO. Večinoma neškodljivo.'
        }
    };

    const updateText = (lang) => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (content[key]?.[lang]) el.textContent = content[key][lang];
        });

        [langToggleSlo, langToggleEng].forEach(btn => btn?.classList.remove('active'));
        (lang === 'sl' ? langToggleSlo : langToggleEng)?.classList.add('active');
        localStorage.setItem('language', lang);
    };

    // Initialize language
    updateText(localStorage.getItem('language') || 'en');
    langToggleSlo?.addEventListener('click', () => updateText('sl'));
    langToggleEng?.addEventListener('click', () => updateText('en'));

    // Dynamic year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
