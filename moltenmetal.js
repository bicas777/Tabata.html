import * as THREE from 'three';

const vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragment = `
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;

  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;

  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;

  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;

  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }

  c /= 6.0;

  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;

  float g = clamp(intensity, 0.0, 1.0);

  float mid = 0.5;
  if (uColorMode > 1.5) {
    mid = 0.65;
  } else if (uColorMode > 0.5) {
    mid = 0.35;
  }

  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));

  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  gl_FragColor = vec4(col * a, a);
}
`;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return new THREE.Vector3(1, 1, 1);
  return new THREE.Vector3(
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  );
}

(function () {
  const container = document.querySelector('.molten-metal');
  if (!container) return;

  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: true
    });
  } catch (e) {
    return;
  }
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const geometry = new THREE.PlaneGeometry(2, 2);

  const material = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    premultipliedAlpha: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2(1, 1) },
      uSpeed: { value: 0.35 },
      uScale: { value: 4 },
      uDetail: { value: 3 },
      uGlow: { value: 1.6 },
      uCoreSize: { value: 0.1 },
      uSwirl: { value: 1 },
      uFold: { value: -0.2 },
      uBlackPoint: { value: 0.05 },
      uBrightness: { value: 1.3 },
      uColorMode: { value: 0 },
      uGrain: { value: 1 },
      uGrainIntensity: { value: 0.05 },
      uOpacity: { value: 1 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseStrength: { value: 0.3 },
      uEnableMouse: { value: true },
      uColor1: { value: hexToRgb('#5227FF') },
      uColor2: { value: hexToRgb('#FF9FFC') },
      uColor3: { value: hexToRgb('#FFFFFF') }
    }
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  function resize() {
    const w = Math.max(1, Math.floor(container.clientWidth || window.innerWidth));
    const h = Math.max(1, Math.floor(container.clientHeight || window.innerHeight));
    renderer.setSize(w, h, false);
    material.uniforms.iResolution.value.set(renderer.domElement.width, renderer.domElement.height);
  }
  resize();

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(resize);
    ro.observe(container);
  } else {
    window.addEventListener('resize', resize);
  }

  const targetMouse = new THREE.Vector2(0.5, 0.5);
  const currentMouse = new THREE.Vector2(0.5, 0.5);

  function onPointerMove(e) {
    const rect = container.getBoundingClientRect();
    targetMouse.x = (e.clientX - rect.left) / (rect.width || 1);
    targetMouse.y = 1 - (e.clientY - rect.top) / (rect.height || 1);
  }
  if (!reduced) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  const clock = new THREE.Clock();
  let raf = 0;

  function render() {
    const dt = clock.getDelta();
    material.uniforms.iTime.value = clock.elapsedTime;
    const amt = Math.min(1, dt * 3);
    currentMouse.lerp(targetMouse, amt);
    material.uniforms.uMouse.value.copy(currentMouse);
    renderer.render(scene, camera);
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (document.hidden) return;
    render();
  }

  if (reduced) {
    render();
  } else {
    raf = requestAnimationFrame(loop);
  }
})();