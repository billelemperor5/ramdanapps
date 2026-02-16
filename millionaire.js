/* ═══════════════════════════════════════════════
   MILLIONAIRE — Ramadan Edition  نسخة رمضان
   "من سيربح المليون"
   ═══════════════════════════════════════════════ */
const MILLIONAIRE = (() => {
    'use strict';

    /* ── Money Ladder ─── */
    const PRIZES = [
        100, 200, 300, 500, 1000,
        2000, 4000, 8000, 16000, 32000,
        64000, 125000, 250000, 500000, 1000000
    ];
    const SAFE_LEVELS = [4, 9]; // 1,000 DA & 32,000 DA

    /* ══════════════════════════════════════════════════════
       QUESTION DATABASE — 60 Questions, 3 Difficulty Tiers
       ══════════════════════════════════════════════════════ */

    const QUESTIONS_EASY = [
        {
            ar: 'ما هو ترتيب شهر رمضان في التقويم الهجري؟', fr: 'Quel est le rang du mois de Ramadan dans le calendrier hégirien ?',
            choices: { ar: ['التاسع', 'العاشر', 'الثامن', 'السابع'], fr: ['Le 9ème', 'Le 10ème', 'Le 8ème', 'Le 7ème'] }, correct: 0
        },
        {
            ar: 'ما اسم الوجبة التي يتناولها المسلم قبل الفجر في رمضان؟', fr: 'Comment appelle-t-on le repas pris avant l\'aube pendant le Ramadan ?',
            choices: { ar: ['السحور', 'الإفطار', 'الغداء', 'العشاء'], fr: ['Le Suhoor', 'L\'Iftar', 'Le déjeuner', 'Le dîner'] }, correct: 0
        },
        {
            ar: 'ما هو الركن الرابع من أركان الإسلام؟', fr: 'Quel est le 4ème pilier de l\'Islam ?',
            choices: { ar: ['صوم رمضان', 'الزكاة', 'الحج', 'الصلاة'], fr: ['Le jeûne du Ramadan', 'La Zakat', 'Le Hajj', 'La prière'] }, correct: 0
        },
        {
            ar: 'بماذا يُستحب الإفطار في السنة النبوية؟', fr: 'Avec quoi est-il recommandé de rompre le jeûne selon la Sunna ?',
            choices: { ar: ['التمر', 'الخبز', 'الحليب', 'الماء فقط'], fr: ['Des dattes', 'Du pain', 'Du lait', 'De l\'eau seulement'] }, correct: 0
        },
        {
            ar: 'كم عدد أركان الإسلام؟', fr: 'Combien de piliers compte l\'Islam ?',
            choices: { ar: ['5', '4', '6', '3'], fr: ['5', '4', '6', '3'] }, correct: 0
        },
        {
            ar: 'ما هي أول صلاة في اليوم؟', fr: 'Quelle est la première prière de la journée ?',
            choices: { ar: ['الفجر', 'الظهر', 'العصر', 'المغرب'], fr: ['Al-Fajr', 'Al-Dhohr', 'Al-Asr', 'Al-Maghrib'] }, correct: 0
        },
        {
            ar: 'ما اسم العيد الذي يأتي بعد رمضان؟', fr: 'Comment s\'appelle la fête qui suit le Ramadan ?',
            choices: { ar: ['عيد الفطر', 'عيد الأضحى', 'المولد النبوي', 'رأس السنة الهجرية'], fr: ['Aïd al-Fitr', 'Aïd al-Adha', 'Mawlid', 'Nouvel an hégirien'] }, correct: 0
        },
        {
            ar: 'ماذا يقول المسلم عند بداية الأكل؟', fr: 'Que dit le musulman au début du repas ?',
            choices: { ar: ['بسم الله', 'الحمد لله', 'سبحان الله', 'الله أكبر'], fr: ['Bismillah', 'Al hamdulillah', 'Subhanallah', 'Allahou Akbar'] }, correct: 0
        },
        {
            ar: 'كم عدد الصلوات المفروضة في اليوم؟', fr: 'Combien de prières obligatoires y a-t-il par jour ?',
            choices: { ar: ['5', '3', '4', '7'], fr: ['5', '3', '4', '7'] }, correct: 0
        },
        {
            ar: 'ما هو الكتاب المقدس للمسلمين؟', fr: 'Quel est le livre sacré des musulmans ?',
            choices: { ar: ['القرآن الكريم', 'التوراة', 'الإنجيل', 'الزبور'], fr: ['Le Coran', 'La Torah', 'L\'Évangile', 'Les Psaumes'] }, correct: 0
        },
        {
            ar: 'ماذا يُقال عند الإفطار؟', fr: 'Que dit-on au moment de la rupture du jeûne ?',
            choices: { ar: ['اللهم لك صمت وعلى رزقك أفطرت', 'بسم الله الرحمن الرحيم', 'لا حول ولا قوة إلا بالله', 'سبحان ربي العظيم'], fr: ['Allahumma laka sumtu...', 'Bismillahir rahmanir rahim', 'La hawla wala quwwata...', 'Subhana rabi al-adhim'] }, correct: 0
        },
        {
            ar: 'ماذا نسمي الليالي العشر الأخيرة من رمضان؟', fr: 'Comment appelle-t-on les 10 dernières nuits du Ramadan ?',
            choices: { ar: ['العشر الأواخر', 'ليالي القدر', 'العشر المباركات', 'ليالي الرحمة'], fr: ['Les dix dernières', 'Les nuits du destin', 'Les dix bénies', 'Les nuits de miséricorde'] }, correct: 0
        },
        {
            ar: 'ماذا يُستحب تعجيله في رمضان؟', fr: 'Qu\'est-il recommandé de hâter pendant le Ramadan ?',
            choices: { ar: ['الإفطار', 'السحور', 'صلاة العشاء', 'صلاة الفجر'], fr: ['L\'Iftar', 'Le Suhoor', 'La prière d\'Isha', 'La prière du Fajr'] }, correct: 0
        },
        {
            ar: 'ما هي لغة القرآن الكريم؟', fr: 'Quelle est la langue du Saint Coran ?',
            choices: { ar: ['العربية', 'العبرية', 'الآرامية', 'الفارسية'], fr: ['L\'arabe', 'L\'hébreu', 'L\'araméen', 'Le persan'] }, correct: 0
        },
        {
            ar: 'من هو النبي الذي أُنزل عليه القرآن؟', fr: 'Quel prophète a reçu la révélation du Coran ?',
            choices: { ar: ['محمد ﷺ', 'إبراهيم', 'موسى', 'عيسى'], fr: ['Muhammad ﷺ', 'Ibrahim', 'Moussa', 'Issa'] }, correct: 0
        },
        {
            ar: 'ما أول ما يأكله الصائم عند الإفطار حسب السنة؟', fr: 'Que mange-t-on en premier pour rompre le jeûne selon la Sunna ?',
            choices: { ar: ['تمرات وترية', 'شوربة', 'بوراك', 'حليب'], fr: ['Nombre impair de dattes', 'Soupe', 'Bourek', 'Lait'] }, correct: 0
        },
        {
            ar: 'ما هو الشهر الذي يسبق رمضان؟', fr: 'Quel est le mois qui précède le Ramadan ?',
            choices: { ar: ['شعبان', 'رجب', 'جمادى الثانية', 'ذو القعدة'], fr: ['Chaabane', 'Rajab', 'Joumada II', 'Dhoul Qi\'da'] }, correct: 0
        },
        {
            ar: 'ما اسم صلاة الليل في رمضان؟', fr: 'Comment s\'appelle la prière de nuit pendant le Ramadan ?',
            choices: { ar: ['التراويح', 'التهجد', 'الوتر', 'الشفع'], fr: ['Tarawih', 'Tahajjud', 'Witr', 'Chif\'a'] }, correct: 0
        },
        {
            ar: 'كم ركعة في صلاة التراويح عادةً؟', fr: 'Combien de rakaats compte la prière de Tarawih habituellement ?',
            choices: { ar: ['20', '8', '12', '10'], fr: ['20', '8', '12', '10'] }, correct: 0
        },
        {
            ar: 'أين نزل القرآن الكريم لأول مرة؟', fr: 'Où le Coran a-t-il été révélé pour la première fois ?',
            choices: { ar: ['غار حراء', 'المسجد الحرام', 'المسجد النبوي', 'المسجد الأقصى'], fr: ['La grotte de Hira', 'La Mosquée Sacrée', 'La Mosquée du Prophète', 'La Mosquée Al-Aqsa'] }, correct: 0
        },
    ];

    const QUESTIONS_MEDIUM = [
        {
            ar: 'في أي ليلة تُعرف بـ "ليلة القدر"؟', fr: 'Quelle nuit est connue comme "Laylat al-Qadr" ?',
            choices: { ar: ['ليلة 27 رمضان', 'ليلة 15 رمضان', 'ليلة 1 رمضان', 'ليلة 30 رمضان'], fr: ['La 27ème nuit', 'La 15ème nuit', 'La 1ère nuit', 'La 30ème nuit'] }, correct: 0
        },
        {
            ar: 'في أي سنة فُرض صيام رمضان على المسلمين؟', fr: 'En quelle année le jeûne du Ramadan a-t-il été prescrit ?',
            choices: { ar: ['السنة 2 هجرية', 'السنة 1 هجرية', 'السنة 3 هجرية', 'السنة 5 هجرية'], fr: ['L\'an 2 H', 'L\'an 1 H', 'L\'an 3 H', 'L\'an 5 H'] }, correct: 0
        },
        {
            ar: 'ما هي "ليلة القدر" خير من كم شهر؟', fr: '"Laylat al-Qadr" est meilleure que combien de mois ?',
            choices: { ar: ['ألف شهر', 'مئة شهر', 'خمسمئة شهر', 'عشرة أشهر'], fr: ['1000 mois', '100 mois', '500 mois', '10 mois'] }, correct: 0
        },
        {
            ar: 'ما اسم الباب الذي يدخل منه الصائمون الجنة؟', fr: 'Comment s\'appelle la porte du Paradis réservée aux jeûneurs ?',
            choices: { ar: ['الريّان', 'الفردوس', 'السلام', 'الرحمة'], fr: ['Ar-Rayyan', 'Al-Firdaws', 'As-Salam', 'Ar-Rahma'] }, correct: 0
        },
        {
            ar: 'ما هي غزوة بدر الكبرى وفي أي شهر وقعت؟', fr: 'La bataille de Badr a eu lieu pendant quel mois ?',
            choices: { ar: ['رمضان', 'شوال', 'ذو الحجة', 'محرم'], fr: ['Ramadan', 'Shawwal', 'Dhul Hijja', 'Muharram'] }, correct: 0
        },
        {
            ar: 'ما حكم من أكل أو شرب ناسياً في رمضان؟', fr: 'Quel est le jugement si on mange par oubli pendant le Ramadan ?',
            choices: { ar: ['يكمل صيامه ولا شيء عليه', 'يقضي اليوم', 'عليه كفارة', 'يفطر ويقضي'], fr: ['Il continue son jeûne', 'Il rattrape le jour', 'Il doit expier', 'Il rompt et rattrape'] }, correct: 0
        },
        {
            ar: 'ما هو أجر قيام ليلة القدر إيماناً واحتساباً؟', fr: 'Quelle est la récompense de la prière de Laylat al-Qadr ?',
            choices: { ar: ['غُفر له ما تقدم من ذنبه', 'دخول الجنة مباشرة', 'مضاعفة الحسنات', 'الشفاعة'], fr: ['Ses péchés passés sont pardonnés', 'Entrée au Paradis', 'Multiplication des bonnes actions', 'L\'intercession'] }, correct: 0
        },
        {
            ar: 'كم عدد أجزاء القرآن الكريم؟', fr: 'Combien de parties (Juz) le Coran contient-il ?',
            choices: { ar: ['30 جزءاً', '20 جزءاً', '25 جزءاً', '40 جزءاً'], fr: ['30', '20', '25', '40'] }, correct: 0
        },
        {
            ar: 'ما السورة التي تُسمى "قلب القرآن"؟', fr: 'Quelle sourate est appelée "le cœur du Coran" ?',
            choices: { ar: ['يس', 'البقرة', 'الفاتحة', 'الرحمن'], fr: ['Ya-Sin', 'Al-Baqara', 'Al-Fatiha', 'Ar-Rahman'] }, correct: 0
        },
        {
            ar: 'ما هي زكاة الفطر؟', fr: 'Qu\'est-ce que la Zakat al-Fitr ?',
            choices: { ar: ['صدقة واجبة قبل صلاة العيد', 'صدقة اختيارية', 'زكاة المال', 'هدية العيد'], fr: ['Aumône obligatoire avant la prière de l\'Aïd', 'Aumône optionnelle', 'Zakat sur les biens', 'Cadeau de l\'Aïd'] }, correct: 0
        },
        {
            ar: 'كم عدد سور القرآن الكريم؟', fr: 'Combien de sourates le Coran contient-il ?',
            choices: { ar: ['114', '110', '120', '100'], fr: ['114', '110', '120', '100'] }, correct: 0
        },
        {
            ar: 'ما أطول سورة في القرآن الكريم؟', fr: 'Quelle est la plus longue sourate du Coran ?',
            choices: { ar: ['البقرة', 'آل عمران', 'النساء', 'المائدة'], fr: ['Al-Baqara', 'Ali Imran', 'An-Nisa', 'Al-Ma\'ida'] }, correct: 0
        },
        {
            ar: 'ما اسم الشهر الذي يلي رمضان؟', fr: 'Quel est le mois qui suit le Ramadan ?',
            choices: { ar: ['شوال', 'ذو القعدة', 'ذو الحجة', 'محرم'], fr: ['Shawwal', 'Dhoul Qi\'da', 'Dhoul Hijja', 'Muharram'] }, correct: 0
        },
        {
            ar: 'من هو أول مؤذن في الإسلام؟', fr: 'Qui fut le premier muezzin de l\'Islam ?',
            choices: { ar: ['بلال بن رباح', 'عمر بن الخطاب', 'علي بن أبي طالب', 'أبو بكر الصديق'], fr: ['Bilal ibn Rabah', 'Omar ibn al-Khattab', 'Ali ibn Abi Talib', 'Abu Bakr'] }, correct: 0
        },
        {
            ar: 'ما هو الاعتكاف في رمضان؟', fr: 'Qu\'est-ce que l\'I\'tikaf pendant le Ramadan ?',
            choices: { ar: ['المكوث في المسجد للعبادة', 'الصيام المتواصل', 'قراءة القرآن كاملاً', 'إطعام المساكين'], fr: ['Rester à la mosquée pour l\'adoration', 'Le jeûne continu', 'Lire le Coran en entier', 'Nourrir les pauvres'] }, correct: 0
        },
        {
            ar: 'كم عدد الأيام التي صامها النبي ﷺ في شعبان؟', fr: 'Combien de jours le Prophète ﷺ jeûnait-il en Chaabane ?',
            choices: { ar: ['أكثر الشهر', '10 أيام', '3 أيام', 'الشهر كاملاً'], fr: ['La majorité du mois', '10 jours', '3 jours', 'Le mois entier'] }, correct: 0
        },
        {
            ar: 'ما هي السحور المستحبة في السنة النبوية؟', fr: 'Quel est le Suhoor recommandé dans la Sunna ?',
            choices: { ar: ['التمر والماء', 'اللحم والأرز', 'الخبز والحليب', 'الفواكه فقط'], fr: ['Dattes et eau', 'Viande et riz', 'Pain et lait', 'Fruits seulement'] }, correct: 0
        },
        {
            ar: 'ما هو فضل إطعام الصائم؟', fr: 'Quel est le mérite de nourrir un jeûneur ?',
            choices: { ar: ['له مثل أجر الصائم', 'له ضعف الأجر', 'له عشر حسنات', 'ليس له أجر خاص'], fr: ['Il obtient la même récompense', 'Il obtient le double', 'Il obtient 10 bonnes actions', 'Pas de récompense spéciale'] }, correct: 0
        },
        {
            ar: 'ما هي صلاة الوتر؟', fr: 'Qu\'est-ce que la prière du Witr ?',
            choices: { ar: ['صلاة فردية تُختم بها الليل', 'صلاة الفجر', 'صلاة الضحى', 'صلاة الظهر'], fr: ['Prière impaire qui clôt la nuit', 'Prière du Fajr', 'Prière du Doha', 'Prière du Dhohr'] }, correct: 0
        },
        {
            ar: 'ما هي أول كلمة نزلت من القرآن؟', fr: 'Quel est le premier mot révélé du Coran ?',
            choices: { ar: ['اقرأ', 'بسم', 'قل', 'يا'], fr: ['Iqra (Lis)', 'Bism (Au nom)', 'Qul (Dis)', 'Ya (Ô)'] }, correct: 0
        },
    ];

    const QUESTIONS_HARD = [
        {
            ar: 'كم مرة ذُكر شهر رمضان في القرآن الكريم؟', fr: 'Combien de fois le mois de Ramadan est-il mentionné dans le Coran ?',
            choices: { ar: ['مرة واحدة', 'مرتين', 'ثلاث مرات', 'أربع مرات'], fr: ['1 fois', '2 fois', '3 fois', '4 fois'] }, correct: 0
        },
        {
            ar: 'ما هي الكفارة لمن أفطر عمداً في رمضان؟', fr: 'Quelle est l\'expiation pour celui qui rompt le jeûne volontairement ?',
            choices: { ar: ['صيام 60 يوماً أو إطعام 60 مسكيناً', 'صيام 30 يوماً', 'إطعام 10 مساكين', 'صيام 3 أيام'], fr: ['Jeûner 60 jours ou nourrir 60 pauvres', 'Jeûner 30 jours', 'Nourrir 10 pauvres', 'Jeûner 3 jours'] }, correct: 0
        },
        {
            ar: 'في أي سورة ذُكرت فريضة الصيام؟', fr: 'Dans quelle sourate l\'obligation du jeûne est-elle mentionnée ?',
            choices: { ar: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء', 'سورة المائدة'], fr: ['Al-Baqara', 'Ali Imran', 'An-Nisa', 'Al-Ma\'ida'] }, correct: 0
        },
        {
            ar: 'ما هو فتح مكة وفي أي سنة هجرية وقع؟', fr: 'La conquête de la Mecque a eu lieu en quelle année hégirienne ?',
            choices: { ar: ['السنة 8 هجرية', 'السنة 6 هجرية', 'السنة 10 هجرية', 'السنة 5 هجرية'], fr: ['L\'an 8 H', 'L\'an 6 H', 'L\'an 10 H', 'L\'an 5 H'] }, correct: 0
        },
        {
            ar: 'ما هي صدقة الفطر ومتى تجب؟', fr: 'Quand la Zakat al-Fitr est-elle obligatoire ?',
            choices: { ar: ['قبل صلاة العيد', 'بعد صلاة العيد', 'أول رمضان', 'منتصف رمضان'], fr: ['Avant la prière de l\'Aïd', 'Après la prière', 'Début du Ramadan', 'Mi-Ramadan'] }, correct: 0
        },
        {
            ar: 'ما الآية التي فرضت الصيام: "كُتِبَ عَلَيْكُمُ الصِّيَامُ..." في أي رقم آية؟', fr: 'Quel est le numéro du verset prescrivant le jeûne dans Sourate Al-Baqara ?',
            choices: { ar: ['الآية 183', 'الآية 150', 'الآية 200', 'الآية 255'], fr: ['Verset 183', 'Verset 150', 'Verset 200', 'Verset 255'] }, correct: 0
        },
        {
            ar: 'كم عدد الأنبياء المذكورين في القرآن؟', fr: 'Combien de prophètes sont mentionnés dans le Coran ?',
            choices: { ar: ['25', '30', '20', '12'], fr: ['25', '30', '20', '12'] }, correct: 0
        },
        {
            ar: 'ما هو الإسراء والمعراج وفي أي شهر وقع؟', fr: 'Le voyage nocturne (Isra et Mi\'raj) a eu lieu pendant quel mois ?',
            choices: { ar: ['رجب', 'رمضان', 'شعبان', 'ذو الحجة'], fr: ['Rajab', 'Ramadan', 'Chaabane', 'Dhoul Hijja'] }, correct: 0
        },
        {
            ar: 'ما هي السورة التي تُقرأ في كل ركعة صلاة؟', fr: 'Quelle sourate est récitée dans chaque rakaat de la prière ?',
            choices: { ar: ['الفاتحة', 'الإخلاص', 'الكوثر', 'النصر'], fr: ['Al-Fatiha', 'Al-Ikhlas', 'Al-Kawthar', 'An-Nasr'] }, correct: 0
        },
        {
            ar: 'متى يبدأ وقت الإمساك؟', fr: 'Quand commence le temps de l\'Imsak ?',
            choices: { ar: ['عند أذان الفجر', 'عند طلوع الشمس', 'بعد منتصف الليل', 'قبل أذان الفجر بساعة'], fr: ['À l\'appel du Fajr', 'Au lever du soleil', 'Après minuit', 'Une heure avant le Fajr'] }, correct: 0
        },
        {
            ar: 'ما هو حكم صوم الستة أيام من شوال؟', fr: 'Quel est le statut du jeûne des 6 jours de Shawwal ?',
            choices: { ar: ['سنة مستحبة', 'فرض واجب', 'مكروه', 'بدعة'], fr: ['Sunna recommandée', 'Obligation', 'Détestable', 'Innovation'] }, correct: 0
        },
        {
            ar: 'في أي ليلة تُلتمس ليلة القدر بالتحديد حسب أرجح الأقوال؟', fr: 'Quelle nuit est la plus probable pour Laylat al-Qadr ?',
            choices: { ar: ['ليلة 27', 'ليلة 29', 'ليلة 23', 'ليلة 21'], fr: ['La 27ème nuit', 'La 29ème nuit', 'La 23ème nuit', 'La 21ème nuit'] }, correct: 0
        },
        {
            ar: 'ما هي السورة التي نزلت كاملة في ليلة القدر؟', fr: 'Quelle sourate a été révélée en entier lors de Laylat al-Qadr ?',
            choices: { ar: ['سورة القدر', 'سورة البقرة', 'سورة يس', 'سورة الملك'], fr: ['Sourate Al-Qadr', 'Sourate Al-Baqara', 'Sourate Ya-Sin', 'Sourate Al-Mulk'] }, correct: 0
        },
        {
            ar: 'ما هو عدد أيام شهر رمضان؟', fr: 'Combien de jours dure le mois de Ramadan ?',
            choices: { ar: ['29 أو 30 يوماً', '28 يوماً', '31 يوماً', '30 يوماً فقط'], fr: ['29 ou 30 jours', '28 jours', '31 jours', '30 jours seulement'] }, correct: 0
        },
        {
            ar: 'ما معنى كلمة "رمضان" في اللغة العربية؟', fr: 'Que signifie le mot "Ramadan" en arabe ?',
            choices: { ar: ['الحر الشديد أو الشيء المحرق', 'الرحمة والبركة', 'الصبر والتحمل', 'الجوع والعطش'], fr: ['Chaleur extrême', 'Miséricorde et bénédiction', 'Patience et endurance', 'Faim et soif'] }, correct: 0
        },
        {
            ar: 'من هو الصحابي الملقب بـ "سيف الله المسلول"؟', fr: 'Quel compagnon est surnommé "L\'épée dégainée d\'Allah" ?',
            choices: { ar: ['خالد بن الوليد', 'عمر بن الخطاب', 'علي بن أبي طالب', 'حمزة بن عبد المطلب'], fr: ['Khalid ibn al-Walid', 'Omar ibn al-Khattab', 'Ali ibn Abi Talib', 'Hamza ibn Abdul-Muttalib'] }, correct: 0
        },
        {
            ar: 'ما هو حكم تذوق الطعام أثناء الصيام؟', fr: 'Quel est le jugement de goûter la nourriture pendant le jeûne ?',
            choices: { ar: ['جائز بشرط عدم البلع', 'حرام مطلقاً', 'مكروه دائماً', 'يُبطل الصيام'], fr: ['Permis sans avaler', 'Absolument interdit', 'Toujours détestable', 'Annule le jeûne'] }, correct: 0
        },
        {
            ar: 'ما هو دعاء ليلة القدر الذي علّمه النبي ﷺ لعائشة؟', fr: 'Quelle invocation le Prophète ﷺ a-t-il enseignée à Aïcha pour Laylat al-Qadr ?',
            choices: { ar: ['اللهم إنك عفو تحب العفو فاعف عني', 'ربنا آتنا في الدنيا حسنة', 'اللهم اغفر لي وارحمني', 'ربي اجعلني مقيم الصلاة'], fr: ['Allahumma innaka afuwwun...', 'Rabbana atina...', 'Allahumma ighfir li...', 'Rabbi ja\'alni...'] }, correct: 0
        },
        {
            ar: 'ما هي الفدية لمن لا يستطيع الصيام لعذر دائم؟', fr: 'Quelle est la compensation pour celui qui ne peut pas jeûner ?',
            choices: { ar: ['إطعام مسكين عن كل يوم', 'صيام شهرين', 'لا شيء عليه', 'صلاة ركعتين'], fr: ['Nourrir un pauvre par jour', 'Jeûner 2 mois', 'Rien', 'Prier 2 rakaats'] }, correct: 0
        },
        {
            ar: 'كم مرة ختم جبريل القرآن مع النبي ﷺ في آخر رمضان له؟', fr: 'Combien de fois Jibreel révisa-t-il le Coran avec le Prophète ﷺ lors de son dernier Ramadan ?',
            choices: { ar: ['مرتين', 'مرة واحدة', 'ثلاث مرات', 'أربع مرات'], fr: ['2 fois', '1 fois', '3 fois', '4 fois'] }, correct: 0
        },
    ];

    /* ── State ─── */
    let currentLevel = 0;
    let currentQuestion = null;
    let gameQuestions = [];
    let lifelines = { fifty: true, audience: true, phone: true };
    let answered = false;
    let gameActive = false;
    let lang = 'ar';
    let playerName = '';

    /* ── Stats (localStorage) ─── */
    function getStats() {
        const defaultStats = {
            gamesPlayed: 0,
            gamesWon: 0,
            totalPrize: 0,
            bestPrize: 0,
            bestLevel: 0,
            history: [],
            playerName: '' // Added persistent name
        };
        const stored = JSON.parse(localStorage.getItem('mill_stats') || 'null');
        return { ...defaultStats, ...stored };
    }

    function saveStats(stats) {
        localStorage.setItem('mill_stats', JSON.stringify(stats));
    }

    /* ── DOM Refs ─── */
    let els = {};

    function resolveDOM() {
        els = {
            screen: document.getElementById('millionaireScreen'),
            // Registration
            regOverlay: document.getElementById('millRegOverlay'),
            regName: document.getElementById('millRegName'),
            regSurname: document.getElementById('millRegSurname'),
            regStartBtn: document.getElementById('millRegStart'),
            regBest: document.getElementById('millRegBest'),
            regGames: document.getElementById('millRegGames'),
            // Game
            question: document.getElementById('millQ'),
            choiceBtns: document.querySelectorAll('.mill-choice'),
            ladder: document.getElementById('millLadder'),
            levelLabel: document.getElementById('millLevel'),
            prizeLabel: document.getElementById('millPrize'),
            playerLabel: document.getElementById('millPlayerName'),
            lifelineFifty: document.getElementById('millLL5050'),
            lifelineAudience: document.getElementById('millLLAudience'),
            lifelinePhone: document.getElementById('millLLPhone'),
            walkAwayBtn: document.getElementById('millWalkAway'),
            // Result
            resultOverlay: document.getElementById('millResult'),
            resultIcon: document.getElementById('millResultIcon'),
            resultTitle: document.getElementById('millResultTitle'),
            resultPrize: document.getElementById('millResultPrize'),
            resultBtn: document.getElementById('millResultBtn'),
            resultStatsBtn: document.getElementById('millResultStatsBtn'),
            // Certificate
            certOverlay: document.getElementById('millCertOverlay'),
            certName: document.getElementById('millCertName'),
            certPrize: document.getElementById('millCertPrize'),
            certDate: document.getElementById('millCertDate'),
            certLevel: document.getElementById('millCertLevel'),
            certClose: document.getElementById('millCertClose'),
            // Stats
            statsOverlay: document.getElementById('millStatsOverlay'),
            statsGames: document.getElementById('millStatsGames'),
            statsWins: document.getElementById('millStatsWins'),
            statsBest: document.getElementById('millStatsBest'),
            statsTotal: document.getElementById('millStatsTotal'),
            statsHistory: document.getElementById('millStatsHistory'),
            statsClose: document.getElementById('millStatsClose'),
            statsChangeName: document.getElementById('millStatsChangeName'), // New ref
            // Top
            backBtn: document.getElementById('millBackBtn'),
            statsBtn: document.getElementById('millStatsBtn'),
        };
    }

    /* ── Helpers ─── */
    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function formatPrize(n) {
        return n.toLocaleString('en') + ' DA';
    }

    function getLang() {
        return document.documentElement.lang || 'ar';
    }

    function getFormattedDate() {
        const d = new Date();
        return d.toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-DZ', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    /* ── Build 15 questions (5 easy + 5 medium + 5 hard) ─── */
    function buildQuestionSet() {
        const easy = shuffle(QUESTIONS_EASY).slice(0, 5);
        const medium = shuffle(QUESTIONS_MEDIUM).slice(0, 5);
        const hard = shuffle(QUESTIONS_HARD).slice(0, 5);
        gameQuestions = [...easy, ...medium, ...hard];
    }

    /* ── Render Money Ladder ─── */
    function renderLadder() {
        els.ladder.innerHTML = '';
        let activeRow = null;
        for (let i = PRIZES.length - 1; i >= 0; i--) {
            const row = document.createElement('div');
            row.className = 'mill-ladder__row';
            if (i === currentLevel) {
                row.classList.add('mill-ladder__row--active');
                activeRow = row;
            }
            if (i < currentLevel) row.classList.add('mill-ladder__row--done');
            if (SAFE_LEVELS.includes(i)) row.classList.add('mill-ladder__row--safe');

            const num = document.createElement('span');
            num.className = 'mill-ladder__num';
            num.textContent = (i + 1);

            const prize = document.createElement('span');
            prize.className = 'mill-ladder__prize';
            prize.textContent = formatPrize(PRIZES[i]);

            row.appendChild(num);
            row.appendChild(prize);
            els.ladder.appendChild(row);
        }

        // Auto-scroll to active row
        if (activeRow) {
            setTimeout(() => {
                activeRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    /* ── Load Question ─── */
    function loadQuestion() {
        lang = getLang();
        answered = false;
        currentQuestion = gameQuestions[currentLevel];

        const correctText = currentQuestion.choices[lang][currentQuestion.correct];
        const shuffledChoices = shuffle(currentQuestion.choices[lang]);
        const newCorrectIdx = shuffledChoices.indexOf(correctText);
        currentQuestion._shuffled = shuffledChoices;
        currentQuestion._correctIdx = newCorrectIdx;

        els.question.textContent = currentQuestion[lang];
        const labels = ['A', 'B', 'C', 'D'];
        els.choiceBtns.forEach((btn, i) => {
            btn.className = 'mill-choice';
            btn.disabled = false;
            btn.style.display = '';
            btn.querySelector('.mill-choice__label').textContent = labels[i];
            btn.querySelector('.mill-choice__text').textContent = shuffledChoices[i];
            btn.classList.remove('mill-choice--selected', 'mill-choice--correct', 'mill-choice--wrong');
        });

        els.levelLabel.textContent = (currentLevel + 1) + '/15';
        els.prizeLabel.textContent = formatPrize(PRIZES[currentLevel]);
        renderLadder();

        els.lifelineFifty.disabled = !lifelines.fifty;
        els.lifelineAudience.disabled = !lifelines.audience;
        els.lifelinePhone.disabled = !lifelines.phone;
        els.walkAwayBtn.disabled = currentLevel === 0;

        els.resultOverlay.style.display = 'none';
    }

    /* ── Answer Selection ─── */
    function selectAnswer(idx) {
        if (answered || !gameActive) return;
        answered = true;

        const btn = els.choiceBtns[idx];
        btn.classList.add('mill-choice--selected');
        els.choiceBtns.forEach(b => b.disabled = true);

        setTimeout(() => {
            const isCorrect = idx === currentQuestion._correctIdx;
            els.choiceBtns[currentQuestion._correctIdx].classList.add('mill-choice--correct');

            if (isCorrect) {
                btn.classList.remove('mill-choice--selected');
                btn.classList.add('mill-choice--correct');
                setTimeout(() => {
                    currentLevel++;
                    if (currentLevel >= 15) {
                        endGame('won');
                    } else {
                        loadQuestion();
                    }
                }, 1200);
            } else {
                btn.classList.add('mill-choice--wrong');
                setTimeout(() => endGame('lost'), 1500);
            }
        }, 1500);
    }

    /* ── Calculate Prize ─── */
    function calcPrize(outcome) {
        if (outcome === 'won') return PRIZES[14];
        if (outcome === 'walkaway') return currentLevel > 0 ? PRIZES[currentLevel - 1] : 0;
        // lost
        let prize = 0;
        for (let i = SAFE_LEVELS.length - 1; i >= 0; i--) {
            if (currentLevel > SAFE_LEVELS[i]) {
                prize = PRIZES[SAFE_LEVELS[i]];
                break;
            }
        }
        return prize;
    }

    /* ── End Game ─── */
    function endGame(outcome) {
        gameActive = false;
        lang = getLang();
        const prize = calcPrize(outcome);

        // Update stats
        const stats = getStats();
        stats.gamesPlayed++;
        if (outcome === 'won') stats.gamesWon++;
        stats.totalPrize += prize;
        if (prize > stats.bestPrize) stats.bestPrize = prize;
        if (currentLevel > stats.bestLevel) stats.bestLevel = currentLevel;
        stats.history.unshift({
            name: playerName,
            prize: prize,
            level: outcome === 'won' ? 15 : currentLevel,
            date: new Date().toISOString(),
            outcome: outcome
        });
        if (stats.history.length > 20) stats.history = stats.history.slice(0, 20);
        saveStats(stats);

        // Show result
        els.resultOverlay.style.display = 'flex';
        if (outcome === 'won') {
            els.resultIcon.textContent = '🏆';
            els.resultTitle.textContent = lang === 'ar' ? 'مبروك! ربحت المليون!' : 'Bravo ! Vous avez gagné le million !';
        } else if (outcome === 'walkaway') {
            els.resultIcon.textContent = '🎩';
            els.resultTitle.textContent = lang === 'ar' ? 'قررت الانسحاب بحكمة!' : 'Vous partez avec sagesse !';
        } else {
            els.resultIcon.textContent = prize > 0 ? '💰' : '😔';
            els.resultTitle.textContent = lang === 'ar' ? 'للأسف... إجابة خاطئة' : 'Mauvaise réponse...';
        }
        els.resultPrize.textContent = (lang === 'ar' ? 'ربحت: ' : 'Gains: ') + formatPrize(prize);
        els.resultBtn.textContent = lang === 'ar' ? '🔄 العب مرة أخرى' : '🔄 Rejouer';

        // Fix: Restart directly without registration
        els.resultBtn.onclick = () => startGame();

        // Show certificate button if won something
        if (prize > 0) {
            els.resultStatsBtn.style.display = '';
            els.resultStatsBtn.textContent = lang === 'ar' ? '🏅 شهادة الربح' : '🏅 Certificat';
            els.resultStatsBtn.onclick = () => showCertificate(prize, outcome);
        } else {
            els.resultStatsBtn.style.display = 'none';
        }
    }

    /* ── Walk Away ─── */
    function walkAway() {
        if (!gameActive || currentLevel === 0) return;
        endGame('walkaway');
    }

    /* ── Show Certificate ─── */
    function showCertificate(prize, outcome) {
        lang = getLang();
        els.certOverlay.style.display = 'flex';
        els.certName.textContent = playerName;
        els.certPrize.textContent = formatPrize(prize);
        els.certDate.textContent = getFormattedDate();
        els.certLevel.textContent = outcome === 'won'
            ? (lang === 'ar' ? 'السؤال 15/15 — المليون! 🏆' : 'Question 15/15 — Le Million ! 🏆')
            : (lang === 'ar' ? `السؤال ${currentLevel}/15` : `Question ${currentLevel}/15`);
    }

    /* ── Show Stats ─── */
    function showStats() {
        lang = getLang();
        const stats = getStats();
        els.statsOverlay.style.display = 'flex';
        els.statsGames.textContent = stats.gamesPlayed;
        els.statsWins.textContent = stats.gamesWon;
        els.statsBest.textContent = formatPrize(stats.bestPrize);
        els.statsTotal.textContent = formatPrize(stats.totalPrize);

        // History
        els.statsHistory.innerHTML = '';
        if (stats.history.length === 0) {
            els.statsHistory.innerHTML = `<p style="color:var(--text-muted);font-size:0.75rem;text-align:center;">${lang === 'ar' ? 'لا توجد سجلات بعد' : 'Aucun historique'}</p>`;
        } else {
            stats.history.forEach(h => {
                const row = document.createElement('div');
                row.className = 'mill-stats__row';
                const icon = h.outcome === 'won' ? '🏆' : h.outcome === 'walkaway' ? '🎩' : '❌';
                const d = new Date(h.date);
                row.innerHTML = `
          <span class="mill-stats__row-icon">${icon}</span>
          <div class="mill-stats__row-body">
            <span class="mill-stats__row-name">${h.name}</span>
            <span class="mill-stats__row-date">${d.toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-DZ')}</span>
          </div>
          <span class="mill-stats__row-prize">${formatPrize(h.prize)}</span>
        `;
                els.statsHistory.appendChild(row);
            });
        }
    }

    /* ── Lifelines ─── */
    function useFiftyFifty() {
        if (!lifelines.fifty || answered) return;
        lifelines.fifty = false;
        els.lifelineFifty.disabled = true;
        els.lifelineFifty.classList.add('mill-lifeline--used');

        const wrongIdxs = [];
        for (let i = 0; i < 4; i++) {
            if (i !== currentQuestion._correctIdx) wrongIdxs.push(i);
        }
        shuffle(wrongIdxs).slice(0, 2).forEach(i => {
            els.choiceBtns[i].style.display = 'none';
        });
    }

    function useAudience() {
        if (!lifelines.audience || answered) return;
        lifelines.audience = false;
        els.lifelineAudience.disabled = true;
        els.lifelineAudience.classList.add('mill-lifeline--used');

        const correct = currentQuestion._correctIdx;
        const pcts = [0, 0, 0, 0];
        pcts[correct] = 50 + Math.floor(Math.random() * 30);
        let rem = 100 - pcts[correct];
        for (let i = 0; i < 4; i++) {
            if (i !== correct && els.choiceBtns[i].style.display !== 'none') {
                const val = (i === 3 || rem <= 0) ? rem : Math.floor(Math.random() * rem);
                pcts[i] = Math.max(0, val);
                rem -= pcts[i];
            }
        }
        pcts[correct] += rem;

        els.choiceBtns.forEach((btn, i) => {
            if (btn.style.display !== 'none') {
                btn.querySelector('.mill-choice__text').textContent += ` (${pcts[i]}%)`;
            }
        });
    }

    function usePhone() {
        if (!lifelines.phone || answered) return;
        lifelines.phone = false;
        els.lifelinePhone.disabled = true;
        els.lifelinePhone.classList.add('mill-lifeline--used');

        lang = getLang();
        const correct = currentQuestion._correctIdx;
        const labels = ['A', 'B', 'C', 'D'];
        const friendCorrect = Math.random() < 0.8;
        const friendAnswer = friendCorrect ? correct : shuffle([0, 1, 2, 3].filter(i => i !== correct))[0];

        const msg = lang === 'ar'
            ? `💬 صديقك: "أعتقد الإجابة ${labels[friendAnswer]}"`
            : `💬 Ami: "Je pense ${labels[friendAnswer]}"`;

        const tip = document.createElement('div');
        tip.className = 'mill-phone-tip';
        tip.textContent = msg;
        document.querySelector('.mill-question-area').appendChild(tip);
        setTimeout(() => tip.remove(), 5000);
    }

    /* ── Show Registration ─── */
    function showRegistration() {
        resolveDOM();
        lang = getLang();
        const stats = getStats();

        els.regOverlay.style.display = 'flex';
        els.regName.value = '';
        els.regSurname.value = '';
        els.regName.placeholder = lang === 'ar' ? 'الاسم' : 'Prénom';
        els.regSurname.placeholder = lang === 'ar' ? 'اللقب' : 'Nom';
        els.regStartBtn.textContent = lang === 'ar' ? '🚀 ابدأ اللعبة' : '🚀 Commencer';
        els.regBest.textContent = formatPrize(stats.bestPrize);
        els.regGames.textContent = stats.gamesPlayed;

        // Bind
        els.regStartBtn.onclick = () => {
            const n = els.regName.value.trim();
            const s = els.regSurname.value.trim();
            if (!n || !s) {
                els.regName.style.borderColor = !n ? '#ef4444' : '';
                els.regSurname.style.borderColor = !s ? '#ef4444' : '';
                return;
            }
            playerName = n + ' ' + s;

            // Save player name persistently
            stats.playerName = playerName;
            saveStats(stats);

            els.regOverlay.style.display = 'none';
            if (els.playerLabel) els.playerLabel.textContent = playerName;
            startGame();
        };

        els.regName.addEventListener('input', () => { els.regName.style.borderColor = ''; });
        els.regSurname.addEventListener('input', () => { els.regSurname.style.borderColor = ''; });
    }

    /* ── Start Game ─── */
    function startGame() {
        currentLevel = 0;
        lifelines = { fifty: true, audience: true, phone: true };
        gameActive = true;
        answered = false;

        els.resultOverlay.style.display = 'none'; // Ensure result is hidden

        els.lifelineFifty.classList.remove('mill-lifeline--used');
        els.lifelineAudience.classList.remove('mill-lifeline--used');
        els.lifelinePhone.classList.remove('mill-lifeline--used');

        buildQuestionSet();
        loadQuestion();

        // Bind persistence
        els.choiceBtns.forEach((btn, i) => { btn.onclick = () => selectAnswer(i); });
        els.lifelineFifty.onclick = useFiftyFifty;
        els.lifelineAudience.onclick = useAudience;
        els.lifelinePhone.onclick = usePhone;
        els.walkAwayBtn.onclick = walkAway;
        els.resultBtn.onclick = () => startGame(); // Direct Restart
        els.backBtn.onclick = () => {
            els.screen.style.display = 'none';
            document.getElementById('hubScreen').style.display = 'block';
        };
        els.certClose.onclick = () => { els.certOverlay.style.display = 'none'; };
        els.statsClose.onclick = () => { els.statsOverlay.style.display = 'none'; };
        if (els.statsBtn) els.statsBtn.onclick = showStats;
    }

    /* ── Public: open from hub ─── */
    function start() {
        resolveDOM();
        const stats = getStats();

        // Bind common
        els.backBtn.onclick = () => {
            els.screen.style.display = 'none';
            document.getElementById('hubScreen').style.display = 'block';
        };
        if (els.statsBtn) els.statsBtn.onclick = showStats;
        els.certClose.onclick = () => { els.certOverlay.style.display = 'none'; };
        els.statsClose.onclick = () => { els.statsOverlay.style.display = 'none'; };

        // Change Name Logic
        if (els.statsChangeName) {
            els.statsChangeName.onclick = () => {
                stats.playerName = '';
                saveStats(stats);
                els.statsOverlay.style.display = 'none';
                els.screen.style.display = 'none'; // Restart flow
                document.getElementById('millionaireScreen').style.display = 'flex';
                showRegistration();
            };
        }

        // Check if player already registered
        if (stats.playerName) {
            playerName = stats.playerName;
            if (els.playerLabel) els.playerLabel.textContent = playerName;
            startGame();
        } else {
            showRegistration();
        }
    }

    return { start };
})();
