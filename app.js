/* ============================================================
   FOURS — shared site behavior
   Loaded on every page. Safely no-ops for elements that
   don't exist on the current page.
============================================================ */

/* ---- highlight current nav link based on body[data-page] ---- */
(function(){
  const current = document.body.dataset.page;
  if (!current) return;
  document.querySelectorAll('[data-page-link]').forEach(el => {
    if (el.dataset.pageLink === current) el.classList.add('active');
  });
})();

/* ---- ambient glow follows cursor ---- */
(function(){
  const glow = document.getElementById('glow');
  if (!glow) return;
  let targetX = 50, targetY = 20, curX = 50, curY = 20;
  window.addEventListener('pointermove', (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  }, { passive:true });

  function animateGlow(){
    curX += (targetX - curX) * 0.06;
    curY += (targetY - curY) * 0.06;
    glow.style.setProperty('--mx', curX + '%');
    glow.style.setProperty('--my', curY + '%');
    requestAnimationFrame(animateGlow);
  }
  requestAnimationFrame(animateGlow);
})();

/* ---- scroll reveal ---- */
(function(){
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
})();

/* ---- click ripple on buttons ---- */
(function(){
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
})();

/* ---- hamburger menu ---- */
(function(){
  const burgerBtn = document.getElementById('burgerBtn');
  const menuPanel = document.getElementById('menuPanel');
  const menuBackdrop = document.getElementById('menuBackdrop');
  if (!burgerBtn || !menuPanel || !menuBackdrop) return;

  function openMenu(){
    burgerBtn.classList.add('open');
    menuPanel.classList.add('open');
    menuBackdrop.classList.add('open');
  }
  function closeMenu(){
    burgerBtn.classList.remove('open');
    menuPanel.classList.remove('open');
    menuBackdrop.classList.remove('open');
  }
  burgerBtn.addEventListener('click', () => {
    menuPanel.classList.contains('open') ? closeMenu() : openMenu();
  });
  menuBackdrop.addEventListener('click', closeMenu);
})();

/* ---- title glitch: "44444" -> "FOURS", repeats every 5s ---- */
(function(){
  const titleSpans = document.querySelectorAll('#title span');
  if (!titleSpans.length) return;

  const glyphs = '4$#%&F0UR5?!*';
  const perLetterDelay = 140;
  const glitchDuration = 500;
  const glitchTick = 45;
  let glitchRunning = false;

  function runTitleGlitch(){
    if (glitchRunning) return;
    glitchRunning = true;
    titleSpans.forEach((span, i) => {
      span.classList.remove('locked');
      span.textContent = '4';
      const startAt = i * perLetterDelay;
      const finalChar = span.dataset.final;

      setTimeout(() => {
        span.classList.add('glitching');
        const glitchInterval = setInterval(() => {
          span.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        }, glitchTick);

        setTimeout(() => {
          clearInterval(glitchInterval);
          span.classList.remove('glitching');
          span.textContent = finalChar;
          span.classList.add('locked');
          if (i === titleSpans.length - 1) glitchRunning = false;
        }, glitchDuration);

      }, startAt);
    });
  }

  runTitleGlitch();
  setInterval(runTitleGlitch, 5000);
})();
