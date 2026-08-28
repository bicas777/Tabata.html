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
precision highp float;

uniform vec3  iResolution;
uniform vec2  iMouse;
uniform float iTime;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3  uColor1;
uniform vec3  uColor2;
uniform vec3  uColor3;

varying vec2 vUv;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = vUv * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = iTime * uSpeed * 0.5;
  float fullT = iTime * uSpeed;

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, 0.5);

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;

  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
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

  var stops = ['#0003f3', '#06B6D4', '#7C3AED'].map(hexToRgb);

  function mk(name, value) {
    var t;
    if (typeof value === 'number') t = 'float';
    else if (typeof value === 'boolean') t = 'bool';
    else if (value.length === 3) t = 'vec3';
    else if (value.length === 2) t = 'vec2';
    else t = 'unknown';
    return { loc: gl.getUniformLocation(program, name), value: value, type: t };
  }

  var uni = {
    iResolution: mk('iResolution', new Float32Array([1, 1, 1])),
    iTime: mk('iTime', 0),
    uSpeed: mk('uSpeed', 0.3),
    uInnerLines: mk('uInnerLines', 40.0),
    uOuterLines: mk('uOuterLines', 40.0),
    uWarpIntensity: mk('uWarpIntensity', 2.3),
    uRotation: mk('uRotation', 25 * Math.PI / 180),
    uEdgeFadeWidth: mk('uEdgeFadeWidth', 0.0),
    uColorCycleSpeed: mk('uColorCycleSpeed', 1.2),
    uBrightness: mk('uBrightness', 0.2),
    uColor1: mk('uColor1', new Float32Array(stops[0])),
    uColor2: mk('uColor2', new Float32Array(stops[1])),
    uColor3: mk('uColor3', new Float32Array(stops[2]))
  };

  function setUniforms() {
    for (var k in uni) {
      var uu = uni[k];
      if (uu.loc === null) continue;
      var v = uu.value;
      if (uu.type === 'float') gl.uniform1f(uu.loc, v);
      else if (uu.type === 'bool') gl.uniform1i(uu.loc, v ? 1 : 0);
      else if (uu.type === 'vec3') gl.uniform3fv(uu.loc, v);
      else if (uu.type === 'vec2') gl.uniform2fv(uu.loc, v);
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
    uni.iResolution.value[2] = canvas.width / canvas.height;
  }

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