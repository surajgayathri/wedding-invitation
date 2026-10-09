(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (id) { return document.getElementById(id); };
  var cover = $('cover'), main = $('main'), bgm = $('bgm'), mb = $('music'), fx = $('fx');

  /* ---------- Petals & particles ---------- */
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function buildFx() {
    if (reduce) return;
    var small = window.innerWidth < 600 || (navigator.hardwareConcurrency || 4) <= 4;
    var nPetals = small ? 24 : 42, nHearts = small ? 14 : 24, nFlowers = small ? 14 : 24, nDots = small ? 14 : 24;
    var colors = [
      'linear-gradient(135deg,#f7b6c4,#e98aa3)', 'linear-gradient(135deg,#ffd9c7,#f9b99b)',
      'linear-gradient(135deg,#ffffff,#f6e6ea)', 'linear-gradient(135deg,#f4a3b5,#d96b8a)'
    ];
    function anim(el, left) {
      el.classList.add('petal');
      el.style.left = left + '%';
      el.style.setProperty('--o', rnd(.5, .9).toFixed(2));
      el.style.setProperty('--dx', rnd(-170, 170).toFixed(0) + 'px');
      el.style.setProperty('--r', rnd(180, 640).toFixed(0) + 'deg');
      el.style.animationDuration = rnd(9, 18).toFixed(1) + 's';
      el.style.animationDelay = (-rnd(0, 18)).toFixed(1) + 's';
      fx.appendChild(el);
    }
    for (var i = 0; i < nPetals; i++) {
      var p = document.createElement('i'), s = rnd(9, 20);
      p.style.width = s + 'px'; p.style.height = (s * 1.3) + 'px';
      p.style.background = colors[(Math.random() * colors.length) | 0];
      anim(p, rnd(0, 100));
    }
    var hc = ['#e8506a', '#f27f96', '#d6455f', '#ff9db0', '#c93a58'];
    for (var k = 0; k < nHearts; k++) {
      var hh = document.createElement('i');
      hh.className = 'glyph'; hh.textContent = '\u2665';
      hh.style.fontSize = rnd(12, 26).toFixed(0) + 'px';
      hh.style.color = hc[(Math.random() * hc.length) | 0];
      anim(hh, rnd(0, 100));
    }
    var fg = ['\u273F', '\u2740', '\u2741', '\u273E', '\u2743'], fc = ['#f4a3b5', '#ffb89a', '#ffffff', '#f7c6d0', '#e98aa3', '#ffd27a'];
    for (var f = 0; f < nFlowers; f++) {
      var fl = document.createElement('i');
      fl.className = 'glyph'; fl.textContent = fg[(Math.random() * fg.length) | 0];
      fl.style.fontSize = rnd(16, 32).toFixed(0) + 'px';
      fl.style.color = fc[(Math.random() * fc.length) | 0];
      fl.style.textShadow = '0 0 2px rgba(168,77,101,.35)';
      anim(fl, rnd(0, 100));
    }
    for (var j = 0; j < nDots; j++) {
      var d = document.createElement('i'), z = rnd(3, 7);
      d.className = 'dot';
      d.style.cssText = 'left:' + rnd(0, 100) + '%;top:' + rnd(0, 100) + '%;width:' + z + 'px;height:' + z + 'px;--fx:' + rnd(-30, 30).toFixed(0) + 'px;--fy:' + rnd(-50, 50).toFixed(0) + 'px;' +
        'animation-duration:' + rnd(7, 14).toFixed(1) + 's,' + rnd(2.5, 5).toFixed(1) + 's;animation-delay:' + (-rnd(0, 8)).toFixed(1) + 's,' + (-rnd(0, 4)).toFixed(1) + 's';
      fx.appendChild(d);
    }
  }
  buildFx();

  /* ---------- Music ---------- */
  bgm.volume = 0.35;
  function setUI(playing) {
    mb.classList.toggle('playing', playing);
    mb.setAttribute('aria-pressed', playing ? 'true' : 'false');
    mb.setAttribute('aria-label', playing ? 'Pause wedding music' : 'Play wedding music');
  }
  function play() {
    try {
      var r = bgm.play();
      if (r && r.then) r.then(function () { setUI(true); }).catch(function () { setUI(false); });
      else setUI(true);
    } catch (e) { setUI(false); }
  }
  mb.addEventListener('click', function () { if (bgm.paused) play(); else { bgm.pause(); setUI(false); } });
  bgm.addEventListener('error', function () { setUI(false); }, true);

  /* ---------- Open invitation ---------- */
  $('openBtn').addEventListener('click', function () {
    bgm.load(); play();
    cover.classList.add('open');
    main.classList.add('show'); main.removeAttribute('aria-hidden');
    document.body.classList.remove('locked');
    mb.hidden = false; setUI(!bgm.paused);
    window.scrollTo(0, 0);
    setTimeout(function () { cover.style.display = 'none'; observe(); }, 1150);
  });

  /* ---------- Scroll reveal ---------- */
  function observe() {
    var els = document.querySelectorAll('.rv');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Countdown (IST) ---------- */
  var target = Date.parse('2026-10-25T11:05:00+05:30');
  var ids = ['d', 'h', 'm', 's'], last = {};
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var t = Math.max(0, target - Date.now());
    if (t === 0) { $('cd').hidden = true; $('cdDone').hidden = false; clearInterval(timer); return; }
    var v = [Math.floor(t / 864e5), Math.floor(t % 864e5 / 36e5), Math.floor(t % 36e5 / 6e4), Math.floor(t % 6e4 / 1e3)];
    v.forEach(function (n, i) {
      var el = $(ids[i]), txt = pad(n);
      if (last[i] !== txt) {
        el.textContent = txt;
        if (!reduce && i === 3) { el.classList.add('tick'); setTimeout(function () { el.classList.remove('tick'); }, 250); }
        last[i] = txt;
      }
    });
  }
  var timer = setInterval(tick, 1000); tick();
})();
