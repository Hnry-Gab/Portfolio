'use strict';

(function () {
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

(function () {
  const phrases = [
    "AI Engineer & Data Scientist.",
    "LLM & Fine-tuning Specialist.",
    "Data manipulation & Insight extraction.",
    "Building apps with Rust, Python, and TS.",
    "AI-powered IoT & Metaverse Enthusiast.",
    "Automation addict & Efficiency driven.",
    "Virtual Reality & Immersive Tech lover.",
    "Anime & Rock & Code enjoyer."
  ];
  
  const el = document.getElementById('typewriter');
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    
    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
    } else {
      el.textContent = current.slice(0, --charIdx);
    }

    let delay = deleting ? 20 : 45;

    if (!deleting && charIdx === current.length) {
      delay = 2500; 
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500; 
    }
    setTimeout(type, delay);
  }
  type();
})();

(function () {
  const items = document.querySelectorAll(
    '.skill-card, .project-card, .interest-card, .stat-card, .contact-item, .terminal-box, .about-avatar-container'
  );
  items.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  items.forEach(el => observer.observe(el));
})();

(function () {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach(bar => observer.observe(bar));
})();

(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project-item');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();

(function () {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

(function () {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toastMsg');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
    btn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.classList.add('show');
        form.reset();
        setTimeout(() => toast.classList.remove('show'), 3500);
      } else {
        alert('Error sending message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again.');
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });
})();

(function () {
  const tracks = [
    'Master of Puppets — Metallica',
    'Numb — Linkin Park',
    'Schism — Tool',
    'Highway to Hell — AC/DC',
    'Bohemian Rhapsody — Queen',
    'No More Tears — Ozzy Osbourne',
    'Heart-Shaped Box — Nirvana',
    'Duality — Slipknot',
    'Enter Sandman — Metallica',
    'Faint — Linkin Park',
    'Crawling — Linkin Park',
    'Mercury:Retrograde — Ghostemane',
    'Sweet Child O\' Mine — Guns N\' Roses',
    'Psychosocial — Slipknot',
    'The Loneliest — Maneskin',
    'Bleed it Out — Linkin Park'
  ];
  const el = document.getElementById('nowPlaying');
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % tracks.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = tracks[idx];
      el.style.opacity = '1';
    }, 400);
  }, 6000);

  el.style.transition = 'opacity 0.4s';
})();

(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
})();

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'particleCanvas';
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: 0;
    opacity: 0.35;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224, 16, 16, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(224, 16, 16, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
})();
