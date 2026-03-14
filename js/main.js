/**
 * main.js - Language Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.getElementById('main-nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('mobile-menu-open');
            const isExpanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('mobile-menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('mobile-menu-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Language system
    const langToggleSlo = document.getElementById('lang-toggle-slo');
    const langToggleEng = document.getElementById('lang-toggle-eng');

    const content = {

        // Global
        'HRCO_TITLE':   { 'en': 'HRCO — Valentin Križan', 'sl': 'HRCO — Valentin Križan' },
        'FOOTER_TEXT':  { 'en': 'Constructed by HRCO. Mostly harmless.', 'sl': 'Zgradil HRCO. Večinoma neškodljivo.' },

        // Nav
        'HOME_LINK':       { 'en': 'Start',      'sl': 'Začetek' },
        'NAV_VISUAL':      { 'en': 'Visual',      'sl': 'Vizualno' },
        'NAV_EXPERIENCE':  { 'en': 'Experience',  'sl': 'Izkušnje' },
        'NAV_ABOUT':       { 'en': 'About',       'sl': 'O meni' },

        // Hero — index.html
        'HERO_NAME':  { 'en': 'Valentin Križan', 'sl': 'Valentin Križan' },
        'HERO_TITLE': { 'en': 'Customer Experience & IT Professional', 'sl': 'Strokovnjak za UI in IT' },
        'HERO_META':  { 'en': 'Adlešiči, Slovenia · C1 English · EU Licence B', 'sl': 'Adlešiči, Slovenija · C1 angleščina · EU izpit B' },
        'HERO_EMAIL': { 'en': 'Email', 'sl': 'E-pošta' },
        'CURRENT_STATUS': {
            'en': 'Currently applying for CX roles in sustainable mobility.',
            'sl': 'Trenutno se prijavljam na CX vloge v trajnostni mobilnosti.'
        },

        // Skills strip
        'SKILL_CX':    { 'en': 'Customer Experience', 'sl': 'Uporabniške Izkušnje' },
        'SKILL_IT':    { 'en': 'Electronics & IT',    'sl': 'Elektronika in IT' },
        'SKILL_CNC':   { 'en': 'CNC / Laser',         'sl': 'CNC / Laser' },
        'SKILL_DRONE': { 'en': 'EASA Drone Pilot',    'sl': 'EASA Pilot drona' },
        'SKILL_SL':    { 'en': 'Slovenian',           'sl': 'Slovenščina' },
        'SKILL_EN':    { 'en': 'English C1',          'sl': 'Angleščina C1' },
        'SKILL_HR':    { 'en': 'Croatian',            'sl': 'Hrvaščina' },

        // Experience page
        'PROJECTS_TITLE':   { 'en': 'Experience | HRCO', 'sl': 'Izkušnje | HRCO' },
        'EXPERIENCE_TITLE': { 'en': 'Experience',         'sl': 'Izkušnje' },

        'EXP_1_DATE':    { 'en': '2025',              'sl': '2025' },
        'EXP_1_TITLE':   { 'en': 'Hospitality & Activity Coordinator', 'sl': 'Koordinator gostinstva in aktivnosti' },
        'EXP_1_COMPANY': { 'en': 'Kamp Jankovič, KOLPAS d.o.o.', 'sl': 'Kamp Jankovič, KOLPAS d.o.o.' },
        'EXP_1_DETAIL':  {
            'en': 'End-to-end guest experiences for over 50 daily visitors: waitering, kayak/SUP coordination, river logistics, ground transport, hospitality on the Kolpa river.',
            'sl': 'Celostne gostinske izkušnje za več kot 50 dnevnih obiskovalcev: strežba, koordinacija kajaka/SUP, rečna logistika, kopenski prevoz, gostoljubnost na reki Kolpi.'
        },

        'EXP_2_DATE':    { 'en': '2023–Dec 2025', 'sl': '2023–Dec 2025' },
        'EXP_2_TITLE':   { 'en': 'Facility Management Specialist', 'sl': 'Specialist upravljanja objektov' },
        'EXP_2_COMPANY': { 'en': 'FM OTiS, Valentin Križan S.P.', 'sl': 'FM OTiS, Valentin Križan S.P.' },
        'EXP_2_DETAIL':  {
            'en': 'Self-employed floor & wall finishing specialist — client consultation, project execution, quality control.',
            'sl': 'Samozaposleni strokovnjak za obdelavo tal in sten — svetovanje strankam, izvedba projektov, kontrola kakovosti.'
        },

        'EXP_3_DATE':    { 'en': 'May–Sep 2023', 'sl': 'Maj–Sep 2023' },
        'EXP_3_TITLE':   { 'en': 'On-site IT Support Contractor', 'sl': 'Pogodbeni IT sodelavec na terenu' },
        'EXP_3_COMPANY': { 'en': 'Microsoft Ljubljana', 'sl': 'Microsoft Ljubljana' },
        'EXP_3_DETAIL':  {
            'en': 'Managed IT inventory and debugged AV conference room setups — punctual and jargon-free support.',
            'sl': 'Upravljanje IT inventarja in odpravljanje napak v avdiovizualnih konferenčnih prostorih — natančna in razumljiva podpora.'
        },

        'EXP_4_DATE':    { 'en': '2022–2023', 'sl': '2022–2023' },
        'EXP_4_TITLE':   { 'en': 'Junior Technical Maintenance Specialist', 'sl': 'Mlajši strokovnjak tehničnega vzdrževanja' },
        'EXP_4_COMPANY': { 'en': 'LPP Fashion (Modne blagovne znamke d.o.o.)', 'sl': 'LPP Fashion (Modne blagovne znamke d.o.o.)' },
        'EXP_4_DETAIL':  {
            'en': 'Maintained 20+ retail stores via ticketing system — calm, fast solutions under pressure. Led vendor onboarding (Sintal) and negotiated a director-signed national service contract.',
            'sl': 'Vzdrževanje 20+ maloprodajnih trgovin prek sistema zahtevkov — mirne, hitre rešitve pod pritiskom. Vodil uvajanja dobaviteljev storitev (Sintal idr.) in pogajanja vezana na servisne storitve.'
        },

        'EXP_5_DATE':    { 'en': '2020–2023', 'sl': '2020–2023' },
        'EXP_5_TITLE':   { 'en': 'Self-Employed Computer Technician', 'sl': 'Samozaposleni računalniški tehnik' },
        'EXP_5_COMPANY': { 'en': 'Valentin Križan S.P.', 'sl': 'Valentin Križan S.P.' },
        'EXP_5_DETAIL':  {
            'en': 'Mobile & PC repairs, small networks — translated every fix into plain language for non-technical customers.',
            'sl': 'Popravila mobilnih naprav in računalnikov, implementacija in vzdrževanja manjših omrežij — popravila razložena v preprostem jeziku za manj tehnične stranke.'
        },

        'EXP_6_DATE':    { 'en': 'Dec 2021–Feb 2022', 'sl': 'Dec 2021–Feb 2022' },
        'EXP_6_TITLE':   { 'en': 'Electrical Cabinet Assembly', 'sl': 'Sestava in vezava elektro omar' },
        'EXP_6_COMPANY': { 'en': 'Elmers d.o.o. / TOBOL GmbH', 'sl': 'Elmers d.o.o. / TOBOL GmbH' },
        'EXP_6_DETAIL':  {
            'en': 'Full wiring & assembly per schematics — precision and quality focus.',
            'sl': 'Celotna vezava in sestavljanje po shemah s poudarkom na natančnosti in kakovosti.'
        },

        'EXP_7_DATE':    { 'en': 'May–Nov 2021', 'sl': 'Maj–Nov 2021' },
        'EXP_7_TITLE':   { 'en': '2D Laser Operator', 'sl': 'Operater 2D laserja' },
        'EXP_7_COMPANY': { 'en': 'Akrapovič d.d.', 'sl': 'Akrapovič d.d.' },
        'EXP_7_DETAIL':  {
            'en': 'Operating 2D Fibre-glass laser, parameter setup, material handling, understanding technical drawings & G-code.',
            'sl': 'Operater 2D laserja na steklena vlakna, nastavitve parametrov, rokovanje z materialom, razumevanje tehničnih risb in G-kode.'
        },

        'EXP_8_DATE':    { 'en': '2013–2020', 'sl': '2013–2020' },
        'EXP_8_TITLE':   { 'en': 'Drywall Systems & Quality Control', 'sl': 'Suho-montažni sistemi in kontrola kakovosti' },
        'EXP_8_COMPANY': { 'en': 'DAMONT d.o.o. & Montaža Grabrijan', 'sl': 'DAMONT d.o.o. & Montaža Grabrijan' },
        'EXP_8_DETAIL':  {
            'en': 'Knauf/Armstrong/AMF systems, measurements, quality checks.',
            'sl': 'Suho-montažni Sistemi Knauf/Armstrong/AMF, meritve, kontrola kakovosti.'
        },

        'EXP_9_DATE':    { 'en': '2005–2013', 'sl': '2005–2013' },
        'EXP_9_TITLE':   { 'en': 'Waiter & Shift Leader', 'sl': 'Natakar in vodja izmene' },
        'EXP_9_COMPANY': { 'en': 'KOLPAS d.o.o. / Napoleon Caffe', 'sl': 'KOLPAS d.o.o. / Napoleon Caffe' },
        'EXP_9_DETAIL':  {
            'en': 'Led team of workers, helped with organisaing events for more 100 guests where we turned every frustrated customer into a regular.',
            'sl': 'Vodil ekipo več oseb, sodeloval pri organizicijah prireditev za več 100+ gostov, kjer smo vsako nezadovoljno stranko spremenil v rednega obiskovalca.'
        },

        // About page
        'ABOUT_BIO': {
            'en': 'Stress-resistant professional with a background spanning customer hospitality, IT, electronics, and field operations. Making complexity disappear, whether it is diagnosing a broken network or coordinating many guests on a river. C1 English, EASA Drone Pilot, full EU driving licence.',
            'sl': 'Strokovnjak odporen na stres z izkušnjami na področju gostinstva, IT, elektronike in terenskih operacij. Kompleksno naredim preprosto, pa naj gre za odpravljanje napak v omrežju ali koordinacijo več gostov na reki. C1 angleščina, EASA pilot drona, polno EU vozniško dovoljenje.'
        },
        'ABOUT_CERTS_TITLE':   { 'en': 'Certifications', 'sl': 'Certifikati' },
        'ABOUT_LANG_TITLE':    { 'en': 'Languages',      'sl': 'Jeziki' },
        'ABOUT_CONTACT_TITLE': { 'en': 'Contact',        'sl': 'Kontakt' },

        // Visual page
        'FOTO_TITLE': { 'en': 'Visual | HRCO', 'sl': 'Vizualno | HRCO' },

        // Drone footage
        'DRONE_TITLE':      { 'en': 'Drone Footage',              'sl': 'Posnetki z dronom' },
        'VIDEO_1_CAPTION':  { 'en': 'Kolpa river: March 2025',  'sl': 'Reka Kolpa: marec 2025' },
        'VIDEO_2_CAPTION':  { 'en': 'Aerial view: Bela Krajina', 'sl': 'Pogled iz zraka — Bela Krajina' },
        'VIDEO_3_CAPTION':  { 'en': 'Drone footage — coming soon','sl': 'Posnetek z drona — kmalu' },
        'VIDEO_SOON':       { 'en': 'More footage coming soon',   'sl': 'Kmalu več posnetkov' },

        // Gallery section headers
        'FOTO_SECTION_FOG':      { 'en': 'Fog & Sunrise',      'sl': 'Megleni sončni vzhodi' },
        'FOTO_SECTION_WINTER':   { 'en': 'Winter',             'sl': 'Zima' },
        'FOTO_SECTION_RIVER':    { 'en': 'River Aerials',      'sl': 'Zračni posnetki rek' },
        'FOTO_SECTION_PASTORAL': { 'en': 'Pastoral',           'sl': 'Pastoralno' },

        // Photo captions
        'PHOTO_01': { 'en': 'Rivers meander. Fog settles. Mountains exist majestically. The universe continues ignoring our opinions about topology.', 'sl': 'Reke vijugajo. Megla se dviguje. Gore obstoijo veličastno. Vesolje pa še naprej ignorira naša mnenja o topologiji.' },
        'PHOTO_02': { 'en': 'The sun rises, as it has done for roughly 4.6 billion years. Still impressive despite the repetition.', 'sl': 'Sonce vzhaja, kot počne že približno 4,6 milijarde let. Še vedno impresivno kljub ponavljanju.' },
        'PHOTO_03': { 'en': 'Pink fog at dawn, it is a proof that the atmosphere occasionally produces better colour schemes than any design department.', 'sl': 'Rožnata megla ob zori, to je dokaz, da atmosfera občasno proizvaja boljše barvne sheme kot kateri koli oblikovalski oddelek.' },
        'PHOTO_04': { 'en': 'Golden hour meets fog layer. Physics doing what it does best: being consistently photogenic.', 'sl': 'Zlata ura sreča meglo. Fizika dela, kar zna najbolje: biti dosledno fotogenična.' },
        'PHOTO_05': { 'en': 'Fog trapped between hills like confusion trapped between Monday and coffee.', 'sl': 'Megla ujeta v dolini reke Kolpe, kakor zmeda ujeta med ponedeljkom in kavo.' },
        'PHOTO_06': { 'en': 'Valley converted to cloud ocean. Villages emerge as improbable islands of civilisation.', 'sl': 'Dolina reke Kolpe v megli, kakor ocean oblakov. Vasi se pojavijo kot neverjetni otoki civilizacije.' },
        'PHOTO_07': { 'en': 'Evening mist performing its nightly ritual of obscuring everything interesting.', 'sl': 'Večerna megla izvaja svoj nočni ritual prikrivanja vsega zanimivega.' },
        'PHOTO_08': { 'en': 'Sunrise with lens flare included at no extra charge. Reality providing free special effects since forever.', 'sl': 'Sončni vzhod z leskom leč brez dodatnih stroškov. Realnost zagotavlja brezplačne specialne efekte od nekdaj.' },
        'PHOTO_09': { 'en': 'Morning fog settles on hills. The road knows where it\'s going, which is more than most of us.', 'sl': 'Jutranja megla se spušča na hribe. Cesta ve, kam gre, kar je več kot večina od nas.' },
        'PHOTO_10': { 'en': 'Winter transforms the landscape into a high-contrast study of white versus everything else.', 'sl': 'Zima spremeni pokrajino v visokokontrastno študijo bele proti vsemu drugemu.' },
        'PHOTO_11': { 'en': 'River refuses to freeze. Trees covered in snow. Stubborn liquid water: 1, Thermodynamics: 0.', 'sl': 'Reka noče zamrzniti. Drevesa pokrita s snegom. Trmasta tekoča voda: 1, Termodinamika: 0.' },
        'PHOTO_12': { 'en': 'Winter sunset — cold doesn\'t prevent beauty, merely makes photography significantly more uncomfortable.', 'sl': 'Zimski sončni zahod: mraz ne prepreči lepote, samo naredi fotografiranje neudobne.' },
        'PHOTO_13': { 'en': 'Small waterfall creating a localised disturbance in an otherwise calm river. Very relatable.', 'sl': 'Majhen slap ustvarja lokalno motnjo v mirni reki. Zelo prepoznavno.' },
        'PHOTO_14': { 'en': 'Camping by the river. The ancient tradition of sleeping uncomfortably near water continues unabated.', 'sl': 'Kampiranje ob Kolpi. Starodavna tradicija neudobnega spanja blizu vode se nadaljuje nemoteno.' },
        'PHOTO_15': { 'en': 'Where rivers meet and decide geography together. Democratic water distribution in action.', 'sl': 'Kjer se reke srečajo in skupaj odločajo o geografiji. Demokratična distribucija vode v akciji.' },
        'PHOTO_16': { 'en': 'River choosing to split — clear evidence that even water can\'t always make up its mind.', 'sl': 'Reka se odloči razcepiti: jasen dokaz, da se tudi voda včasih ne more odločiti.' },
        'PHOTO_17': { 'en': 'Village nestled in the valley. Humans building near water sources since discovering agriculture 12,000 years ago.', 'sl': 'Vas v dolini. Ljudje gradijo blizu vodnih virov odkar so odkrili kmetijstvo pred 12.000 leti.' },
        'PHOTO_18': { 'en': 'Agricultural fields arranged geometrically. Nature curved, humanity square. This tension defines civilisation.', 'sl': 'Kmetijska polja urejena geometrijsko. Narava ukrivljena, človeštvo kvadratno. Ta napetost definira civilizacijo.' },
        'PHOTO_19': { 'en': 'River flowing between mountains with the confidence of having done this for millions of years.', 'sl': 'Reka teče med gorami s samozavestjo, ki jo prinaša milijone let prakse.' },
        'PHOTO_20': { 'en': 'The river from water level. Perspective: changed. Physics: still applicable.', 'sl': 'Reka z ravni vode. Perspektiva: spremenjena. Fizika: še vedno veljavna.' },
        'PHOTO_21': { 'en': 'Wide valley showcasing the Earth\'s remarkable ability to remain scenic despite hosting humanity.', 'sl': 'Široka dolina prikazuje izjemno sposobnost Zemlje, da ostane slikovita kljub gostovanju človeštva.' },
        'PHOTO_22': { 'en': 'Sheep from above — unimpressed by aerial perspective. Dairy production continues regardless of viewpoint.', 'sl': 'Ovce od zgoraj, neimpresionane z zračno perspektivo. Mlečna proizvodnja se nadaljuje ne glede na zorni kot.' },

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

    window.updateText = updateText;

    updateText(localStorage.getItem('language') || 'en');
    langToggleSlo?.addEventListener('click', () => updateText('sl'));
    langToggleEng?.addEventListener('click', () => updateText('en'));

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
