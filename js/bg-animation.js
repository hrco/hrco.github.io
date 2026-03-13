(function() {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;
  const BG_COLOR = [10, 13, 26]; // #0a0d1a rgb

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.vy = -(Math.random() * 0.3 + 0.1);
      this.vx = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.4 + 0.1;
      const rand = Math.random();
      this.color = rand < 0.8 ? '#ffffff' : (rand < 0.9 ? '#ff6b35' : '#00d9ff');
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach(p => p.reset());
  }

  function animate() {
    ctx.fillStyle = `rgba(${BG_COLOR[0]}, ${BG_COLOR[1]}, ${BG_COLOR[2]}, 0.12)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    rafId = requestAnimationFrame(animate);
  }

  function init() {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    mql.addEventListener('change', () => {
      if (mql.matches && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId) {
        animate();
      }
    });

    animate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
