import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const canvas = document.querySelector("#earth-canvas");
const stage = document.querySelector(".earth-stage");
const world = document.querySelector("#world");

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const earthFragmentShader = `
  uniform sampler2D map;
  uniform vec3 sunDirection;
  uniform float nightMode;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 albedo = pow(texture2D(map, vUv).rgb, vec3(2.2));
    float sunlight = dot(normal, normalize(sunDirection));
    float day = smoothstep(-0.05, 0.1, sunlight);

    // Oceanos - cores reais da água do mar
    vec3 oceanDeep = vec3(0.0, 0.35, 0.65);
    vec3 oceanShallow = vec3(0.0, 0.6, 0.85);

    // Terras - cores reais
    vec3 landGreen = vec3(0.24, 0.52, 0.28);
    vec3 landBrown = vec3(0.55, 0.38, 0.22);
    vec3 desert = vec3(0.82, 0.72, 0.45);
    vec3 snowIce = vec3(0.88, 0.92, 0.98);

    // Usa o albedo direto como cor real (foto da NASA)
    vec3 realColor = albedo;

    // Especificular nos oceanos - brilho solar real
    float waterSpec = pow(max(dot(reflect(-normalize(sunDirection), normal), viewDirection), 0.0), 200.0) * 1.0 * day;

    // Luzes urbanas - amarelo-alaranjado real (luz de sódio)
    vec3 cityLights = vec3(1.0, 0.8, 0.4) * nightMode * (1.0 - day) * 0.07;

    vec3 nightSide = vec3(0.0, 0.0, 0.04);
    vec3 surface = mix(nightSide, realColor, day) + cityLights + vec3(1.0) * waterSpec;

    // Fresnel mais forte nas bordas - atmosfera sutil no centro
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 4.0);
    float rimLight = smoothstep(-0.05, 0.7, sunlight) * fresnel;

    // Atmosfera azul real - mais forte apenas nas bordas do globo
    vec3 atmosphereColor = vec3(0.4, 0.65, 1.0);
    vec3 atmosphere = atmosphereColor * rimLight * 0.35;

    vec3 finalColor = surface + atmosphere;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const atmosphereVertexShader = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const atmosphereFragmentShader = `
  uniform vec3 sunDirection;
  uniform float nightMode;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);

    // Fresnel mais forte - apenas das bordas do globo
    float fresnel = pow(1.0 - max(dot(viewDirection, normal), 0.0), 4.5);

    // Luz do sol - afeta a intensidade da dispersão
    float sun = smoothstep(-0.1, 0.7, dot(normal, normalize(sunDirection)));

    // Azul atmosférico real (Rayleigh scattering)
    vec3 scatterColor = vec3(0.4, 0.6, 1.0);
    vec3 color = scatterColor * (0.25 + sun * 0.35);

    // Mais forte nas bordas, mais fraco no centro
    float intensity = fresnel * mix(0.3, 0.7, nightMode);
    float alpha = intensity;

    gl_FragColor = vec4(color, alpha);
  }
`;

if (canvas && stage) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  const atmosphereRadius = 2.4;
  camera.position.set(0, 0.15, 8.9);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.055;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.zoomSpeed = 0.48;
  controls.minDistance = 3.2;
  controls.maxDistance = 12.5;
  canvas.addEventListener("wheel", (event) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    event.stopPropagation();
    const currentDistance = camera.position.distanceTo(controls.target);
    const zoomFactor = event.deltaY < 0 ? 0.9 : 1.1;
    const nextDistance = THREE.MathUtils.clamp(currentDistance * zoomFactor, controls.minDistance, controls.maxDistance);
    const direction = camera.position.clone().sub(controls.target).normalize();
    camera.position.copy(controls.target).addScaledVector(direction, nextDistance);
    controls.update();
  }, { passive: false });
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.08;
  controls.minPolarAngle = Math.PI * 0.25;
  controls.maxPolarAngle = Math.PI * 0.75;

  const globeGroup = new THREE.Group();
  const targetGlobeRotation = -0.55;
  const initialGlobe = { x: -2.4, y: -0.65, scale: 0.8, rotationY: targetGlobeRotation + 0.85 };
  globeGroup.position.set(initialGlobe.x, initialGlobe.y, 0);
  globeGroup.rotation.y = initialGlobe.rotationY;
  globeGroup.scale.setScalar(initialGlobe.scale);
  scene.add(globeGroup);

  const themeState = {
    night: true,
    earthMaterials: [],
    cloudLayers: [],
    atmosphereMaterials: [],
    fallbackMaterials: [],
  };
  const hemisphereLight = new THREE.HemisphereLight(0x9bd9ff, 0x06101e, 1.5);
  scene.add(hemisphereLight);
  const keyLight = new THREE.DirectionalLight(0xb8efff, 3.2);
  keyLight.position.set(-4, 3, 6);
  scene.add(keyLight);
  const rimLight = new THREE.PointLight(0x35d9ff, 9, 12);
  rimLight.position.set(3, -2, 3);
  scene.add(rimLight);

  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  for (let i = 0; i < 170; i += 1) {
    const radius = 4.2 + Math.random() * 2.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    starPositions.push(radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0x8deeff, size: 0.018, transparent: true, opacity: themeState.night ? 0.9 : 0.18 });
  scene.add(new THREE.Points(starGeometry, starMaterial));

  const markerGroup = new THREE.Group();
  let globeRadius = atmosphereRadius * 1.22;
  const beloHorizonte = { latitude: -19.9167, longitude: -43.9345 };
  const getBeloHorizontePosition = (radius) => latLonToPosition(beloHorizonte.latitude, beloHorizonte.longitude, radius).applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI * 0.5);
  const markerPosition = getBeloHorizontePosition(globeRadius * 0.805);
  markerGroup.position.copy(markerPosition);
  markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), markerPosition.clone().normalize());
  const markerCore = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), new THREE.MeshBasicMaterial({ color: 0x9fffff }));
  markerCore.position.z = 0.015;
  markerGroup.add(markerCore);
  const markerRing = new THREE.Mesh(new THREE.RingGeometry(0.12, 0.145, 32), new THREE.MeshBasicMaterial({ color: 0x66efff, side: THREE.DoubleSide, transparent: true, opacity: 0.9 }));
  markerRing.position.z = 0.015;
  markerGroup.add(markerRing);
  const markerHalo = new THREE.Mesh(new THREE.RingGeometry(0.22, 0.235, 32), new THREE.MeshBasicMaterial({ color: 0x42dfff, side: THREE.DoubleSide, transparent: true, opacity: 0.32 }));
  markerHalo.position.z = 0.02;
  markerGroup.add(markerHalo);
  globeGroup.add(markerGroup);
  const markerUI = document.querySelector(".earth-stage__marker");

  const gsapApi = window.gsap;
  if (gsapApi && window.ScrollTrigger) {
    gsapApi.timeline({
      scrollTrigger: {
        trigger: world,
        start: "top bottom",
        end: "top 25%",
        scrub: 1.15,
        onUpdate: (self) => { controls.autoRotate = self.progress > 0.985; },
        onLeaveBack: () => { controls.autoRotate = false; },
      },
    })
      .to(globeGroup.position, { x: 0, y: 0, ease: "power3.inOut", duration: 1 }, 0)
      .to(globeGroup.scale, { x: 1, y: 1, z: 1, ease: "power3.inOut", duration: 1 }, 0)
      .to(globeGroup.rotation, { y: targetGlobeRotation, ease: "power2.inOut", duration: 1 }, 0);
  } else {
    globeGroup.position.set(0, 0, 0);
    globeGroup.scale.setScalar(1);
    globeGroup.rotation.y = targetGlobeRotation;
    controls.autoRotate = true;
  }

  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(atmosphereRadius, 64, 64),
    new THREE.ShaderMaterial({
      uniforms: { sunDirection: { value: new THREE.Vector3(-0.55, 0.32, 0.86).normalize() }, nightMode: { value: themeState.night ? 1 : 0 } },
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      toneMapped: true,
    }),
  );
  atmosphere.renderOrder = 5;
  globeGroup.add(atmosphere);
  themeState.atmosphereMaterials.push(atmosphere.material);

  const applyGlobeTheme = (theme) => {
    const isNight = theme === "night";
    themeState.night = isNight;
    const sun = new THREE.Vector3(isNight ? -0.18 : -0.55, isNight ? 0.12 : 0.32, 0.86).normalize();
    themeState.earthMaterials.forEach((material) => {
      material.emissiveIntensity = isNight ? 2.25 : 0.03;
      material.emissive.set(isNight ? 0xffffff : 0x06101d);
      material.needsUpdate = true;
    });
    themeState.cloudLayers.forEach(({ material, baseOpacity }) => {
      material.opacity = baseOpacity * (isNight ? 0.72 : 1);
      material.emissiveIntensity = isNight ? 0.045 : 0.008;
      material.emissive.set(isNight ? 0x174d82 : 0x071018);
      material.needsUpdate = true;
    });
    themeState.atmosphereMaterials.forEach((material) => {
      material.uniforms.nightMode.value = isNight ? 1 : 0;
      material.uniforms.sunDirection.value.copy(sun);
    });
    themeState.fallbackMaterials.forEach((material) => {
      material.color.set(isNight ? 0x0b345c : 0x1c7a9d);
      material.emissive.set(isNight ? 0x020b22 : 0x073648);
      material.emissiveIntensity = isNight ? 1.15 : 0.7;
    });
    hemisphereLight.color.set(isNight ? 0x31598d : 0xbfd7ff);
    hemisphereLight.groundColor.set(isNight ? 0x020611 : 0x24365d);
    hemisphereLight.intensity = isNight ? 0.5 : 1.65;
    keyLight.position.copy(sun).multiplyScalar(8);
    keyLight.intensity = isNight ? 1.15 : 4.15;
    keyLight.color.set(isNight ? 0x3c6fb5 : 0xfff1d0);
    rimLight.intensity = isNight ? 10 : 5.5;
    rimLight.color.set(isNight ? 0x2c7dff : 0x9bb1ff);
    starMaterial.opacity = isNight ? 0.9 : 0.18;
  };
  applyGlobeTheme("night");

  const loader = new GLTFLoader();
  const earthModelUrl = new URL("./assets/earth.glb", import.meta.url).href;
  loader.load(earthModelUrl, (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = globeRadius * 2 / Math.max(size.x, size.y, size.z);
    model.scale.setScalar(scale);
    model.position.copy(center.multiplyScalar(-scale));
    globeRadius = Math.max(size.x, size.y, size.z) * scale * 0.5;
    const markerSurfacePosition = getBeloHorizontePosition(globeRadius * 0.805);
    markerGroup.position.copy(markerSurfacePosition);
    markerGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), markerSurfacePosition.clone().normalize());
    atmosphere.scale.setScalar(1);
    model.traverse((child) => {
      if (!child.isMesh) return;
      child.castShadow = false;
      child.receiveShadow = false;
      const isCloud = /cloud/i.test(child.name);
      const sourceMaterials = Array.isArray(child.material) ? child.material : [child.material];
      const materials = sourceMaterials.map((sourceMaterial) => {
        const material = sourceMaterial.clone();
        const cloudLayer = isCloud || /cloud/i.test(sourceMaterial.name || "");
        material.name = `${sourceMaterial.name || "Earth material"} / ${cloudLayer ? "cloud layer" : "surface"}`;
        material.metalness = 0;
        material.roughness = cloudLayer ? 0.9 : Math.max(0.5, material.roughness ?? 0.7);
        material.envMapIntensity = cloudLayer ? 0.05 : 0.3;
        if (material.map) {
          material.map.colorSpace = THREE.SRGBColorSpace;
          material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
        if (material.emissiveMap) {
          material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          material.emissiveMap.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
        if (material.normalMap) material.normalScale.set(0.7, 0.7);
        material.transparent = cloudLayer || material.transparent;
        material.depthWrite = !cloudLayer;
        material.opacity = cloudLayer ? 0.685 : 1;
        material.emissive.set(cloudLayer ? 0x071018 : 0x02070d);
        material.emissiveIntensity = cloudLayer ? 0.008 : 0.012;
        if (cloudLayer) {
          material.alphaTest = 0.02;
          themeState.cloudLayers.push({ material, baseOpacity: material.opacity });
        } else {
          themeState.earthMaterials.push(material);
        }
        return material;
      });
      child.material = Array.isArray(child.material) ? materials : materials[0];
      if (isCloud) {
        child.scale.setScalar(1.0025);
        child.renderOrder = 2;
      }
    });
    globeGroup.add(model);
    applyGlobeTheme("night");
  }, undefined, (error) => {
    console.error("Não foi possível carregar o modelo da Terra:", earthModelUrl, error);
    addFallbackEarth(globeGroup, themeState);
  });

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    const width = Math.max(1, bounds.width);
    const height = Math.max(1, bounds.height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(stage);
  resize();

  let visible = true;
  const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
  visibilityObserver.observe(world);

  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    if (document.hidden || !visible || reduced) return;
    const elapsed = clock.getElapsedTime();
    markerRing.scale.setScalar(1 + Math.sin(elapsed * 3.2) * 0.13);
    markerHalo.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.2);
    updateMarkerUI();
    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  function updateMarkerUI() {
    if (!markerUI) return;
    const bounds = stage.getBoundingClientRect();
    const canvasBounds = canvas.getBoundingClientRect();
    const markerWorld = markerCore.getWorldPosition(new THREE.Vector3());
    const projected = markerWorld.clone().project(camera);
    const x = canvasBounds.left - bounds.left + (projected.x * 0.5 + 0.5) * canvasBounds.width;
    const y = canvasBounds.top - bounds.top + (-projected.y * 0.5 + 0.5) * canvasBounds.height;
    markerUI.style.left = `${x}px`;
    markerUI.style.top = `${y}px`;
    markerUI.classList.remove("is-hidden");
  }
}

function latLonToPosition(latitude, longitude, radius) {
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 180) * (Math.PI / 180);
  return new THREE.Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}

function addFallbackEarth(targetGroup, themeState) {
  const globe = new THREE.Mesh(new THREE.SphereGeometry(2.34, 48, 48), new THREE.MeshPhongMaterial({ color: 0x1c7a9d, emissive: 0x073648, emissiveIntensity: 0.7, shininess: 80, transparent: true, opacity: 0.95 }));
  targetGroup.add(globe);
  themeState?.fallbackMaterials.push(globe.material);
  const wire = new THREE.Mesh(new THREE.SphereGeometry(2.37, 24, 16), new THREE.MeshBasicMaterial({ color: 0x65e8f6, wireframe: true, transparent: true, opacity: 0.13 }));
  targetGroup.add(wire);
}
