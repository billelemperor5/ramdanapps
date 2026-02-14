/* ═══════════════════════════════════════════════
   RAMADAN PREMIUM WEBAPP — SCRIPT
   Splash · Wilaya Selection · Prayer Times
   Clean, modular JavaScript — No external libraries
   ═══════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════
   INTERNATIONALISATION (i18n)
   ═══════════════════════════════════════════════ */
const i18n = {
  ar: {
    langSwitch: 'Français',
    appTitle: 'رمضان كريم',
    appSubtitle: 'شهر الرحمة والغفران',
    gregorianDate: 'التاريخ الميلادي',
    hijriDate: 'التاريخ الهجري',
    imsakLabel: 'الإمساك',
    iftarLabel: 'الإفطار',
    countdownToIftar: 'الوقت المتبقي للإفطار',
    countdownToImsak: 'الوقت المتبقي للإمساك',
    iftarMubarak: '🎉 حان وقت الإفطار!',
    hours: 'ساعة',
    minutes: 'دقيقة',
    seconds: 'ثانية',
    ramadanDay: 'اليوم {day} من رمضان',
    beforeRamadan: 'رمضان يبدأ قريباً إن شاء الله',
    afterRamadan: 'تقبل الله صيامكم وقيامكم',
    footer: 'رمضان مبارك 🤲',
    selectWilayaTitle: 'اختر ولايتك',
    selectWilayaDesc: 'لعرض مواقيت الإمساك والإفطار الخاصة بمنطقتك',
    searchPlaceholder: '🔍 ابحث عن ولايتك...',
    noResults: 'لا توجد نتائج',
    /* Quiz */
    quizTitle: 'تحدّي رمضان',
    quizDesc: 'سؤال ديني جديد كل يوم',
    quizTrue: '✅ صحيح',
    quizFalse: '❌ خطأ',
    quizSuccessRate: 'نسبة النجاح',
    quizAnswered: 'تمت الإجابة',
    quizCalendarTitle: 'تقويم التحدّي',
    quizCorrect: 'صحيحة',
    quizWrong: 'خاطئة',
    quizPending: 'لم تُجب',
    quizDay: 'اليوم {day}',
    quizQuestion: 'السؤال {day}',
    quizResultCorrect: '🎉 إجابة صحيحة! أحسنت',
    quizResultWrong: '😔 إجابة خاطئة',
    quizAlreadyAnswered: 'لقد أجبت على سؤال اليوم بالفعل',
    quizNotStarted: 'رمضان لم يبدأ بعد، عُد لاحقاً!',
    /* Game */
    gameTitle: 'Ramadan Night Journey',
    gameDesc: 'طيّر بالهلال واجمع النجوم',
    gameBest: 'أفضل',
    gameTapToStart: 'اضغط للبدء',
    gameHint: 'اضغط أو المس الشاشة للطيران ✈️',
    gameOver: 'انتهت اللعبة',
    gameScoreLabel: 'النقاط',
    gameRestart: '🔄 أعد اللعب',
    hubBack: 'الرئيسية',
    aboutBtn: 'حول التطبيق',
    aboutRole: 'مطور ومبرمج الأنظمة',
    aboutAppName: 'اسم التطبيق',
    aboutVersion: 'الإصدار',
    aboutYear: 'السنة',
    aboutEmail: 'البريد الإلكتروني',
    aboutFooter: 'صنع بـ ❤️ في الجزائر 🇩🇿',
    /* Hub */
    hubPrayer: 'إمساك و إفطار',
    hubPrayerDesc: 'مواقيت الصلاة والعد التنازلي',
  },
  fr: {
    langSwitch: 'العربية',
    appTitle: 'Ramadan Karim',
    appSubtitle: 'Le mois de la miséricorde',
    gregorianDate: 'Date grégorienne',
    hijriDate: 'Date hégirien',
    imsakLabel: 'Imsak',
    iftarLabel: 'Iftar',
    countdownToIftar: 'Temps restant avant l\'Iftar',
    countdownToImsak: 'Temps restant avant l\'Imsak',
    iftarMubarak: '🎉 C\'est l\'heure de l\'Iftar !',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes',
    ramadanDay: 'Jour {day} du Ramadan',
    beforeRamadan: 'Le Ramadan commence bientôt, inchallah',
    afterRamadan: 'Qu\'Allah accepte votre jeûne',
    footer: 'Ramadan Moubarak 🤲',
    selectWilayaTitle: 'Choisissez votre wilaya',
    selectWilayaDesc: 'Pour afficher les horaires selon votre région',
    searchPlaceholder: '🔍 Rechercher votre wilaya...',
    noResults: 'Aucun résultat',
    /* Quiz */
    quizTitle: 'Défi Ramadan',
    quizDesc: 'Une nouvelle question religieuse chaque jour',
    quizTrue: '✅ Vrai',
    quizFalse: '❌ Faux',
    quizSuccessRate: 'Taux de réussite',
    quizAnswered: 'Répondu',
    quizCalendarTitle: 'Calendrier du défi',
    quizCorrect: 'Correcte',
    quizWrong: 'Incorrecte',
    quizPending: 'En attente',
    quizDay: 'Jour {day}',
    quizQuestion: 'Question {day}',
    quizResultCorrect: '🎉 Bonne réponse ! Bravo',
    quizResultWrong: '😔 Mauvaise réponse',
    quizAlreadyAnswered: 'Vous avez déjà répondu aujourd\'hui',
    quizNotStarted: 'Le Ramadan n\'a pas encore commencé, revenez plus tard !',
    /* Game */
    gameTitle: 'Ramadan Night Journey',
    gameDesc: 'Pilotez le croissant et collectez les étoiles',
    gameBest: 'Meilleur',
    gameTapToStart: 'Appuyez pour commencer',
    gameHint: 'Appuyez ou touchez l\'écran pour voler ✈️',
    gameOver: 'Fin de la partie',
    gameScoreLabel: 'Score',
    gameRestart: '🔄 Rejouer',
    hubBack: 'Accueil',
    aboutBtn: 'À propos',
    aboutRole: 'Développeur & Programmeur Systèmes',
    aboutAppName: 'Nom de l\'app',
    aboutVersion: 'Version',
    aboutYear: 'Année',
    aboutEmail: 'E-mail',
    aboutFooter: 'Fait avec ❤️ en Algérie 🇩🇿',
    /* Hub */
    hubPrayer: 'Imsak & Iftar',
    hubPrayerDesc: 'Horaires de prière et compte à rebours',
  }
};


/* ═══════════════════════════════════════════════
   ALL 58 ALGERIAN WILAYAS
   ═══════════════════════════════════════════════
   Each wilaya has a time offset (in minutes) relative
   to Algiers for Imsak and Iftar.
   Positive = later, Negative = earlier.
   ═══════════════════════════════════════════════ */
const WILAYAS = [
  { code: 1, ar: 'أدرار', fr: 'Adrar', imsakOffset: +8, iftarOffset: +6 },
  { code: 2, ar: 'الشلف', fr: 'Chlef', imsakOffset: -1, iftarOffset: -1 },
  { code: 3, ar: 'الأغواط', fr: 'Laghouat', imsakOffset: +2, iftarOffset: +1 },
  { code: 4, ar: 'أم البواقي', fr: 'Oum El Bouaghi', imsakOffset: -5, iftarOffset: -5 },
  { code: 5, ar: 'باتنة', fr: 'Batna', imsakOffset: -4, iftarOffset: -4 },
  { code: 6, ar: 'بجاية', fr: 'Béjaïa', imsakOffset: -3, iftarOffset: -3 },
  { code: 7, ar: 'بسكرة', fr: 'Biskra', imsakOffset: -3, iftarOffset: -4 },
  { code: 8, ar: 'بشار', fr: 'Béchar', imsakOffset: +6, iftarOffset: +5 },
  { code: 9, ar: 'البليدة', fr: 'Blida', imsakOffset: 0, iftarOffset: 0 },
  { code: 10, ar: 'البويرة', fr: 'Bouira', imsakOffset: -2, iftarOffset: -2 },
  { code: 11, ar: 'تمنراست', fr: 'Tamanrasset', imsakOffset: +5, iftarOffset: +3 },
  { code: 12, ar: 'تبسة', fr: 'Tébessa', imsakOffset: -6, iftarOffset: -6 },
  { code: 13, ar: 'تلمسان', fr: 'Tlemcen', imsakOffset: +5, iftarOffset: +5 },
  { code: 14, ar: 'تيارت', fr: 'Tiaret', imsakOffset: +2, iftarOffset: +2 },
  { code: 15, ar: 'تيزي وزو', fr: 'Tizi Ouzou', imsakOffset: -2, iftarOffset: -2 },
  { code: 16, ar: 'الجزائر', fr: 'Alger', imsakOffset: 0, iftarOffset: 0 },
  { code: 17, ar: 'الجلفة', fr: 'Djelfa', imsakOffset: +1, iftarOffset: 0 },
  { code: 18, ar: 'جيجل', fr: 'Jijel', imsakOffset: -4, iftarOffset: -4 },
  { code: 19, ar: 'سطيف', fr: 'Sétif', imsakOffset: -3, iftarOffset: -3 },
  { code: 20, ar: 'سعيدة', fr: 'Saïda', imsakOffset: +3, iftarOffset: +3 },
  { code: 21, ar: 'سكيكدة', fr: 'Skikda', imsakOffset: -5, iftarOffset: -5 },
  { code: 22, ar: 'سيدي بلعباس', fr: 'Sidi Bel Abbès', imsakOffset: +4, iftarOffset: +4 },
  { code: 23, ar: 'عنابة', fr: 'Annaba', imsakOffset: -6, iftarOffset: -5 },
  { code: 24, ar: 'قالمة', fr: 'Guelma', imsakOffset: -5, iftarOffset: -5 },
  { code: 25, ar: 'قسنطينة', fr: 'Constantine', imsakOffset: -5, iftarOffset: -4 },
  { code: 26, ar: 'المدية', fr: 'Médéa', imsakOffset: 0, iftarOffset: 0 },
  { code: 27, ar: 'مستغانم', fr: 'Mostaganem', imsakOffset: +2, iftarOffset: +2 },
  { code: 28, ar: 'المسيلة', fr: 'M\'sila', imsakOffset: -2, iftarOffset: -2 },
  { code: 29, ar: 'معسكر', fr: 'Mascara', imsakOffset: +3, iftarOffset: +3 },
  { code: 30, ar: 'ورقلة', fr: 'Ouargla', imsakOffset: -2, iftarOffset: -3 },
  { code: 31, ar: 'وهران', fr: 'Oran', imsakOffset: +4, iftarOffset: +4 },
  { code: 32, ar: 'البيض', fr: 'El Bayadh', imsakOffset: +3, iftarOffset: +3 },
  { code: 33, ar: 'إليزي', fr: 'Illizi', imsakOffset: -4, iftarOffset: -5 },
  { code: 34, ar: 'برج بوعريريج', fr: 'Bordj Bou Arréridj', imsakOffset: -3, iftarOffset: -3 },
  { code: 35, ar: 'بومرداس', fr: 'Boumerdès', imsakOffset: -1, iftarOffset: -1 },
  { code: 36, ar: 'الطارف', fr: 'El Tarf', imsakOffset: -6, iftarOffset: -6 },
  { code: 37, ar: 'تندوف', fr: 'Tindouf', imsakOffset: +12, iftarOffset: +11 },
  { code: 38, ar: 'تيسمسيلت', fr: 'Tissemsilt', imsakOffset: +1, iftarOffset: +1 },
  { code: 39, ar: 'الوادي', fr: 'El Oued', imsakOffset: -4, iftarOffset: -5 },
  { code: 40, ar: 'خنشلة', fr: 'Khenchela', imsakOffset: -5, iftarOffset: -5 },
  { code: 41, ar: 'سوق أهراس', fr: 'Souk Ahras', imsakOffset: -6, iftarOffset: -6 },
  { code: 42, ar: 'تيبازة', fr: 'Tipaza', imsakOffset: +1, iftarOffset: +1 },
  { code: 43, ar: 'ميلة', fr: 'Mila', imsakOffset: -4, iftarOffset: -4 },
  { code: 44, ar: 'عين الدفلى', fr: 'Aïn Defla', imsakOffset: 0, iftarOffset: 0 },
  { code: 45, ar: 'النعامة', fr: 'Naâma', imsakOffset: +5, iftarOffset: +5 },
  { code: 46, ar: 'عين تموشنت', fr: 'Aïn Témouchent', imsakOffset: +4, iftarOffset: +4 },
  { code: 47, ar: 'غرداية', fr: 'Ghardaïa', imsakOffset: +1, iftarOffset: 0 },
  { code: 48, ar: 'غليزان', fr: 'Relizane', imsakOffset: +2, iftarOffset: +2 },
  { code: 49, ar: 'تيميمون', fr: 'Timimoun', imsakOffset: +7, iftarOffset: +6 },
  { code: 50, ar: 'برج باجي مختار', fr: 'Bordj Badji Mokhtar', imsakOffset: +4, iftarOffset: +2 },
  { code: 51, ar: 'أولاد جلال', fr: 'Ouled Djellal', imsakOffset: -2, iftarOffset: -3 },
  { code: 52, ar: 'بني عباس', fr: 'Béni Abbès', imsakOffset: +7, iftarOffset: +6 },
  { code: 53, ar: 'عين صالح', fr: 'In Salah', imsakOffset: +5, iftarOffset: +3 },
  { code: 54, ar: 'عين قزام', fr: 'In Guezzam', imsakOffset: +4, iftarOffset: +2 },
  { code: 55, ar: 'توقرت', fr: 'Touggourt', imsakOffset: -3, iftarOffset: -4 },
  { code: 56, ar: 'جانت', fr: 'Djanet', imsakOffset: -5, iftarOffset: -6 },
  { code: 57, ar: 'المغير', fr: 'El M\'ghair', imsakOffset: -3, iftarOffset: -4 },
  { code: 58, ar: 'المنيعة', fr: 'El Meniaa', imsakOffset: +2, iftarOffset: +1 },
];


/* ═══════════════════════════════════════════════
   RAMADAN 2026 BASE SCHEDULE (ALGIERS)
   ═══════════════════════════════════════════════
   Day 1 = 18 February 2026 (1 Ramadan 1447 AH).
   Base times are for Algiers (wilaya 16).
   Sources: gotopray.com, urdupoint.com, dirarab.net
   ═══════════════════════════════════════════════ */
const RAMADAN_START = new Date(2026, 1, 18);
const RAMADAN_DAYS = 30;

const BASE_SCHEDULE = [
  /* Day   Date         Imsak    Iftar   */
  /*  1  18 Feb 2026 */ { imsak: '05:56', iftar: '18:31' },
  /*  2  19 Feb 2026 */ { imsak: '05:55', iftar: '18:32' },
  /*  3  20 Feb 2026 */ { imsak: '05:54', iftar: '18:33' },
  /*  4  21 Feb 2026 */ { imsak: '05:52', iftar: '18:34' },
  /*  5  22 Feb 2026 */ { imsak: '05:51', iftar: '18:35' },
  /*  6  23 Feb 2026 */ { imsak: '05:50', iftar: '18:36' },
  /*  7  24 Feb 2026 */ { imsak: '05:48', iftar: '18:37' },
  /*  8  25 Feb 2026 */ { imsak: '05:47', iftar: '18:38' },
  /*  9  26 Feb 2026 */ { imsak: '05:46', iftar: '18:39' },
  /* 10  27 Feb 2026 */ { imsak: '05:44', iftar: '18:40' },
  /* 11  28 Feb 2026 */ { imsak: '05:43', iftar: '18:41' },
  /* 12  01 Mar 2026 */ { imsak: '05:41', iftar: '18:42' },
  /* 13  02 Mar 2026 */ { imsak: '05:40', iftar: '18:43' },
  /* 14  03 Mar 2026 */ { imsak: '05:38', iftar: '18:44' },
  /* 15  04 Mar 2026 */ { imsak: '05:37', iftar: '18:45' },
  /* 16  05 Mar 2026 */ { imsak: '05:35', iftar: '18:46' },
  /* 17  06 Mar 2026 */ { imsak: '05:34', iftar: '18:47' },
  /* 18  07 Mar 2026 */ { imsak: '05:32', iftar: '18:48' },
  /* 19  08 Mar 2026 */ { imsak: '05:31', iftar: '18:49' },
  /* 20  09 Mar 2026 */ { imsak: '05:29', iftar: '18:49' },
  /* 21  10 Mar 2026 */ { imsak: '05:27', iftar: '18:50' },
  /* 22  11 Mar 2026 */ { imsak: '05:26', iftar: '18:51' },
  /* 23  12 Mar 2026 */ { imsak: '05:24', iftar: '18:52' },
  /* 24  13 Mar 2026 */ { imsak: '05:22', iftar: '18:53' },
  /* 25  14 Mar 2026 */ { imsak: '05:21', iftar: '18:54' },
  /* 26  15 Mar 2026 */ { imsak: '05:19', iftar: '18:55' },
  /* 27  16 Mar 2026 */ { imsak: '05:17', iftar: '18:56' },
  /* 28  17 Mar 2026 */ { imsak: '05:16', iftar: '18:57' },
  /* 29  18 Mar 2026 */ { imsak: '05:14', iftar: '18:58' },
  /* 30  19 Mar 2026 */ { imsak: '05:12', iftar: '18:59' },
];


/* ═══════════════════════════════════════════════
   APPLICATION STATE
   ═══════════════════════════════════════════════ */
let currentLang = 'ar';
let selectedWilaya = null;   // wilaya object
let countdownInterval = null;

const STORAGE_KEY = 'ramadan_app_wilaya';
const QUIZ_STORAGE_KEY = 'ramadan_quiz_results';


/* ═══════════════════════════════════════════════
   QUIZ — 30 TRUE/FALSE QUESTIONS
   ═══════════════════════════════════════════════ */
const QUIZ_QUESTIONS = [
  { ar: 'الصيام فرض على كل مسلم بالغ عاقل.', fr: 'Le jeûne est obligatoire pour tout musulman adulte et sain d\'esprit.', answer: true },
  { ar: 'يجوز للمسافر أن يفطر في رمضان ويقضي لاحقاً.', fr: 'Le voyageur peut rompre le jeûne pendant le Ramadan et le rattraper plus tard.', answer: true },
  { ar: 'ليلة القدر محددة في ليلة 27 من رمضان فقط.', fr: 'La Nuit du Destin (Laylat al-Qadr) est fixée uniquement la 27e nuit du Ramadan.', answer: false },
  { ar: 'صلاة التراويح فرض عين على كل مسلم.', fr: 'La prière de Tarawih est une obligation individuelle pour chaque musulman.', answer: false },
  { ar: 'زكاة الفطر واجبة على كل مسلم قبل صلاة العيد.', fr: 'La Zakat al-Fitr est obligatoire pour chaque musulman avant la prière de l\'Aïd.', answer: true },
  { ar: 'من أكل أو شرب ناسياً فصيامه صحيح.', fr: 'Celui qui mange ou boit par oubli, son jeûne reste valide.', answer: true },
  { ar: 'القرآن الكريم أُنزل في شهر شعبان.', fr: 'Le Coran a été révélé pendant le mois de Chaabane.', answer: false },
  { ar: 'الاعتكاف سنة مؤكدة في العشر الأواخر من رمضان.', fr: 'L\'Itikaf est une Sunna confirmée pendant les dix derniers jours du Ramadan.', answer: true },
  { ar: 'يجب على الحامل الصيام حتى لو أضر بصحتها.', fr: 'La femme enceinte doit jeûner même si cela nuit à sa santé.', answer: false },
  { ar: 'معركة بدر الكبرى وقعت في شهر رمضان.', fr: 'La bataille de Badr a eu lieu pendant le mois du Ramadan.', answer: true },
  { ar: 'السحور سنة مستحبة وليس واجباً.', fr: 'Le Suhour (repas avant l\'aube) est recommandé mais pas obligatoire.', answer: true },
  { ar: 'يبطل الصيام بابتلاع الريق (اللعاب).', fr: 'Avaler sa salive annule le jeûne.', answer: false },
  { ar: 'فتح مكة كان في شهر رمضان في السنة الثامنة للهجرة.', fr: 'La conquête de La Mecque a eu lieu pendant le Ramadan en l\'an 8 de l\'Hégire.', answer: true },
  { ar: 'تأخير الإفطار بعد أذان المغرب من السنة.', fr: 'Retarder la rupture du jeûne après l\'appel à la prière du Maghreb est une Sunna.', answer: false },
  { ar: 'ليلة القدر خير من ألف شهر.', fr: 'La Nuit du Destin est meilleure que mille mois.', answer: true },
  { ar: 'صلاة التراويح تُصلى 20 ركعة فقط ولا يجوز غير ذلك.', fr: 'La prière de Tarawih se prie exclusivement en 20 Rakaats.', answer: false },
  { ar: 'الصيام يشمل الامتناع عن الأكل والشرب فقط.', fr: 'Le jeûne consiste uniquement à s\'abstenir de manger et de boire.', answer: false },
  { ar: 'قراءة القرآن كاملاً في رمضان من السنن المستحبة.', fr: 'Lire le Coran en entier pendant le Ramadan est une Sunna recommandée.', answer: true },
  { ar: 'كفارة الإفطار عمداً هي صيام شهرين متتابعين.', fr: 'L\'expiation pour avoir rompu le jeûne volontairement est de jeûner deux mois consécutifs.', answer: true },
  { ar: 'الأطفال دون سن البلوغ ملزمون بالصيام.', fr: 'Les enfants avant la puberté sont obligés de jeûner.', answer: false },
  { ar: 'الدعاء عند الإفطار مستجاب.', fr: 'L\'invocation au moment de la rupture du jeûne est exaucée.', answer: true },
  { ar: 'صدقة الفطر تُعطى بعد صلاة العيد.', fr: 'La Sadaqat al-Fitr se donne après la prière de l\'Aïd.', answer: false },
  { ar: 'رمضان هو الشهر التاسع في التقويم الهجري.', fr: 'Le Ramadan est le neuvième mois du calendrier hégirien.', answer: true },
  { ar: 'يجوز للمريض مرضاً مزمناً أن يفدي بدل الصيام.', fr: 'Le malade chronique peut payer une compensation (Fidya) au lieu de jeûner.', answer: true },
  { ar: 'تعجيل الإفطار من السنن النبوية.', fr: 'Hâter la rupture du jeûne est une Sunna prophétique.', answer: true },
  { ar: 'استخدام السواك يبطل الصيام.', fr: 'L\'utilisation du Siwak (bâton de brosse à dents) annule le jeûne.', answer: false },
  { ar: 'سورة البقرة هي أطول سورة في القرآن الكريم.', fr: 'La Sourate Al-Baqara est la plus longue sourate du Coran.', answer: true },
  { ar: 'صلاة الوتر واجبة في رمضان فقط.', fr: 'La prière de Witr est obligatoire uniquement pendant le Ramadan.', answer: false },
  { ar: 'الإمساك يكون عند أذان الفجر.', fr: 'L\'abstinence (Imsak) commence à l\'appel à la prière de l\'aube (Fajr).', answer: true },
  { ar: 'عيد الفطر يستمر ثلاثة أيام شرعاً.', fr: 'L\'Aïd al-Fitr dure trois jours selon la charia.', answer: false },
];


/* ═══════════════════════════════════════════════
   DOM REFERENCES (lazy — resolved after splash)
   ═══════════════════════════════════════════════ */
let dom = {};

function resolveDom() {
  dom = {
    splashScreen: document.getElementById('splashScreen'),
    wilayaScreen: document.getElementById('wilayaScreen'),
    mainApp: document.getElementById('mainApp'),
    wilayaList: document.getElementById('wilayaList'),
    wilayaSearch: document.getElementById('wilayaSearch'),
    gregorianDate: document.getElementById('gregorianDate'),
    hijriDate: document.getElementById('hijriDate'),
    imsakTime: document.getElementById('imsakTime'),
    iftarTime: document.getElementById('iftarTime'),
    cdHours: document.getElementById('cdHours'),
    cdMinutes: document.getElementById('cdMinutes'),
    cdSeconds: document.getElementById('cdSeconds'),
    countdownLabel: document.getElementById('countdownLabel'),
    ramadanDayInfo: document.getElementById('ramadanDayInfo'),
    /* Quiz */
    openQuizBtn: document.getElementById('openQuizBtn'),
    quizScreen: document.getElementById('quizScreen'),
    quizBackBtn: document.getElementById('quizBackBtn'),
    quizDayLabel: document.getElementById('quizDayLabel'),
    quizQNumber: document.getElementById('quizQNumber'),
    quizQuestion: document.getElementById('quizQuestion'),
    quizBtnTrue: document.getElementById('quizBtnTrue'),
    quizBtnFalse: document.getElementById('quizBtnFalse'),
    quizResult: document.getElementById('quizResult'),
    quizResultIcon: document.getElementById('quizResultIcon'),
    quizResultText: document.getElementById('quizResultText'),
    quizCard: document.getElementById('quizCard'),
    quizSuccessRate: document.getElementById('quizSuccessRate'),
    quizAnsweredCount: document.getElementById('quizAnsweredCount'),
    quizCalendarGrid: document.getElementById('quizCalendarGrid'),
    /* Hub */
    hubScreen: document.getElementById('hubScreen'),
    hubLangToggle: document.getElementById('hubLangToggle'),
    hubPrayerBtn: document.getElementById('hubPrayerBtn'),
    hubQuizBtn: document.getElementById('hubQuizBtn'),
    hubGameBtn: document.getElementById('hubGameBtn'),
    hubWilayaBtn: document.getElementById('hubWilayaBtn'),
    hubWilayaName: document.getElementById('hubWilayaName'),
    /* About */
    aboutScreen: document.getElementById('aboutScreen'),
    aboutBackBtn: document.getElementById('aboutBackBtn'),
    hubAboutBtn: document.getElementById('hubAboutBtn'),
  };
}


/* ═══════════════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════════════ */

function hideSplash(callback) {
  dom.splashScreen.classList.add('splash--hidden');
  setTimeout(() => {
    dom.splashScreen.style.display = 'none';
    if (callback) callback();
  }, 650);
}


/* ═══════════════════════════════════════════════
   WILAYA SELECTION
   ═══════════════════════════════════════════════ */

/** Build the wilaya list in the DOM. */
function renderWilayaList(filter = '') {
  const container = dom.wilayaList;
  container.innerHTML = '';

  const normalised = filter.trim().toLowerCase();
  const filtered = WILAYAS.filter(w => {
    if (!normalised) return true;
    return (
      w.ar.includes(normalised) ||
      w.fr.toLowerCase().includes(normalised) ||
      String(w.code).padStart(2, '0').includes(normalised)
    );
  });

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'wilaya-screen__empty';
    empty.textContent = i18n[currentLang].noResults;
    container.appendChild(empty);
    return;
  }

  filtered.forEach(w => {
    const btn = document.createElement('button');
    btn.className = 'wilaya-item';
    btn.innerHTML = `
      <span class="wilaya-item__code">${String(w.code).padStart(2, '0')}</span>
      <span class="wilaya-item__name">${currentLang === 'ar' ? w.ar : w.fr}</span>
      <span class="wilaya-item__arrow">${currentLang === 'ar' ? '◀' : '▶'}</span>
    `;
    btn.addEventListener('click', () => selectWilaya(w));
    container.appendChild(btn);
  });
}

/** Show the wilaya selection screen. */
function showWilayaScreen() {
  dom.wilayaScreen.style.display = '';
  dom.mainApp.style.display = 'none';
  dom.hubScreen.style.display = 'none';
  renderWilayaList();
  dom.wilayaSearch.value = '';
  dom.wilayaSearch.focus();
}

/** Handle wilaya selection. */
function selectWilaya(wilaya) {
  selectedWilaya = wilaya;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wilaya.code));
  dom.wilayaScreen.style.display = 'none';
  showHub();
}

/** Update the wilaya badge text (now in hub only). */
function updateWilayaBadge() {
  /* No-op: wilaya is shown in the hub settings bar */
}

/** Load saved wilaya from localStorage. */
function loadSavedWilaya() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved) {
      const found = WILAYAS.find(w => w.code === saved);
      if (found) {
        selectedWilaya = found;
        return true;
      }
    }
  } catch { /* ignore */ }
  return false;
}


/* ═══════════════════════════════════════════════
   LANGUAGE SYSTEM
   ═══════════════════════════════════════════════ */

function toggleLanguage() {
  currentLang = currentLang === 'ar' ? 'fr' : 'ar';
  applyLanguage();
  updateWilayaBadge();
  updateUI();
}

function applyLanguage() {
  const html = document.documentElement;
  html.lang = currentLang;
  html.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.title = i18n[currentLang].appTitle;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[currentLang][key]) {
      el.textContent = i18n[currentLang][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[currentLang][key]) {
      el.placeholder = i18n[currentLang][key];
    }
  });
}


/* ═══════════════════════════════════════════════
   TIME UTILITIES
   ═══════════════════════════════════════════════ */

/** Add minutes to a "HH:MM" string and return new "HH:MM". */
function addMinutes(timeStr, offset) {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + offset;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 60) + 60) % 60;
  return pad(nh) + ':' + pad(nm);
}

/** Get today's schedule adjusted for the selected wilaya. */
function getTodaySchedule(ramadanDay) {
  const base = BASE_SCHEDULE[ramadanDay - 1] || BASE_SCHEDULE[0];
  if (!selectedWilaya) return base;
  return {
    imsak: addMinutes(base.imsak, selectedWilaya.imsakOffset),
    iftar: addMinutes(base.iftar, selectedWilaya.iftarOffset),
  };
}

/** Parse "HH:MM" into a Date for today. */
function parseTimeToday(timeStr, ref) {
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(ref);
  d.setHours(h, m, 0, 0);
  return d;
}

function pad(n) {
  return String(n).padStart(2, '0');
}


/* ═══════════════════════════════════════════════
   DATE UTILITIES
   ═══════════════════════════════════════════════ */

function getRamadanDay(now) {
  const start = new Date(RAMADAN_START);
  start.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000);
  if (diff < 0) return { status: 'before', day: 0 };
  if (diff >= RAMADAN_DAYS) return { status: 'after', day: 0 };
  return { status: 'during', day: diff + 1 };
}

function formatGregorian(date) {
  const locale = currentLang === 'ar' ? 'ar-SA' : 'fr-FR';
  return date.toLocaleDateString(locale, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatHijri(date) {
  try {
    const locale = currentLang === 'ar'
      ? 'ar-SA-u-ca-islamic-umalqura'
      : 'fr-FR-u-ca-islamic-umalqura';
    return date.toLocaleDateString(locale, {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  } catch { return '—'; }
}


/* ═══════════════════════════════════════════════
   UI UPDATE
   ═══════════════════════════════════════════════ */

function updateUI() {
  const now = new Date();

  dom.gregorianDate.textContent = formatGregorian(now);
  dom.hijriDate.textContent = formatHijri(now);

  const { status, day } = getRamadanDay(now);

  if (status === 'during') {
    const sched = getTodaySchedule(day);
    dom.imsakTime.textContent = sched.imsak;
    dom.iftarTime.textContent = sched.iftar;

    const tmpl = i18n[currentLang].ramadanDay;
    dom.ramadanDayInfo.textContent = tmpl.replace('{day}', day);

    startCountdown(sched, now);
  } else if (status === 'before') {
    const sched = getTodaySchedule(1);
    dom.imsakTime.textContent = sched.imsak;
    dom.iftarTime.textContent = sched.iftar;
    dom.ramadanDayInfo.textContent = i18n[currentLang].beforeRamadan;
    startCountdownToDate(RAMADAN_START);
  } else {
    dom.imsakTime.textContent = '—';
    dom.iftarTime.textContent = '—';
    dom.ramadanDayInfo.textContent = i18n[currentLang].afterRamadan;
    stopCountdown();
  }
}


/* ═══════════════════════════════════════════════
   COUNTDOWN
   ═══════════════════════════════════════════════ */

function startCountdown(sched, now) {
  stopCountdown();
  const iftarDate = parseTimeToday(sched.iftar, now);
  const imsakDate = parseTimeToday(sched.imsak, now);

  function tick() {
    const current = new Date();
    let target, labelKey;

    if (current < imsakDate) {
      target = imsakDate;
      labelKey = 'countdownToImsak';
    } else if (current < iftarDate) {
      target = iftarDate;
      labelKey = 'countdownToIftar';
    } else {
      dom.countdownLabel.textContent = i18n[currentLang].iftarMubarak;
      dom.cdHours.textContent = '00';
      dom.cdMinutes.textContent = '00';
      dom.cdSeconds.textContent = '00';
      stopCountdown();
      return;
    }

    dom.countdownLabel.textContent = i18n[currentLang][labelKey];
    const diff = target - current;
    dom.cdHours.textContent = pad(Math.floor(diff / 3600000));
    dom.cdMinutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    dom.cdSeconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

function startCountdownToDate(targetDate) {
  stopCountdown();
  dom.countdownLabel.textContent = i18n[currentLang].beforeRamadan;

  function tick() {
    const diff = targetDate - new Date();
    if (diff <= 0) { stopCountdown(); updateUI(); return; }
    const ts = Math.floor(diff / 1000);
    dom.cdHours.textContent = pad(Math.floor(ts / 3600));
    dom.cdMinutes.textContent = pad(Math.floor((ts % 3600) / 60));
    dom.cdSeconds.textContent = pad(ts % 60);
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

function stopCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}


/* ═══════════════════════════════════════════════
   QUIZ SYSTEM
   ═══════════════════════════════════════════════ */

/** Load quiz results from localStorage. Returns object { 1: true, 3: false, … } */
function loadQuizResults() {
  try {
    const data = JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY));
    return data && typeof data === 'object' ? data : {};
  } catch { return {}; }
}

/** Save quiz results to localStorage. */
function saveQuizResults(results) {
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(results));
}

/** Open the quiz screen. */
function openQuizScreen() {
  dom.hubScreen.style.display = 'none';
  dom.mainApp.style.display = 'none';
  dom.quizScreen.style.display = '';
  renderQuiz();
}

/** Close quiz and return to hub. */
function closeQuizScreen() {
  dom.quizScreen.style.display = 'none';
  showHub();
}

/** Main quiz renderer. */
function renderQuiz() {
  const { status, day } = getRamadanDay(new Date());
  const results = loadQuizResults();

  /* Header day label */
  dom.quizDayLabel.textContent = i18n[currentLang].quizDay.replace('{day}', status === 'during' ? day : '—');

  if (status !== 'during') {
    /* Ramadan not started or finished */
    dom.quizQNumber.textContent = '';
    dom.quizQuestion.textContent = i18n[currentLang].quizNotStarted;
    dom.quizBtnTrue.style.display = 'none';
    dom.quizBtnFalse.style.display = 'none';
    dom.quizResult.style.display = 'none';
    dom.quizCard.className = 'quiz-card';
  } else {
    const q = QUIZ_QUESTIONS[day - 1];
    dom.quizQNumber.textContent = i18n[currentLang].quizQuestion.replace('{day}', day);
    dom.quizQuestion.textContent = currentLang === 'ar' ? q.ar : q.fr;

    const alreadyAnswered = results.hasOwnProperty(String(day));

    if (alreadyAnswered) {
      /* Already answered today */
      dom.quizBtnTrue.disabled = true;
      dom.quizBtnFalse.disabled = true;
      const wasCorrect = results[String(day)];
      showQuizResult(wasCorrect);
    } else {
      dom.quizBtnTrue.disabled = false;
      dom.quizBtnFalse.disabled = false;
      dom.quizBtnTrue.style.display = '';
      dom.quizBtnFalse.style.display = '';
      dom.quizResult.style.display = 'none';
      dom.quizCard.className = 'quiz-card';
    }
  }

  /* Stats */
  renderQuizStats(results);
  renderQuizCalendar(results, status === 'during' ? day : 0);
}

/** Handle answer. */
function handleQuizAnswer(userAnswer) {
  const { status, day } = getRamadanDay(new Date());
  if (status !== 'during') return;

  const results = loadQuizResults();
  if (results.hasOwnProperty(String(day))) return; // already answered

  const q = QUIZ_QUESTIONS[day - 1];
  const isCorrect = userAnswer === q.answer;

  results[String(day)] = isCorrect;
  saveQuizResults(results);

  dom.quizBtnTrue.disabled = true;
  dom.quizBtnFalse.disabled = true;
  showQuizResult(isCorrect);
  renderQuizStats(results);
  renderQuizCalendar(results, day);
}

/** Show result feedback. */
function showQuizResult(isCorrect) {
  dom.quizResult.style.display = '';
  dom.quizResultIcon.textContent = isCorrect ? '🎉' : '😔';
  dom.quizResultText.textContent = isCorrect
    ? i18n[currentLang].quizResultCorrect
    : i18n[currentLang].quizResultWrong;
  dom.quizCard.className = 'quiz-card ' + (isCorrect ? 'quiz-card--correct' : 'quiz-card--wrong');
}

/** Update stats display. */
function renderQuizStats(results) {
  const entries = Object.values(results);
  const answered = entries.length;
  const correct = entries.filter(v => v === true).length;
  const rate = answered > 0 ? Math.round((correct / answered) * 100) : 0;

  dom.quizSuccessRate.textContent = rate + '%';
  dom.quizAnsweredCount.textContent = answered + '/30';
}

/** Render the 30-day calendar grid. */
function renderQuizCalendar(results, todayDay) {
  dom.quizCalendarGrid.innerHTML = '';
  for (let d = 1; d <= 30; d++) {
    const cell = document.createElement('div');
    cell.className = 'quiz-day-cell';
    cell.textContent = d;

    if (results.hasOwnProperty(String(d))) {
      cell.classList.add(results[String(d)] ? 'quiz-day-cell--correct' : 'quiz-day-cell--wrong');
    } else {
      cell.classList.add('quiz-day-cell--pending');
    }

    if (d === todayDay) {
      cell.classList.add('quiz-day-cell--today');
    }

    dom.quizCalendarGrid.appendChild(cell);
  }
}


/* ═══════════════════════════════════════════════
   DAILY ROTATING BACKGROUND
   ═══════════════════════════════════════════════ */

/** Apply a unique background based on the day (1–30 cycling). */
function applyDailyBackground() {
  const dayOfYear = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
  );
  const bgIndex = ((dayOfYear - 1) % 30) + 1;
  document.body.setAttribute('data-bg', bgIndex);
}


/* ═══════════════════════════════════════════════
   HUB NAVIGATION
   ═══════════════════════════════════════════════ */

function showHub() {
  dom.mainApp.style.display = 'none';
  dom.quizScreen.style.display = 'none';
  dom.hubScreen.style.display = '';
  /* Update wilaya name in hub */
  if (selectedWilaya && dom.hubWilayaName) {
    const name = currentLang === 'ar' ? selectedWilaya.ar : selectedWilaya.fr;
    dom.hubWilayaName.textContent = name;
  }
}

function openPrayerFromHub() {
  dom.hubScreen.style.display = 'none';
  dom.mainApp.style.display = '';
  updateWilayaBadge();
  updateUI();
}

function openGameFromHub() {
  dom.hubScreen.style.display = 'none';
  document.getElementById('gameScreen').style.display = '';
  RNJ.start();
}


/* ═══════════════════════════════════════════════
   INITIALISATION
   ═══════════════════════════════════════════════ */

function init() {
  resolveDom();
  applyDailyBackground();
  applyLanguage();

  const hasSaved = loadSavedWilaya();

  /* After splash animation (~2.5s), transition to next screen */
  setTimeout(() => {
    if (hasSaved) {
      /* Returning user → go to hub */
      hideSplash(() => {
        showHub();
      });
    } else {
      /* First time → show wilaya selection, then hub */
      hideSplash(() => {
        showWilayaScreen();
      });
    }
  }, 2500);

  /* Event Listeners */
  dom.wilayaSearch.addEventListener('input', () => {
    renderWilayaList(dom.wilayaSearch.value);
  });

  /* Hub event listeners */
  dom.hubLangToggle.addEventListener('click', () => {
    toggleLanguage();
    /* Also update wilaya name in hub after language change */
    if (selectedWilaya && dom.hubWilayaName) {
      dom.hubWilayaName.textContent = currentLang === 'ar' ? selectedWilaya.ar : selectedWilaya.fr;
    }
  });
  dom.hubPrayerBtn.addEventListener('click', openPrayerFromHub);
  dom.hubQuizBtn.addEventListener('click', () => { openQuizScreen(); });
  dom.hubGameBtn.addEventListener('click', () => { openGameFromHub(); });

  /* Hub wilaya button */
  dom.hubWilayaBtn.addEventListener('click', showWilayaScreen);

  /* Back to hub from prayer screen */
  document.getElementById('backToHubBtn').addEventListener('click', () => {
    dom.mainApp.style.display = 'none';
    showHub();
  });

  /* About screen */
  dom.hubAboutBtn.addEventListener('click', () => {
    dom.hubScreen.style.display = 'none';
    dom.aboutScreen.style.display = 'block';
  });
  dom.aboutBackBtn.addEventListener('click', () => {
    dom.aboutScreen.style.display = 'none';
    showHub();
  });

  /* Quiz event listeners */
  dom.quizBackBtn.addEventListener('click', closeQuizScreen);
  dom.quizBtnTrue.addEventListener('click', () => handleQuizAnswer(true));
  dom.quizBtnFalse.addEventListener('click', () => handleQuizAnswer(false));

  /* Refresh at midnight */
  const msToMidnight = (() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight - now;
  })();
  setTimeout(() => {
    applyDailyBackground();
    updateUI();
    setInterval(() => { applyDailyBackground(); updateUI(); }, 86400000);
  }, msToMidnight);
}

document.addEventListener('DOMContentLoaded', init);
