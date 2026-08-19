(function () {
  var dot = document.querySelector('.dotfield');
  if (!dot) return;

  function clamp01(v) {
    return Math.max(0, Math.min(1, v));
  }

  function update() {
    var hero = document.querySelector('.hero');
    var contact = document.querySelector('.contact');
    if (!hero || !contact) return;
    var y = window.scrollY || window.pageYOffset || 0;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var heroBottom = hero.offsetTop + hero.offsetHeight;
    var contactTop = contact.offsetTop;
    var fade = 180;
    var fadeIn = clamp01((y - (heroBottom - vh - fade)) / fade);
    var fadeOut = clamp01((contactTop - vh + fade - y) / fade);
    dot.style.opacity = (fadeIn * fadeOut).toFixed(3);
  }

  var ticking = false;
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        update();
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();