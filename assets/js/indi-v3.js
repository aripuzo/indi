(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— Hero: split chars into spans, animate after preloader ——— */
  function initHero() {
    const line1 = document.getElementById('heroLine1');
    const line2 = document.getElementById('heroLine2');
    if (!line1 || !line2) return;

    const buildChars = (container, text, baseDelay) => {
      [...text].forEach((c, i) => {
        const span = document.createElement('span');
        span.className = 'ch';
        span.style.animationDelay = (baseDelay + i * 28) + 'ms';
        span.textContent = c === ' ' ? ' ' : c;
        container.appendChild(span);
      });
    };

    buildChars(line1, 'Software,', 100);

    const em = document.createElement('em');
    buildChars(em, 'shipped.', 420);
    line2.appendChild(em);
  }

  function fireHero() {
    document.querySelectorAll('#heroMega .ch').forEach(ch => ch.classList.add('in'));
  }

  /* ——— Preloader ——— */
  function initPreloader() {
    const el = document.getElementById('preloader');
    const pct = document.getElementById('preloaderPct');
    if (!el) { fireHero(); return; }

    if (REDUCED) {
      el.remove();
      fireHero();
      return;
    }

    const dur = 1600;
    let raf, start;

    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      pct.innerHTML = Math.round(eased * 100) + '<em>%</em>';
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    setTimeout(() => {
      cancelAnimationFrame(raf);
      pct.innerHTML = '100<em>%</em>';
      el.classList.add('exit');
      fireHero();
    }, dur + 200);

    setTimeout(() => el.remove(), dur + 200 + 1100);
  }

  /* ——— Custom cursor ——— */
  function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const over = (e) => {
      if (e.target.closest('a, button, .svc-row, .quote-pip')) ring.classList.add('hot');
      else ring.classList.remove('hot');
    };

    const loop = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', over, { passive: true });
    requestAnimationFrame(loop);
  }

  /* ——— Ambient orb ——— */
  function initOrb() {
    const el = document.getElementById('orb');
    if (!el) return;
    el.style.top = '-20vh';
    el.style.left = '30vw';

    const loop = () => {
      const p = window.scrollY / Math.max(document.body.scrollHeight - innerHeight, 1);
      const x = Math.sin(p * Math.PI * 2) * 30 - 20;
      const y = p * 120 - 30;
      el.style.transform = `translate(${x}vw, ${y}vh)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ——— Nav: hide on scroll-down, glass on scroll ——— */
  function initNav() {
    const nav = document.getElementById('nav');
    const timeEl = document.getElementById('navTime');
    if (!nav) return;

    let lastY = window.scrollY;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 40);
      nav.classList.toggle('hidden', y > lastY && y > 300);
      lastY = y;
    }, { passive: true });

    if (timeEl) {
      const tick = () => {
        const t = new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Lagos',
        });
        timeEl.textContent = 'Lagos — ' + t;
      };
      tick();
      setInterval(tick, 30000);
    }
  }

  /* ——— Velocity marquee: constant drift + scroll-speed boost + skew ——— */
  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track || REDUCED) return;

    const BASE = 0.6;
    let x = 0, lastY = window.scrollY, vel = 0;

    const half = () => track.scrollWidth / 2;

    const loop = () => {
      const y = window.scrollY;
      vel += ((y - lastY) - vel) * 0.08;
      lastY = y;
      x -= BASE + Math.min(Math.abs(vel) * 0.35, 14);
      if (-x >= half()) x += half();
      const skew = Math.max(-8, Math.min(8, vel * 0.18));
      track.style.transform = `translateX(${x}px) skewX(${skew}deg)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ——— IntersectionObserver reveals ——— */
  function initReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.rv, .rv-line').forEach(el => io.observe(el));

    const workIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          workIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.work-frame').forEach(el => workIo.observe(el));
  }

  /* ——— Studio: words light up as section enters view ——— */
  function initStudioWords() {
    const el = document.getElementById('studioStatement');
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const words = el.querySelectorAll('.dim');
          words.forEach((w, i) => setTimeout(() => w.classList.add('lit'), 120 + i * 90));
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  /* ——— Counters: animate 0→N when visible ——— */
  function initCounters() {
    if (REDUCED) {
      document.querySelectorAll('.counter').forEach(el => {
        el.textContent = el.dataset.to;
      });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        const el = e.target;
        const to = parseInt(el.dataset.to, 10);
        const dur = parseInt(el.dataset.dur, 10) || 1800;
        let start;
        const tick = (t) => {
          if (!start) start = t;
          const p = Math.min((t - start) / dur, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * to);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = to;
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(el => io.observe(el));
  }

  /* ——— Work: parallax on each plate ——— */
  function initWorkFrames() {
    if (REDUCED) return;

    document.querySelectorAll('.work-frame .plate').forEach(plate => {
      const loop = () => {
        const r = plate.getBoundingClientRect();
        const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        plate.style.transform = `scale(1.12) translateY(${p * -40}px)`;
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  /* ——— Magnetic button ——— */
  function initMagnetic() {
    const el = document.getElementById('magWrap');
    if (!el || window.matchMedia('(hover: none)').matches || REDUCED) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;

    window.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const range = Math.max(r.width, r.height) * 1.4;
      if (dist < range) { tx = dx * 0.35; ty = dy * 0.35; }
      else { tx = 0; ty = 0; }
    }, { passive: true });

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ——— Quote carousel with progress pips ——— */
  function initQuotes() {
    const megaEl = document.getElementById('quoteMega');
    const whoEl = document.getElementById('quoteWho');
    const roleEl = document.getElementById('quoteRole');
    const navEl = document.getElementById('quoteNav');
    if (!megaEl || !navEl) return;

    const quotes = [
      { html: '“Same brief, half the timeline, <em>twice the polish.</em>”', who: 'Tomi A.', role: 'Founder, Classfun' },
      { html: '“They behave <em>like co-founders</em> — skin in the game from day one.”', who: 'Yemi O.', role: 'CEO, GlobalTravel' },
      { html: '“The only internal tool our ops team <em>actually likes.</em>”', who: 'Ruth E.', role: 'Ops, Earlybean' },
    ];

    let current = 0;
    let timer;

    quotes.forEach((_, k) => {
      const btn = document.createElement('button');
      btn.className = 'quote-pip';
      btn.setAttribute('aria-label', 'Quote ' + (k + 1));
      btn.innerHTML = '<span class="prog"></span>';
      btn.addEventListener('click', () => { clearInterval(timer); show(k); scheduleAuto(); });
      navEl.appendChild(btn);
    });

    const pips = navEl.querySelectorAll('.quote-pip');

    function show(n) {
      current = n;
      megaEl.innerHTML = quotes[n].html;
      whoEl.textContent = quotes[n].who;
      roleEl.textContent = ' ' + quotes[n].role;

      pips.forEach((pip, k) => {
        const prog = pip.querySelector('.prog');
        pip.classList.remove('active');
        prog.style.animation = 'none';
        void pip.offsetWidth;
        if (k === n) {
          pip.classList.add('active');
          prog.style.animation = '';
        }
      });
    }

    function scheduleAuto() {
      timer = setInterval(() => show((current + 1) % quotes.length), 7000);
    }

    show(0);
    scheduleAuto();
  }

  /* ——— Boot ——— */
  initHero();
  initPreloader();
  initCursor();
  initOrb();
  initNav();
  initMarquee();
  initReveals();
  initStudioWords();
  initCounters();
  initWorkFrames();
  initMagnetic();
  initQuotes();
})();
