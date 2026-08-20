(function () {
  var container = document.querySelector('.aurora');
  if (!container) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  container.appendChild(canvas);

  var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: true });
  if (!gl) {
    console.warn('gradient-blinds: WebGL indisponivel - usando fallback CSS');
    return;
  }
  container.classList.add('aurora--gl');

  var VERT = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

  var FRAG = `#version 100
precision mediump float;

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3  uColor0;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;
uniform vec3  uColor4;
uniform vec3  uColor5;
uniform vec3  uColor6;
uniform vec3  uColor7;
uniform int   uColorCount;

varying vec2 vUv;

float rand(vec2 co){
  return fract(sin(dot(co, vec2(12.9898,78.233))) * 43758.5453);
}

vec2 rotate2D(vec2 p, float a){
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec3 getGradientColor(float t){
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);

  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  vec2 uv0 = fragCoord / iResolution.xy;

  float aspect = iResolution.x / iResolution.y;
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle);
  pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;

  vec2 uvMod = uv;
  if (uDistort > 0.0) {
    float a = uvMod.y * 6.0;
    float b = uvMod.x * 6.0;
    float w = 0.01 * uDistort;
    uvMod.x += sin(a) * w;
    uvMod.y += cos(b) * w;
  }
  float t = uvMod.x;
  if (uMirror > 0.5) {
    t = 1.0 - abs(1.0 - 2.0 * fract(t));
  }
  vec3 base = getGradientColor(t);

  vec2 offset = vec2(iMouse.x / iResolution.x, iMouse.y / iResolution.y);
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 1e-4);
  float dn = d / r;
  float spot = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  vec3 cir = vec3(spot);
  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;
  vec3 ran = vec3(stripe);

  vec3 col = cir + base - ran;
  col += (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise;

  gl_FragColor = vec4(col, 1.0);
}
`;

  function compile(type, src) {
    var sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('gradient-blinds: shader error: ' + gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  var program = gl.createProgram();
  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('gradient-blinds: link error: ' + gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var posLoc = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  }

  var stops = ['#166088', '#4a6fa5', '#c0d6df'].map(hexToRgb);
  var colorCount = stops.length;
  while (stops.length < 8) stops.push(stops[stops.length - 1]);

  function mk(name, value) {
    return { loc: gl.getUniformLocation(program, name), value: value, int: false };
  }

  var uni = {
    iResolution: mk('iResolution', new Float32Array([1, 1, 1])),
    iMouse: mk('iMouse', new Float32Array([0, 0])),
    iTime: mk('iTime', 0),
    uAngle: mk('uAngle', 176),
    uNoise: mk('uNoise', 0.33),
    uBlindCount: mk('uBlindCount', 23),
    uSpotlightRadius: mk('uSpotlightRadius', 0.25),
    uSpotlightSoftness: mk('uSpotlightSoftness', 1),
    uSpotlightOpacity: mk('uSpotlightOpacity', 1),
    uMirror: mk('uMirror', 0),
    uDistort: mk('uDistort', 33),
    uShineFlip: mk('uShineFlip', 0)
  };
  uni.uColorCount = mk('uColorCount', colorCount);
  uni.uColorCount.int = true;
  for (var i = 0; i < 8; i++) uni['uColor' + i] = mk('uColor' + i, new Float32Array(stops[i]));

  function setUniforms() {
    for (var k in uni) {
      var uu = uni[k];
      if (uu.loc === null) continue;
      var v = uu.value;
      if (uu.int) gl.uniform1i(uu.loc, v);
      else if (typeof v === 'number') gl.uniform1f(uu.loc, v);
      else if (v.length === 3) gl.uniform3fv(uu.loc, v);
      else if (v.length === 2) gl.uniform2fv(uu.loc, v);
    }
  }

  var dpr = window.devicePixelRatio || 1;

  function resize() {
    var rect = container.getBoundingClientRect();
    var w = Math.max(1, Math.floor(rect.width));
    var h = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    uni.iResolution.value[0] = canvas.width;
    uni.iResolution.value[1] = canvas.height;
    uni.iResolution.value[2] = 1;
    var maxByMinWidth = Math.max(1, Math.floor(w / 60));
    uni.uBlindCount.value = Math.max(1, Math.min(16, maxByMinWidth));
    uni.iMouse.value[0] = canvas.width / 2;
    uni.iMouse.value[1] = canvas.height / 2;
  }

  var mouseTarget = [0, 0];
  window.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouseTarget[0] = (e.clientX - rect.left) * dpr;
    mouseTarget[1] = (rect.height - (e.clientY - rect.top)) * dpr;
  });

  var raf = null;
  var last = 0;

  function render() {
    setUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    uni.iTime.value = t * 0.001;
    if (!last) last = t;
    var dt = (t - last) / 1000;
    last = t;
    var tau = 0.15;
    var factor = 1 - Math.exp(-dt / tau);
    if (factor > 1) factor = 1;
    uni.iMouse.value[0] += (mouseTarget[0] - uni.iMouse.value[0]) * factor;
    uni.iMouse.value[1] += (mouseTarget[1] - uni.iMouse.value[1]) * factor;
    render();
  }

  var vw = window.innerWidth;
  var vh = window.innerHeight;

  function updateClip() {
    var aboutEl = document.querySelector('#sobre');
    if (!aboutEl) return;
    var projEl = document.querySelector('#projetos');
    var a = aboutEl.getBoundingClientRect();
    var b = projEl ? projEl.getBoundingClientRect() : a;
    var top = Math.max(0, Math.min(a.top, b.top));
    var bottom = Math.max(0, vh - Math.max(a.bottom, b.bottom));
    var left = Math.max(0, Math.min(a.left, b.left));
    var right = Math.max(0, vw - Math.max(a.right, b.right));
    container.style.clipPath = 'inset(' + top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px)';
  }

  resize();
  updateClip();
  if (reduced) {
    render();
  } else {
    raf = requestAnimationFrame(loop);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function () {
        updateClip();
        ticking = false;
      });
    }
  }, { passive: true });

  if ('ResizeObserver' in window) {
    new ResizeObserver(function () {
      vw = window.innerWidth;
      vh = window.innerHeight;
      resize();
      updateClip();
    }).observe(container);
  } else {
    window.addEventListener('resize', function () {
      vw = window.innerWidth;
      vh = window.innerHeight;
      resize();
      updateClip();
    });
  }
})();