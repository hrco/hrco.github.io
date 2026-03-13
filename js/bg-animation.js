(function() {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;
  let resizeTimer = null;
  const BG_COLOR = [10, 13, 26]; // #0a0d1a rgb

  class Particle {
    constructor(randomY) {
      this.init(randomY);
    }

    init(randomY) {
      this.x = Math.random() * canvas.width;
      this.y = randomY ? Math.random() * canvas.height : canvas.height;
      this.vy = -(Math.random() * 0.3 + 0.1);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
      const rand = Math.random();
      this.color = rand < 0.8 ? '#ffffff' : (rand < 0.9 ? '#ff6b35' : '#00d9ff');
    }

    reset() {
      // Respawn at bottom, not random — keeps the upward-drift visual consistent
      this.init(false);
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function resizeCanvas() {
    const newW = window.innerWidth;
    const newH = window.innerHeight;
    // Only resize if dimensions changed by more than 50px — ignores mobile URL bar
    if (Math.abs(canvas.width - newW) < 50 && Math.abs(canvas.height - newH) < 50) return;
    canvas.width = newW;
    canvas.height = newH;
    // Don't reset particles — just clip out-of-bounds ones naturally via update()
  }

  function onResize() {
    // Debounce: wait 150ms after last resize event before acting
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  }

  function animate() {
    ctx.fillStyle = `rgba(${BG_COLOR[0]}, ${BG_COLOR[1]}, ${BG_COLOR[2]}, 0.12)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    rafId = requestAnimationFrame(animate);
  }

  function pause() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resume() {
    if (!rafId) animate();
  }

  function init() {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Seed particles spread across the canvas, not all at the bottom
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(true));
    }

    window.addEventListener('resize', onResize, { passive: true });

    // Pause when tab is hidden, resume when visible — prevents jump on return
    document.addEventListener('visibilitychange', () => {
      document.hidden ? pause() : resume();
    });

    mql.addEventListener('change', () => {
      mql.matches ? pause() : resume();
    });

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
