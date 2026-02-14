/* ═══════════════════════════════════════════════
   MILLIONAIRE — Ramadan Edition
   "من سيربح المليون" — نسخة رمضان
   ═══════════════════════════════════════════════ */
const MILLIONAIRE = (() => {
    'use strict';

    /* ── Money Ladder ─── */
    const PRIZES = [
        100, 200, 300, 500, 1000,
        2000, 4000, 8000, 16000, 32000,
        64000, 125000, 250000, 500000, 1000000
    ];
    const SAFE_LEVELS = [4, 9]; // 0-indexed: 1000 and 32000

    /* ── Questions Database (30 questions, bilingual) ─── */
    const QUESTIONS = [
        // Level 1-5 (Easy)
        {
            ar: 'ما هو ترتيب شهر رمضان في التقويم الهجري؟', fr: 'Quel est le rang du mois de Ramadan dans le calendrier hégirien ?',
            choices: { ar: ['التاسع', 'العاشر', 'الثامن', 'السابع'], fr: ['Le 9ème', 'Le 10ème', 'Le 8ème', 'Le 7ème'] }, correct: 0
        },
        {
            ar: 'كم عدد ركعات صلاة التراويح المعتادة؟', fr: 'Combien de rakaats compte habituellement la prière de Tarawih ?',
            choices: { ar: ['20 ركعة', '8 ركعات', '12 ركعة', '10 ركعات'], fr: ['20', '8', '12', '10'] }, correct: 0
        },
        {
            ar: 'ما اسم الوجبة التي يتناولها المسلم قبل الفجر في رمضان؟', fr: 'Comment appelle-t-on le repas pris avant l\'aube pendant le Ramadan ?',
            choices: { ar: ['السحور', 'الإفطار', 'الغداء', 'العشاء'], fr: ['Le Suhoor', 'L\'Iftar', 'Le déjeuner', 'Le dîner'] }, correct: 0
        },
        {
            ar: 'في أي ليلة تُعرف بـ "ليلة القدر"؟', fr: 'Quelle nuit est connue comme "Laylat al-Qadr" ?',
            choices: { ar: ['ليلة 27 رمضان', 'ليلة 15 رمضان', 'ليلة 1 رمضان', 'ليلة 30 رمضان'], fr: ['La 27ème nuit', 'La 15ème nuit', 'La 1ère nuit', 'La 30ème nuit'] }, correct: 0
        },
        {
            ar: 'ما هو الركن الرابع من أركان الإسلام؟', fr: 'Quel est le 4ème pilier de l\'Islam ?',
            choices: { ar: ['صوم رمضان', 'الزكاة', 'الحج', 'الصلاة'], fr: ['Le jeûne du Ramadan', 'La Zakat', 'Le Hajj', 'La prière'] }, correct: 0
        },
        {
            ar: 'ماذا يقول المسلم عند الإفطار؟', fr: 'Que dit le musulman au moment de rompre le jeûne ?',
            choices: { ar: ['اللهم لك صمت وعلى رزقك أفطرت', 'بسم الله الرحمن الرحيم', 'لا حول ولا قوة إلا بالله', 'الحمد لله رب العالمين'], fr: ['Allahumma laka sumtu...', 'Bismillah...', 'La hawla...', 'Al hamdulillah...'] }, correct: 0
        },
        // Level 6-10 (Medium)
        {
            ar: 'في أي سنة فُرض صيام رمضان على المسلمين؟', fr: 'En quelle année le jeûne du Ramadan a-t-il été prescrit ?',
            choices: { ar: ['السنة الثانية للهجرة', 'السنة الأولى للهجرة', 'السنة الثالثة للهجرة', 'السنة الخامسة للهجرة'], fr: ['2ème année de l\'Hégire', '1ère année', '3ème année', '5ème année'] }, correct: 0
        },
        {
            ar: 'ما هي السورة التي نزلت كاملة في رمضان؟', fr: 'Quelle sourate a été révélée entièrement pendant le Ramadan ?',
            choices: { ar: ['سورة البقرة', 'سورة القدر', 'سورة الفاتحة', 'سورة الإخلاص'], fr: ['Sourate Al-Baqara', 'Sourate Al-Qadr', 'Sourate Al-Fatiha', 'Sourate Al-Ikhlas'] }, correct: 0
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
        // Level 11-15 (Hard)
        {
            ar: 'كم مرة ذُكر شهر رمضان في القرآن الكريم؟', fr: 'Combien de fois le mois de Ramadan est-il mentionné dans le Coran ?',
            choices: { ar: ['مرة واحدة', 'مرتين', 'ثلاث مرات', 'أربع مرات'], fr: ['1 fois', '2 fois', '3 fois', '4 fois'] }, correct: 0
        },
        {
            ar: 'ما هي الكفارة لمن أفطر عمداً في رمضان؟', fr: 'Quelle est l\'expiation pour celui qui rompt volontairement le jeûne ?',
            choices: { ar: ['صيام 60 يوماً أو إطعام 60 مسكيناً', 'صيام 30 يوماً', 'إطعام 10 مساكين', 'صيام 3 أيام'], fr: ['Jeûner 60 jours ou nourrir 60 pauvres', 'Jeûner 30 jours', 'Nourrir 10 pauvres', 'Jeûner 3 jours'] }, correct: 0
        },
        {
            ar: 'في أي سورة ذُكرت فريضة الصيام؟', fr: 'Dans quelle sourate l\'obligation du jeûne est-elle mentionnée ?',
            choices: { ar: ['سورة البقرة', 'سورة آل عمران', 'سورة النساء', 'سورة المائدة'], fr: ['Sourate Al-Baqara', 'Sourate Ali Imran', 'Sourate An-Nisa', 'Sourate Al-Ma\'ida'] }, correct: 0
        },
        {
            ar: 'ما هو فتح مكة الذي وقع في رمضان وفي أي سنة هجرية؟', fr: 'La conquête de la Mecque pendant le Ramadan a eu lieu en quelle année ?',
            choices: { ar: ['السنة 8 هجرية', 'السنة 6 هجرية', 'السنة 10 هجرية', 'السنة 5 هجرية'], fr: ['L\'an 8 H', 'L\'an 6 H', 'L\'an 10 H', 'L\'an 5 H'] }, correct: 0
        },
        {
            ar: 'ما هي صدقة الفطر ومتى تجب؟', fr: 'Quand la Zakat al-Fitr est-elle obligatoire ?',
            choices: { ar: ['قبل صلاة العيد', 'بعد صلاة العيد', 'أول رمضان', 'منتصف رمضان'], fr: ['Avant la prière de l\'Aïd', 'Après la prière', 'Début du Ramadan', 'Mi-Ramadan'] }, correct: 0
        },
        // Extra questions pool (for variety)
        {
            ar: 'ما هي السحور المستحبة في السنة النبوية؟', fr: 'Quel est le Suhoor recommandé dans la Sunna ?',
            choices: { ar: ['التمر والماء', 'اللحم والأرز', 'الخبز والحليب', 'الفواكه فقط'], fr: ['Dattes et eau', 'Viande et riz', 'Pain et lait', 'Fruits seulement'] }, correct: 0
        },
        {
            ar: 'ما حكم من أكل أو شرب ناسياً في رمضان؟', fr: 'Quel est le jugement si on mange par oubli pendant le Ramadan ?',
            choices: { ar: ['يكمل صيامه ولا شيء عليه', 'يقضي اليوم', 'عليه كفارة', 'يفطر ويقضي'], fr: ['Il continue son jeûne', 'Il rattrape le jour', 'Il doit expier', 'Il rompt et rattrape'] }, correct: 0
        },
        {
            ar: 'كم عدد الأيام التي صامها النبي ﷺ في شعبان؟', fr: 'Combien de jours le Prophète ﷺ jeûnait-il en Chaabane ?',
            choices: { ar: ['أكثر الشهر', '10 أيام', '3 أيام', 'الشهر كاملاً'], fr: ['La majorité du mois', '10 jours', '3 jours', 'Le mois entier'] }, correct: 0
        },
        {
            ar: 'ما هو أجر قيام ليلة القدر إيماناً واحتساباً؟', fr: 'Quelle est la récompense de la prière de Laylat al-Qadr ?',
            choices: { ar: ['غُفر له ما تقدم من ذنبه', 'دخول الجنة مباشرة', 'مضاعفة الحسنات', 'رفع الدرجات'], fr: ['Ses péchés passés sont pardonnés', 'Entrée directe au Paradis', 'Multiplication des bonnes actions', 'Élévation des degrés'] }, correct: 0
        },
        {
            ar: 'ماذا يُستحب تعجيله في رمضان؟', fr: 'Qu\'est-il recommandé de hâter pendant le Ramadan ?',
            choices: { ar: ['الإفطار', 'السحور', 'صلاة العشاء', 'صلاة الفجر'], fr: ['L\'Iftar', 'Le Suhoor', 'La prière d\'Isha', 'La prière de Fajr'] }, correct: 0
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

    /* ── DOM Refs ─── */
    let els = {};

    function resolveDOM() {
        els = {
            screen: document.getElementById('millionaireScreen'),
            question: document.getElementById('millQ'),
            choices: [
                document.getElementById('millA'),
                document.getElementById('millB'),
                document.getElementById('millC'),
                document.getElementById('millD'),
            ],
            choiceBtns: document.querySelectorAll('.mill-choice'),
            ladder: document.getElementById('millLadder'),
            levelLabel: document.getElementById('millLevel'),
            prizeLabel: document.getElementById('millPrize'),
            lifelineFifty: document.getElementById('millLL5050'),
            lifelineAudience: document.getElementById('millLLAudience'),
            lifelinePhone: document.getElementById('millLLPhone'),
            walkAwayBtn: document.getElementById('millWalkAway'),
            resultOverlay: document.getElementById('millResult'),
            resultIcon: document.getElementById('millResultIcon'),
            resultTitle: document.getElementById('millResultTitle'),
            resultPrize: document.getElementById('millResultPrize'),
            resultBtn: document.getElementById('millResultBtn'),
            backBtn: document.getElementById('millBackBtn'),
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

    /* ── Build the game set of 15 questions ─── */
    function buildQuestionSet() {
        const shuffled = shuffle(QUESTIONS);
        gameQuestions = shuffled.slice(0, 15);
    }

    /* ── Render Money Ladder ─── */
    function renderLadder() {
        els.ladder.innerHTML = '';
        for (let i = PRIZES.length - 1; i >= 0; i--) {
            const row = document.createElement('div');
            row.className = 'mill-ladder__row';
            if (i === currentLevel) row.classList.add('mill-ladder__row--active');
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
    }

    /* ── Load Question ─── */
    function loadQuestion() {
        lang = getLang();
        answered = false;
        currentQuestion = gameQuestions[currentLevel];

        // Shuffle choices but track correct
        const correctText = currentQuestion.choices[lang][currentQuestion.correct];
        const shuffledChoices = shuffle(currentQuestion.choices[lang]);
        const newCorrectIdx = shuffledChoices.indexOf(correctText);
        currentQuestion._shuffled = shuffledChoices;
        currentQuestion._correctIdx = newCorrectIdx;

        // Update UI
        els.question.textContent = currentQuestion[lang];
        const labels = ['A', 'B', 'C', 'D'];
        els.choiceBtns.forEach((btn, i) => {
            btn.className = 'mill-choice';
            btn.disabled = false;
            btn.style.display = '';
            const labelSpan = btn.querySelector('.mill-choice__label');
            const textSpan = btn.querySelector('.mill-choice__text');
            labelSpan.textContent = labels[i];
            textSpan.textContent = shuffledChoices[i];
        });

        // Update level & prize
        els.levelLabel.textContent = (currentLevel + 1) + '/15';
        els.prizeLabel.textContent = formatPrize(PRIZES[currentLevel]);

        // Render ladder
        renderLadder();

        // Update lifeline buttons
        els.lifelineFifty.disabled = !lifelines.fifty;
        els.lifelineAudience.disabled = !lifelines.audience;
        els.lifelinePhone.disabled = !lifelines.phone;
        els.walkAwayBtn.disabled = currentLevel === 0;

        // Hide result
        els.resultOverlay.style.display = 'none';
    }

    /* ── Answer Selection ─── */
    function selectAnswer(idx) {
        if (answered || !gameActive) return;
        answered = true;

        const btn = els.choiceBtns[idx];
        btn.classList.add('mill-choice--selected');

        // Disable all
        els.choiceBtns.forEach(b => b.disabled = true);

        // Dramatic delay then reveal
        setTimeout(() => {
            const isCorrect = idx === currentQuestion._correctIdx;

            // Highlight correct
            els.choiceBtns[currentQuestion._correctIdx].classList.add('mill-choice--correct');

            if (isCorrect) {
                btn.classList.remove('mill-choice--selected');
                btn.classList.add('mill-choice--correct');

                setTimeout(() => {
                    currentLevel++;
                    if (currentLevel >= 15) {
                        // WON THE MILLION!
                        endGame(true);
                    } else {
                        loadQuestion();
                    }
                }, 1200);
            } else {
                btn.classList.add('mill-choice--wrong');

                setTimeout(() => {
                    endGame(false);
                }, 1500);
            }
        }, 1500);
    }

    /* ── End Game ─── */
    function endGame(won) {
        gameActive = false;
        lang = getLang();

        let prize = 0;
        if (won) {
            prize = PRIZES[14]; // 1,000,000
        } else {
            // Fall to last safe level
            for (let i = SAFE_LEVELS.length - 1; i >= 0; i--) {
                if (currentLevel > SAFE_LEVELS[i]) {
                    prize = PRIZES[SAFE_LEVELS[i]];
                    break;
                }
            }
        }

        // Save best
        const best = parseInt(localStorage.getItem('millionaire_best') || '0');
        if (prize > best) localStorage.setItem('millionaire_best', prize);

        els.resultOverlay.style.display = 'flex';
        if (won) {
            els.resultIcon.textContent = '🏆';
            els.resultTitle.textContent = lang === 'ar' ? 'مبروك! ربحت المليون!' : 'Bravo ! Vous avez gagné le million !';
        } else if (prize > 0) {
            els.resultIcon.textContent = '💰';
            els.resultTitle.textContent = lang === 'ar' ? 'للأسف... إجابة خاطئة' : 'Malheureusement... Mauvaise réponse';
        } else {
            els.resultIcon.textContent = '😔';
            els.resultTitle.textContent = lang === 'ar' ? 'للأسف... إجابة خاطئة' : 'Malheureusement... Mauvaise réponse';
        }
        els.resultPrize.textContent = (lang === 'ar' ? 'ربحت: ' : 'Gains: ') + formatPrize(prize);
        els.resultBtn.textContent = lang === 'ar' ? '🔄 العب مرة أخرى' : '🔄 Rejouer';
    }

    /* ── Walk Away ─── */
    function walkAway() {
        if (!gameActive || currentLevel === 0) return;
        gameActive = false;
        lang = getLang();

        const prize = PRIZES[currentLevel - 1]; // Won previous level prize
        const best = parseInt(localStorage.getItem('millionaire_best') || '0');
        if (prize > best) localStorage.setItem('millionaire_best', prize);

        els.resultOverlay.style.display = 'flex';
        els.resultIcon.textContent = '🎩';
        els.resultTitle.textContent = lang === 'ar' ? 'قررت الانسحاب بحكمة!' : 'Vous avez choisi de partir avec sagesse !';
        els.resultPrize.textContent = (lang === 'ar' ? 'ربحت: ' : 'Gains: ') + formatPrize(prize);
        els.resultBtn.textContent = lang === 'ar' ? '🔄 العب مرة أخرى' : '🔄 Rejouer';
    }

    /* ── Lifelines ─── */
    function useFiftyFifty() {
        if (!lifelines.fifty || answered) return;
        lifelines.fifty = false;
        els.lifelineFifty.disabled = true;
        els.lifelineFifty.classList.add('mill-lifeline--used');

        // Remove 2 wrong answers
        const wrongIdxs = [];
        for (let i = 0; i < 4; i++) {
            if (i !== currentQuestion._correctIdx) wrongIdxs.push(i);
        }
        const toRemove = shuffle(wrongIdxs).slice(0, 2);
        toRemove.forEach(i => {
            els.choiceBtns[i].style.display = 'none';
        });
    }

    function useAudience() {
        if (!lifelines.audience || answered) return;
        lifelines.audience = false;
        els.lifelineAudience.disabled = true;
        els.lifelineAudience.classList.add('mill-lifeline--used');

        // Show percentages
        const correct = currentQuestion._correctIdx;
        const percentages = [0, 0, 0, 0];
        percentages[correct] = 50 + Math.floor(Math.random() * 30); // 50-80%
        let remaining = 100 - percentages[correct];
        for (let i = 0; i < 4; i++) {
            if (i !== correct && els.choiceBtns[i].style.display !== 'none') {
                const val = i === 3 || (remaining <= 0) ? remaining : Math.floor(Math.random() * remaining);
                percentages[i] = Math.max(0, val);
                remaining -= percentages[i];
            }
        }
        // Adjust to 100
        percentages[correct] += remaining;

        els.choiceBtns.forEach((btn, i) => {
            if (btn.style.display !== 'none') {
                const textSpan = btn.querySelector('.mill-choice__text');
                textSpan.textContent += ` (${percentages[i]}%)`;
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
        // 80% chance friend is right
        const friendCorrect = Math.random() < 0.8;
        const friendAnswer = friendCorrect ? correct : shuffle([0, 1, 2, 3].filter(i => i !== correct))[0];

        const msg = lang === 'ar'
            ? `💬 صديقك يقول: "أعتقد أن الإجابة هي ${labels[friendAnswer]}"`
            : `💬 Votre ami dit : "Je pense que la réponse est ${labels[friendAnswer]}"`;

        // Show as a tooltip on the question
        const tip = document.createElement('div');
        tip.className = 'mill-phone-tip';
        tip.textContent = msg;
        els.question.parentElement.appendChild(tip);
        setTimeout(() => tip.remove(), 5000);
    }

    /* ── Start ─── */
    function start() {
        resolveDOM();
        currentLevel = 0;
        lifelines = { fifty: true, audience: true, phone: true };
        gameActive = true;
        answered = false;

        // Reset lifeline visuals
        els.lifelineFifty.classList.remove('mill-lifeline--used');
        els.lifelineAudience.classList.remove('mill-lifeline--used');
        els.lifelinePhone.classList.remove('mill-lifeline--used');

        buildQuestionSet();
        loadQuestion();

        // Bind events (clear old first)
        els.choiceBtns.forEach((btn, i) => {
            btn.onclick = () => selectAnswer(i);
        });
        els.lifelineFifty.onclick = useFiftyFifty;
        els.lifelineAudience.onclick = useAudience;
        els.lifelinePhone.onclick = usePhone;
        els.walkAwayBtn.onclick = walkAway;
        els.resultBtn.onclick = () => start();
        els.backBtn.onclick = () => {
            els.screen.style.display = 'none';
            document.getElementById('hubScreen').style.display = 'block';
        };
    }

    /* ── Public API ─── */
    return { start };
})();
