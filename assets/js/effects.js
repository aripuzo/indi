/* indi — effects & animations */
(function () {
  'use strict';

  /* ── 1. PAGE CURTAIN REVEAL ─────────────────────────────────────────── */
  var curtain = document.getElementById('curtain');
  if (curtain) {
    requestAnimationFrame(function () {
      curtain.classList.add('curtain--go');
      setTimeout(function () { curtain.remove(); }, 1400);
    });
  }

  /* ── 2. SCROLL PROGRESS BAR ─────────────────────────────────────────── */
  var bar = document.getElementById('scroll-bar');
  function updateBar() {
    var max = document.body.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();

  /* ── 3. CURSOR SPOTLIGHT ─────────────────────────────────────────────── */
  var spotlight = document.getElementById('cursor-spotlight');
  var mouseX = -9999, mouseY = -9999;
  var spX = -9999, spY = -9999;
  var raf;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!raf) raf = requestAnimationFrame(animateSpotlight);
  });

  document.addEventListener('mouseleave', function () {
    mouseX = -9999; mouseY = -9999;
  });

  function animateSpotlight() {
    raf = null;
    spX += (mouseX - spX) * 0.12;
    spY += (mouseY - spY) * 0.12;
    spotlight.style.left = spX + 'px';
    spotlight.style.top  = spY + 'px';
    if (Math.abs(mouseX - spX) > 0.3 || Math.abs(mouseY - spY) > 0.3) {
      raf = requestAnimationFrame(animateSpotlight);
    }
  }

  /* ── 4. SCROLL-TRIGGERED REVEALS ────────────────────────────────────── */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ── 5. STAT COUNTER ANIMATION ──────────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseFloat(el.dataset.count);
        var isInt = Number.isInteger(target);
        var suffix = el.dataset.suffix || '';
        var prefix = el.dataset.prefix || '';
        var start = 0, duration = 1400, startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var ease = 1 - Math.pow(1 - progress, 3);
          var val = start + (target - start) * ease;
          el.textContent = prefix + (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  /* ── 6. HERO PARALLAX ───────────────────────────────────────────────── */
  var heroMega = document.querySelector('.hero-mega');
  var heroFoot = document.querySelector('.hero-foot');
  function onScroll() {
    var y = window.scrollY;
    if (heroMega) heroMega.style.transform = 'translateY(' + y * 0.18 + 'px)';
    if (heroFoot) heroFoot.style.opacity = Math.max(0, 1 - y / 300);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 7. PORTFOLIO CARD 3-D TILT ─────────────────────────────────────── */
  document.querySelectorAll('.case-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top  + r.height / 2;
      var dx = (e.clientX - cx) / (r.width  / 2);
      var dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform = 'perspective(900px) rotateY(' + dx * 4 + 'deg) rotateX(' + (-dy * 3) + 'deg) translateZ(8px)';
    });
    function reset() {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0)';
    }
    card.addEventListener('mouseleave', reset);
  });

  /* ── 8. MAGNETIC BUTTONS ────────────────────────────────────────────── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width  / 2);
      var dy = e.clientY - (r.top  + r.height / 2);
      btn.style.transform = 'translate(' + dx * 0.28 + 'px, ' + dy * 0.28 + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

  /* ── 9. MARQUEE — pause on hover, speed on scroll ───────────────────── */
  var marqueeTrack = document.querySelector('.marquee-track');
  var marquee      = document.querySelector('.marquee');
  if (marquee && marqueeTrack) {
    marquee.addEventListener('mouseenter', function () {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', function () {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ── 10. SECTION-HEAD NUMBER STAGGER ───────────────────────────────── */
  document.querySelectorAll('.section-head').forEach(function (head, i) {
    head.style.transitionDelay = (i * 0.06) + 's';
  });

  /* ── 11. SERVICES ROW GOLD FLASH ───────────────────────────────────── */
  document.querySelectorAll('.svc-row').forEach(function (row) {
    row.addEventListener('mouseenter', function () {
      var flash = document.createElement('span');
      flash.className = 'svc-flash';
      row.appendChild(flash);
      setTimeout(function () { flash.remove(); }, 600);
    });
  });

  /* ── 12. CONTACT EMAIL — glitch on hover ────────────────────────────── */
  var emailLink = document.querySelector('.contact-mega a');
  if (emailLink) {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.';
    var orig = emailLink.textContent;
    var glitchTimer;
    emailLink.addEventListener('mouseenter', function () {
      var iter = 0;
      clearInterval(glitchTimer);
      glitchTimer = setInterval(function () {
        emailLink.textContent = orig.split('').map(function (ch, idx) {
          if (idx < iter) return orig[idx];
          if (ch === '\n' || ch === ' ') return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iter += 1.6;
        if (iter > orig.length) {
          emailLink.textContent = orig;
          clearInterval(glitchTimer);
        }
      }, 40);
    });
    emailLink.addEventListener('mouseleave', function () {
      clearInterval(glitchTimer);
      emailLink.textContent = orig;
    });
  }

}());
