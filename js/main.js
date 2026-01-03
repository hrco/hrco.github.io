/**
 * main.js - Language Controller
 * "The Answer to Life, the Universe, and Everything is... 42"
 */

document.addEventListener('DOMContentLoaded', () => {
    // Language system
    const langToggleSlo = document.getElementById('lang-toggle-slo');
    const langToggleEng = document.getElementById('lang-toggle-eng');

    const content = {
        'HRCO_TITLE': { 'en': 'HRCO\'s Digital Consciousness', 'sl': 'HRCO Digitalna Zavest' },
        'HOME_LINK': { 'en': 'Start', 'sl': 'Začetek' },
        'NEWS_LINK': { 'en': 'News', 'sl': 'Novice' },
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

        'LATEST_DIGEST': {
            'en': 'Latest Digest',
            'sl': 'Zadnji Povzetek'
        },
        'READ_FULL_DIGEST': {
            'en': 'Read full digest',
            'sl': 'Preberi celoten povzetek'
        },
        'VIEW_ARCHIVE': {
            'en': 'View archive',
            'sl': 'Poglej arhiv'
        },
        'UPDATED_LABEL': {
            'en': 'Updated:',
            'sl': 'Posodobljeno:'
        },
        'NO_ARCHIVE': {
            'en': 'No archive yet.',
            'sl': 'Ni še arhiva.'
        },
        'NO_DIGESTS': {
            'en': 'No digests yet.',
            'sl': 'Ni še povzetkov.'
        },
        'ITEMS_COUNT': {
            'en': 'items',
            'sl': 'postavk'
        },
        'SEARCH_PLACEHOLDER': {
            'en': 'Search articles...',
            'sl': 'Iskanje člankov...'
        },
        'FILTER_ALL': {
            'en': 'All',
            'sl': 'Vse'
        },
        'FILTER_TECH': {
            'en': 'Tech',
            'sl': 'Tehnologija'
        },
        'FILTER_SPORTS': {
            'en': 'Sports',
            'sl': 'Šport'
        },
        'FILTER_GAMING': {
            'en': 'Gaming',
            'sl': 'Igre'
        },
        'FILTER_SLOVENIAN': {
            'en': 'Slovenia',
            'sl': 'Slovenija'
        },
        'FILTER_SECURITY': {
            'en': 'Security',
            'sl': 'Varnost'
        },
        'FILTER_TRANSPARENCY': {
            'en': 'Leaks',
            'sl': 'Razkritja'
        },

        // News page
        'NEWS_TITLE': {
            'en': 'News Digest Archive | HRCO',
            'sl': 'Arhiv Novic | HRCO'
        },
        'NEWS_HEADING': {
            'en': 'News Digest Archive',
            'sl': 'Arhiv Novic'
        },
        'NEWS_INTRO': {
            'en': 'A chronological collection of digital discoveries, presented in reverse temporal order - because, as any hitchhiker knows, the future is just the past happening very slowly in the other direction.',
            'sl': 'Kronološka zbirka digitalnih odkritij, predstavljena v obratnem časovnem vrstnem redu - ker, kot ve vsak štopač, je prihodnost le preteklost, ki se dogaja zelo počasi v drugo smer.'
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

        // Gallery Section Headers
        'FOTO_SECTION_FOG': {
            'en': 'Morning Fog Chronicles',
            'sl': 'Kronike Jutranje Megle'
        },
        'FOTO_SECTION_WINTER': {
            'en': 'Winter Chronicles: The Cold Equations',
            'sl': 'Zimske Kronike: Mrzle Enačbe'
        },
        'FOTO_SECTION_RIVER': {
            'en': 'River Aerial Chronicles',
            'sl': 'Rečne Zračne Kronike'
        },
        'FOTO_SECTION_PASTORAL': {
            'en': 'Pastoral Improbabilities',
            'sl': 'Pastoralne Neverjetnosti'
        },

        // Photo Captions
        'PHOTO_01': {
            'en': 'Rivers meander. Fog settles. Mountains exist majestically. The universe continues ignoring our opinions about topology.',
            'sl': 'Reke vijugajo. Megla se spušča. Gore obstoijo veličastno. Vesolje še naprej ignorira naša mnenja o topologiji.'
        },
        'PHOTO_02': {
            'en': 'The sun rises, as it has done for roughly 4.6 billion years. Still impressive despite the repetition.',
            'sl': 'Sonce vzhaja, kot počne že približno 4,6 milijarde let. Še vedno impresivno kljub ponavljanju.'
        },
        'PHOTO_03': {
            'en': 'Pink fog at dawn - proof that the atmosphere occasionally produces better color schemes than the Sirius Cybernetics Corporation.',
            'sl': 'Rožnata megla ob zori - dokaz, da atmosfera občasno proizvede boljše barvne sheme kot Sirius Cybernetics Corporation.'
        },
        'PHOTO_04': {
            'en': 'Golden hour meets fog layer. Physics doing what it does best: being consistently photogenic.',
            'sl': 'Zlata ura sreča plast megle. Fizika dela, kar zna najbolje: biti dosledno fotogenična.'
        },
        'PHOTO_05': {
            'en': 'Fog trapped between hills like confusion trapped between Monday and coffee.',
            'sl': 'Megla ujeta med hribi kot zmeda ujeta med ponedeljkom in kavo.'
        },
        'PHOTO_06': {
            'en': 'Valley converted to cloud ocean. Villages emerge as improbable islands of civilization.',
            'sl': 'Dolina spremenjena v ocean oblakov. Vasi se pojavijo kot neverjetni otoki civilizacije.'
        },
        'PHOTO_07': {
            'en': 'Evening mist performing its nightly ritual of obscuring everything interesting.',
            'sl': 'Večerna megla izvaja svoj nočni ritual prikrivanja vsega zanimivega.'
        },
        'PHOTO_08': {
            'en': 'Sunrise with lens flare included at no extra charge. Reality providing free special effects since forever.',
            'sl': 'Sončni vzhod z odbleskom leč brez dodatnih stroškov. Realnost zagotavlja brezplačne specialne efekte od nekdaj.'
        },
        'PHOTO_09': {
            'en': 'Morning fog settles on hills like procrastination settles on Mondays. The road knows where it\'s going, which is more than most of us.',
            'sl': 'Jutranja megla se spušča na hribe kot odlašanje na ponedeljke. Cesta ve, kam gre, kar je več kot večina od nas.'
        },
        'PHOTO_10': {
            'en': 'Winter transforms landscape into high-contrast study of white versus everything else.',
            'sl': 'Zima spremeni pokrajino v visokokontrastno študijo bele proti vsemu drugemu.'
        },
        'PHOTO_11': {
            'en': 'River refuses to freeze. Trees covered in snow. Stubborn liquid water: 1, Thermodynamics: 0.',
            'sl': 'Reka se noče zamrzniti. Drevesa pokrita s snegom. Trmasta tekoča voda: 1, Termodinamika: 0.'
        },
        'PHOTO_12': {
            'en': 'Winter sunset demonstrating that cold doesn\'t prevent beauty, merely makes photography significantly more uncomfortable.',
            'sl': 'Zimski sončni zahod dokazuje, da mraz ne preprečuje lepote, samo naredi fotografiranje precej bolj neudobno.'
        },
        'PHOTO_13': {
            'en': 'Small waterfall creating localized disturbance in otherwise calm river. Very relatable.',
            'sl': 'Majhen slap ustvarja lokalno motnje v sicer mirni reki. Zelo relatable.'
        },
        'PHOTO_14': {
            'en': 'Humans camping by river. The ancient tradition of sleeping uncomfortably near water continues unabated.',
            'sl': 'Ljudje kampirajo ob reki. Starodavna tradicija neudobnega spanja blizu vode se nadaljuje nemoteno.'
        },
        'PHOTO_15': {
            'en': 'Where rivers meet and decide geography together. Democratic water distribution in action.',
            'sl': 'Kjer se reke srečajo in skupaj odločajo o geografiji. Demokratična distribucija vode v akciji.'
        },
        'PHOTO_16': {
            'en': 'River choosing to split. Clear evidence that even water can\'t make up its mind sometimes.',
            'sl': 'Reka se odloči razcepiti. Jasen dokaz, da se tudi voda včasih ne more odločiti.'
        },
        'PHOTO_17': {
            'en': 'Village nestled in valley. Humans building near water sources since discovering agriculture approximately 12,000 years ago.',
            'sl': 'Vas utesnjena v dolini. Ljudje gradijo blizu vodnih virov odkar so odkrili kmetijstvo približno pred 12.000 leti.'
        },
        'PHOTO_18': {
            'en': 'Agricultural fields arranged geometrically. Nature curved, humanity square. This tension defines civilization.',
            'sl': 'Kmetijska polja urejena geometrijsko. Narava ukrivljena, človeštvo kvadratno. Ta napetost definira civilizacijo.'
        },
        'PHOTO_19': {
            'en': 'River flowing between mountains with the confidence of having done this for millions of years.',
            'sl': 'Reka teče med gorami s samozavestjo, ki jo prinaša dejstvo, da to počne že milijone let.'
        },
        'PHOTO_20': {
            'en': 'The river from water level. Perspective: changed. Physics: still applicable.',
            'sl': 'Reka z ravni vode. Perspektiva: spremenjena. Fizika: še vedno veljavna.'
        },
        'PHOTO_21': {
            'en': 'Wide valley showcasing Earth\'s remarkable ability to be consistently scenic despite hosting humanity.',
            'sl': 'Široka dolina prikazuje izjemno sposobnost Zemlje, da je dosledno slikovita kljub gostovanju človeštva.'
        },
        'PHOTO_22': {
            'en': 'Sheeps from above. They remain unimpressed by aerial perspective. Dairy production continues regardless of viewpoint.',
            'sl': 'Ovce od zgoraj. Ostajajo neimpresionane z zračno perspektivo. Mlečna proizvodnja se nadaljuje ne glede na zorni kot.'
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

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (content[key]?.[lang]) el.placeholder = content[key][lang];
        });

        [langToggleSlo, langToggleEng].forEach(btn => btn?.classList.remove('active'));
        (lang === 'sl' ? langToggleSlo : langToggleEng)?.classList.add('active');
        localStorage.setItem('language', lang);
    };

    // Expose for other scripts
    window.updateText = updateText;

    // Initialize language
    updateText(localStorage.getItem('language') || 'en');
    langToggleSlo?.addEventListener('click', () => updateText('sl'));
    langToggleEng?.addEventListener('click', () => updateText('en'));

    // Dynamic year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
