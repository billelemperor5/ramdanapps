/* ═══════════════════════════════════════════════
   RAMADAN NIGHT JOURNEY — Canvas 2D Mini Game
   Crescent flies through night sky, collects stars,
   avoids obstacles. Parallax background, particles,
   touch + keyboard controls.
   No external libraries.
   ═══════════════════════════════════════════════ */

'use strict';

const RNJ = (() => {

    /* ── Constants ───────────────────────────────── */
    const GRAVITY = 0.38;
    const FLAP_FORCE = -6.5;
    const MAX_VEL = 8;
    const STAR_SPEED = 2.5;
    const OBS_SPEED = 3.2;
    const SPAWN_STAR = 90;   // frames between star spawns
    const SPAWN_OBS = 160;  // frames between obstacle spawns
    const BEST_KEY = 'ramadan_game_best';

    /* ── Colours ─────────────────────────────────── */
    const COL = {
        bg: '#050816',
        gold: '#d4a843',
        goldLight: '#f0d078',
        goldGlow: 'rgba(212,168,67,0.35)',
        starCol: '#ffe9a0',
        obsCol: 'rgba(180,60,60,0.7)',
        obsBorder: 'rgba(255,80,80,0.5)',
        textPrimary: '#f0ece4',
    };

    /* ── State ───────────────────────────────────── */
    let canvas, ctx, W, H, dpr;
    let running = false;
    let frameId = null;
    let score = 0;
    let bestScore = 0;
    let frameCount = 0;
    let gameState = 'idle'; // idle | playing | over

    /* ── DOM refs ────────────────────────────────── */
    let elScore, elBest, elStartOverlay, elOverOverlay;
    let elOverScore, elOverBest, elRestartBtn, elBackBtn;

    /* ── Player (crescent) ───────────────────────── */
    const player = { x: 0, y: 0, w: 36, h: 36, vy: 0, angle: 0 };

    /* ── Entity arrays ───────────────────────────── */
    let stars = [];
    let obstacles = [];
    let particles = [];
    let bgStars = []; // parallax layers

    /* ═══════════════════════════════════════════════
       PARALLAX BACKGROUND
       ═══════════════════════════════════════════════ */
    function initBgStars() {
        bgStars = [];
        for (let layer = 0; layer < 3; layer++) {
            const count = 30 + layer * 20;
            const speed = 0.2 + layer * 0.3;
            const arr = [];
            for (let i = 0; i < count; i++) {
                arr.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: 0.5 + Math.random() * (1 + layer * 0.5),
                    speed,
                    alpha: 0.2 + Math.random() * 0.6,
                });
            }
            bgStars.push(arr);
        }
    }

    function updateBgStars() {
        for (const layer of bgStars) {
            for (const s of layer) {
                s.x -= s.speed;
                if (s.x < -2) { s.x = W + 2; s.y = Math.random() * H; }
            }
        }
    }

    function drawBgStars() {
        for (const layer of bgStars) {
            for (const s of layer) {
                ctx.globalAlpha = s.alpha;
                ctx.fillStyle = COL.starCol;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }

    /* ═══════════════════════════════════════════════
       PLAYER — CRESCENT
       ═══════════════════════════════════════════════ */
    function drawCrescent(x, y, size, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        // Glow
        ctx.shadowColor = COL.goldGlow;
        ctx.shadowBlur = 18;

        // Main circle
        ctx.fillStyle = COL.gold;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();

        // Cut-out
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(size * 0.45, -size * 0.25, size * 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    function updatePlayer() {
        player.vy += GRAVITY;
        if (player.vy > MAX_VEL) player.vy = MAX_VEL;
        player.y += player.vy;
        player.angle = Math.min(Math.max(player.vy * 0.04, -0.4), 0.5);

        // Boundaries
        if (player.y < player.h) { player.y = player.h; player.vy = 0; }
        if (player.y > H - player.h) { endGame(); }
    }

    function flap() {
        if (gameState === 'idle') {
            startGame();
            return;
        }
        if (gameState === 'playing') {
            player.vy = FLAP_FORCE;
        }
    }

    /* ═══════════════════════════════════════════════
       STARS (collectibles)
       ═══════════════════════════════════════════════ */
    function spawnStar() {
        stars.push({
            x: W + 20,
            y: 40 + Math.random() * (H - 100),
            r: 8 + Math.random() * 6,
            pulse: Math.random() * Math.PI * 2,
        });
    }

    function drawStar5(cx, cy, r, rot) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const method = i === 0 ? 'moveTo' : 'lineTo';
            ctx[method](Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.fillStyle = COL.starCol;
        ctx.shadowColor = COL.starCol;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    function updateStars() {
        for (let i = stars.length - 1; i >= 0; i--) {
            const s = stars[i];
            s.x -= STAR_SPEED;
            s.pulse += 0.04;

            // Collision with player
            const dx = s.x - player.x;
            const dy = s.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < s.r + player.w * 0.6) {
                // Collected!
                score++;
                elScore.textContent = score;
                spawnParticles(s.x, s.y, COL.goldLight, 10);
                stars.splice(i, 1);
                continue;
            }

            if (s.x < -30) { stars.splice(i, 1); }
        }
    }

    function drawStars() {
        for (const s of stars) {
            const pr = s.r + Math.sin(s.pulse) * 2;
            drawStar5(s.x, s.y, pr, s.pulse * 0.5);
        }
    }

    /* ═══════════════════════════════════════════════
       OBSTACLES (meteor clouds)
       ═══════════════════════════════════════════════ */
    function spawnObstacle() {
        const h = 50 + Math.random() * 80;
        const fromTop = Math.random() > 0.5;
        obstacles.push({
            x: W + 30,
            y: fromTop ? 0 : H - h,
            w: 28 + Math.random() * 20,
            h,
            fromTop,
        });
    }

    function updateObstacles() {
        for (let i = obstacles.length - 1; i >= 0; i--) {
            const o = obstacles[i];
            o.x -= OBS_SPEED;

            // Collision
            if (
                player.x + player.w * 0.4 > o.x &&
                player.x - player.w * 0.4 < o.x + o.w &&
                player.y + player.h * 0.4 > o.y &&
                player.y - player.h * 0.4 < o.y + o.h
            ) {
                spawnParticles(player.x, player.y, '#f87171', 15);
                endGame();
                return;
            }

            if (o.x + o.w < -10) { obstacles.splice(i, 1); }
        }
    }

    function drawObstacles() {
        for (const o of obstacles) {
            ctx.fillStyle = COL.obsCol;
            ctx.strokeStyle = COL.obsBorder;
            ctx.lineWidth = 1.5;

            // Rounded rect
            const r = 6;
            ctx.beginPath();
            ctx.moveTo(o.x + r, o.y);
            ctx.lineTo(o.x + o.w - r, o.y);
            ctx.quadraticCurveTo(o.x + o.w, o.y, o.x + o.w, o.y + r);
            ctx.lineTo(o.x + o.w, o.y + o.h - r);
            ctx.quadraticCurveTo(o.x + o.w, o.y + o.h, o.x + o.w - r, o.y + o.h);
            ctx.lineTo(o.x + r, o.y + o.h);
            ctx.quadraticCurveTo(o.x, o.y + o.h, o.x, o.y + o.h - r);
            ctx.lineTo(o.x, o.y + r);
            ctx.quadraticCurveTo(o.x, o.y, o.x + r, o.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Glow pulsing at top/bottom edge
            const gy = o.fromTop ? o.y + o.h : o.y;
            const grad = ctx.createRadialGradient(o.x + o.w / 2, gy, 0, o.x + o.w / 2, gy, o.w);
            grad.addColorStop(0, 'rgba(255,80,80,0.18)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fillRect(o.x - 10, gy - 15, o.w + 20, 30);
        }
    }

    /* ═══════════════════════════════════════════════
       PARTICLES
       ═══════════════════════════════════════════════ */
    function spawnParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            particles.push({
                x, y, color,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: 1.5 + Math.random() * 2.5,
                life: 1,
                decay: 0.015 + Math.random() * 0.025,
            });
        }
    }

    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            if (p.life <= 0) particles.splice(i, 1);
        }
    }

    function drawParticles() {
        for (const p of particles) {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }

    /* ═══════════════════════════════════════════════
       GROUND LINE
       ═══════════════════════════════════════════════ */
    function drawGround() {
        const y = H - 2;
        const grad = ctx.createLinearGradient(0, y - 8, 0, y + 2);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, 'rgba(212,168,67,0.12)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, y - 8, W, 10);
    }

    /* ═══════════════════════════════════════════════
       GAME LOOP
       ═══════════════════════════════════════════════ */
    function loop() {
        update();
        draw();
        if (running) frameId = requestAnimationFrame(loop);
    }

    function update() {
        frameCount++;
        updateBgStars();

        if (gameState !== 'playing') return;

        updatePlayer();
        updateStars();
        updateObstacles();
        updateParticles();

        // Spawn logic — gets harder over time
        const diff = Math.min(score * 0.5, 40); // difficulty ramp
        if (frameCount % Math.max(SPAWN_STAR - Math.floor(diff), 40) === 0) spawnStar();
        if (frameCount % Math.max(SPAWN_OBS - Math.floor(diff * 1.5), 70) === 0) spawnObstacle();
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Background gradient
        const bg = ctx.createLinearGradient(0, 0, 0, H);
        bg.addColorStop(0, '#050816');
        bg.addColorStop(0.6, '#0a1128');
        bg.addColorStop(1, '#0d1b2a');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        drawBgStars();
        drawGround();

        if (gameState === 'playing' || gameState === 'over') {
            drawObstacles();
            drawStars();
            drawParticles();
            drawCrescent(player.x, player.y, player.w * 0.5, player.angle);
        }
    }

    /* ═══════════════════════════════════════════════
       GAME STATE MANAGEMENT
       ═══════════════════════════════════════════════ */
    function startGame() {
        gameState = 'playing';
        score = 0;
        frameCount = 0;
        stars = [];
        obstacles = [];
        particles = [];
        player.y = H * 0.4;
        player.vy = 0;
        player.angle = 0;
        elScore.textContent = '0';
        elStartOverlay.style.display = 'none';
        elOverOverlay.style.display = 'none';
    }

    function endGame() {
        gameState = 'over';
        if (score > bestScore) {
            bestScore = score;
            try { localStorage.setItem(BEST_KEY, bestScore); } catch { }
        }
        elBest.textContent = bestScore;
        elOverScore.textContent = score;
        elOverBest.textContent = bestScore;
        elOverOverlay.style.display = '';
    }

    function resetToIdle() {
        gameState = 'idle';
        score = 0;
        stars = [];
        obstacles = [];
        particles = [];
        player.vy = 0;
        player.y = H * 0.4;
        elScore.textContent = '0';
        elStartOverlay.style.display = '';
        elOverOverlay.style.display = 'none';
    }

    /* ═══════════════════════════════════════════════
       RESIZE — handles DPR
       ═══════════════════════════════════════════════ */
    function resize() {
        dpr = window.devicePixelRatio || 1;
        const rect = canvas.parentElement.getBoundingClientRect();
        W = rect.width;
        H = rect.height;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = W + 'px';
        canvas.style.height = H + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        player.x = W * 0.2;
        if (gameState === 'idle') player.y = H * 0.4;

        initBgStars();
    }

    /* ═══════════════════════════════════════════════
       INPUT HANDLERS
       ═══════════════════════════════════════════════ */
    function onKeyDown(e) {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault();
            flap();
        }
    }

    function onTouch(e) {
        // Don't intercept button clicks
        if (e.target.closest('.game-hud__back, .game-restart-btn')) return;
        e.preventDefault();
        flap();
    }

    function onOverlayClick(e) {
        // Clicking the start overlay begins the game
        if (e.target.closest('.game-hud__back, .game-restart-btn')) return;
        if (gameState === 'idle') {
            flap();
        }
    }

    /* ═══════════════════════════════════════════════
       PUBLIC API
       ═══════════════════════════════════════════════ */
    function init() {
        canvas = document.getElementById('gameCanvas');
        ctx = canvas.getContext('2d');

        elScore = document.getElementById('gameScore');
        elBest = document.getElementById('gameBestScore');
        elStartOverlay = document.getElementById('gameStartOverlay');
        elOverOverlay = document.getElementById('gameOverOverlay');
        elOverScore = document.getElementById('gameOverScore');
        elOverBest = document.getElementById('gameOverBest');
        elRestartBtn = document.getElementById('gameRestartBtn');
        elBackBtn = document.getElementById('gameBackBtn');

        // Load best score
        try { bestScore = parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch { }
        elBest.textContent = bestScore;

        // Events
        elRestartBtn.addEventListener('click', () => {
            resetToIdle();
            startGame();
        });

        elBackBtn.addEventListener('click', () => {
            stop();
            document.getElementById('gameScreen').style.display = 'none';
            document.getElementById('hubScreen').style.display = '';
        });
    }

    function start() {
        const gameScreen = document.getElementById('gameScreen');
        resize();
        resetToIdle();
        running = true;

        window.addEventListener('resize', resize);
        window.addEventListener('keydown', onKeyDown);
        gameScreen.addEventListener('touchstart', onTouch, { passive: false });
        gameScreen.addEventListener('mousedown', onTouch);
        elStartOverlay.addEventListener('click', onOverlayClick);

        loop();
    }

    function stop() {
        const gameScreen = document.getElementById('gameScreen');
        running = false;
        if (frameId) { cancelAnimationFrame(frameId); frameId = null; }
        window.removeEventListener('resize', resize);
        window.removeEventListener('keydown', onKeyDown);
        gameScreen.removeEventListener('touchstart', onTouch);
        gameScreen.removeEventListener('mousedown', onTouch);
        elStartOverlay.removeEventListener('click', onOverlayClick);
        gameState = 'idle';
    }

    return { init, start };
})();

/* Boot after DOM is ready */
document.addEventListener('DOMContentLoaded', RNJ.init);
