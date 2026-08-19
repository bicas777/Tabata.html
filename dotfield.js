(function () {
  var container = document.querySelector('.dotfield');
  if (!container) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var spacing = 30;
  var dotRadius = 1.3;
  var bulgeRadius = 150;
  var bulgeStrength = 20;
  var mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  var dots = [];

  function build() {
    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var cols = Math.floor(width / spacing) + 2;
    var rows = Math.floor(height / spacing) + 2;
    dots.length = 0;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        dots.push({
          x: c * spacing,
          y: r * spacing,
          dx: 0,
          dy: 0
        });
      }
    }
  }

  function drawStatic() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(166,233,255,0.45)';
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      ctx.beginPath();
      ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step(dt) {
    var width = container.clientWidth || window.innerWidth;
    var height = container.clientHeight || window.innerHeight;

    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;

    ctx.clearRect(0, 0, width, height);

    if (mouse.x > -100) {
      var g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      g.addColorStop(0, 'rgba(102,215,255,0.10)');
      g.addColorStop(1, 'rgba(102,215,255,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    }

    var lerp = Math.min(1, dt * 6);
    ctx.fillStyle = 'rgba(166,233,255,0.5)';
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var mx = d.x - mouse.x;
      var my = d.y - mouse.y;
      var dist = Math.sqrt(mx * mx + my * my);
      var tx = 0;
      var ty = 0;
      if (dist < bulgeRadius && dist > 0.001) {
        var f = 1 - dist / bulgeRadius;
        var push = bulgeStrength * f * f;
        tx = (mx / dist) * push;
        ty = (my / dist) * push;
      }
      d.dx += (tx - d.dx) * lerp;
      d.dy += (ty - d.dy) * lerp;
      ctx.beginPath();
      ctx.arc(d.x + d.dx, d.y + d.dy, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function onPointerMove(e) {
    var rect = container.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  }
  function onPointerLeave() {
    mouse.tx = -9999;
    mouse.ty = -9999;
  }

  build();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(build);
    ro.observe(container);
  } else {
    window.addEventListener('resize', build);
  }

  if (!reduced) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
  }

  var last = performance.now();
  var raf = 0;

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    step(dt);
  }

  if (reduced) {
    drawStatic();
  } else {
    raf = requestAnimationFrame(loop);
  }
})();