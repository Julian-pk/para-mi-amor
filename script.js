/**
 * ==============================================================================
 * UNIVERSO DE RECUERDOS - EXPERIENCIA INTERACTIVA 3D
 * Three.js, OrbitControls, GSAP & Canvas-Confetti
 * ==============================================================================
 */

// ============================================================================
// 1. ESTRUCTURA DE DATOS: RECUERDOS & ESTRELLA PRINCIPAL
// ============================================================================

/**
 * Arreglo de Recuerdos para las Estrellas Secundarias
 * (Edita aquí fácilmente los títulos, fechas y mensajes románticos)
 */
const recuerdos = [
  {
    id: 1,
    foto: "assets/comien.jpg",
    fallbackFoto: "assets/comien.jpeg",
    titulo: "El Comienzo de Nuestra Magia",
    tag: "Donde Todo Empezó 💘✨",
    mensaje: "Recuerdo con perfecta claridad el día en que nuestras miradas se cruzaron por primera vez. En ese instante supe que el destino me estaba regalando a la persona más especial del universo, eran miradas que se sentian tan hermosas y solo verte me deba pena. Gracias por comenzar esta historia conmigo.",
    pos: [22, 12, -10]
  },
  {
    id: 2,
    foto: "assets/risa.jpg",
    fallbackFoto: "assets/risa.jpeg",
    titulo: "Nuestras Risas Inolvidables",
    tag: "Alegría Compartida 🌸💘",
    mensaje: "Tu risa tiene ese poder único de iluminar hasta el día más nublado. amo cada locura que hemos hecho. Cada momento riendo juntos, cada chiste tonto y cada mirada complice son tesoros que guardo en lo mas profundo de mi corazan.",
    pos: [-20, 16, 14]
  },
  {
    id: 3,
    foto: "assets/aventura.jpg",
    fallbackFoto: "assets/aventura.jpeg",
    titulo: "Aquella salida tan hermosa e inolvidable",
    tag: "Aventuras de la Mano 🗺️",
    mensaje: "Fue muy hermoso esa salida la llevo en mi corazon por simpre. No importa el destino, mi lugar favorito siempre sera andat a tu lado agarrados de la mano.",
    pos: [28, -10, 16]
  },
  {
    id: 4,
    foto: "assets/foto3.jpg",
    fallbackFoto: "assets/foto3.jpg.jpeg",
    titulo: "La Paz en Tus Abrazos",
    tag: "Mi Refugio Seguro 🕊️",
    mensaje: "Cuando el mundo en mi contra mi refugio son tus brazos, me siento seguro y en paz, un abrazo tuyo me devuelve la calma en un segundo. Eres mi hogar, mi refugio y el lugar donde mi alma siempre quiere descansar.",
    pos: [-26, -15, -12]
  },
  {
    id: 5,
    foto: "assets/foto6.jpg",
    fallbackFoto: "assets/foto6.jpg.jpeg",
    titulo: "Nuestros hermosos momentos donde me siento yo mismo",
    tag: "Locos enamorados",
    mensaje: "Una noche/tarde. Donde al recordar esos momentos me doy cuenta de lo hermoso que es nuestra relacion, gracias por hacer mis momenos mas felices.",
    pos: [12, 24, 20]
  },
  {
    id: 6,
    foto: "assets/foto4.jpg",
    fallbackFoto: "assets/foto4.jpg.jpeg",
    titulo: "Tu sonrisa, mi Inspiración",
    tag: "Luz de mis ojos 💘💫",
    mensaje: "Tienes la sonrisa mas hermosa que existe y cuando te veo digo woww AMO A MI NOVIA. Verte sonreir me llena de energia, me hace soñar en grande y en un futuro y me recuerda la suerte tan infinita que tengo de tenerte en mi vida.",
    pos: [-14, 22, -22]
  },
  {
    id: 7,
    foto: "assets/tor1.jpg",
    fallbackFoto: "assets/tor1.jpeg",
    titulo: "Juntos contra cualquier tormenta",
    tag: "Equipo Inquebrantable. Equipo snoopyyyy 🛡️💘💘💘💘",
    mensaje: "No hay obstaculo que parezca grande cuando estamos juntos. Gracias por tu apoyo incondicional, por creer en mi y por ser la mejor compañera de vida que alguien podria desear, quiero que seas mi fifi y yo tu valiente snoopy y luchar contra el Baron Rojo y ser falices para siempre 💘💘💘💘.",
    pos: [26, -18, -18]
  },
  {
    id: 8,
    foto: "assets/foto7.jpg",
    fallbackFoto: "assets/foto7.jpg.jpeg",
    titulo: "Nuestras miradas secretas",
    tag: "Conexión de Almas 💘💘💘💘",
    mensaje: "Ese instante en el que no necesitamos palabras para saber exactamente que piensa el otro. Nuestra conexion es magica, sincera y mas profunda de lo que jamas pude imaginar.",
    pos: [-28, 8, 25]
  },
  {
    id: 9,
    foto: "assets/camino.jpg",
    fallbackFoto: "assets/camino.jpeg",
    titulo: "Soñando con el futuro",
    tag: "Mil Caminos por Recorrer 🚀",
    mensaje: "Cuando pienso en los años que vienen, en mis metas y en mis sueños, en todos ellos estas tu. Quiero seguir construyendo recuerdos, cumpliendo metas y celebrando la vida a tu lado.",
    pos: [6, -26, 14]
  },
  {
    id: 10,
    foto: "assets/por.jpg",
    fallbackFoto: "assets/por.jpeg",
    titulo: "Un Amor Eterno",
    tag: "Por Siempre y Para Siempre ♾️",
    mensaje: "Gracias por ser exactamente quien eres: dulce, valiente, inteligente y maravillosa. Te amo con cada latido de mi corazón y te elegiría una y mil veces en esta y en todas las vidas.",
    pos: [-10, -22, -24]
  }
];

/**
 * Estrella Principal Central (Foto 11 - Carta de Cumpleaños)
 */
const estrellaPrincipalData = {
  id: "central",
  foto: "assets/foto11.jpg",
  fallbackFoto: "assets/foto11.jpg.jpeg",
  titulo: "✨ Estrella de Mi Vida ✨",
  tag: "Carta de Feliz Cumpleaños 🎂",
  pos: [0, 0, 0]
};

// ============================================================================
// 2. VARIABLES DE ESTADO Y THREE.JS
// ============================================================================

let scene, camera, renderer, controls;
let starObjects = []; // Contiene todos los meshes interactivos
let centralStarMesh, centralStarHalo, centralStarRings = [];
let constellationLines;
let backgroundStarsParticleSystem;
let stardustParticles;
let shootingStars = [];

// Estado de interacción y cámara
let defaultCameraPos = new THREE.Vector3(0, 16, 68);
let defaultCameraTarget = new THREE.Vector3(0, 0, 0);
let isCameraFocused = false;
let focusedStarObject = null;
let currentMemoryIndex = 0;

// Raycasting y Control Táctil
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredStar = null;
let pointerDownPos = { x: 0, y: 0, time: 0 };
const TAP_THRESHOLD_PX = 10;
const TAP_TIME_LIMIT_MS = 450;

// Registro de recuerdos descubiertos
const discoveredSet = new Set();
const totalStarsCount = recuerdos.length + 1; // 10 recuerdos + 1 estrella central

// Audio Web API para campana mágica sutil
let audioCtx = null;

// ============================================================================
// 3. INICIALIZACIÓN PRINCIPAL (DOM READY)
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
  initDOMListeners();
  initThreeScene();
  createConstellationUniverse();
  renderDrawerItems();
  updateDiscoveredCounter();
  animate();
});

// ============================================================================
// 4. CONFIGURACIÓN DEL ENTORNO THREE.JS
// ============================================================================

function initThreeScene() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('webgl-canvas');

  // 1. Escena
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060713, 0.0035);

  // 2. Cámara
  const isMobile = window.innerWidth < 768;
  const initialFov = isMobile ? 68 : 55;
  camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.1, 1500);
  
  // Posición inicial de bienvenida
  camera.position.set(0, 20, isMobile ? 80 : 68);
  defaultCameraPos.copy(camera.position);

  // 3. Renderizador WebGL
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  // 4. OrbitControls con soporte fluido de gestos táctiles
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = isMobile ? 0.75 : 0.6;
  controls.zoomSpeed = 0.8;
  controls.panSpeed = 0.6;
  controls.minDistance = 14;
  controls.maxDistance = 130;
  controls.target.copy(defaultCameraTarget);

  // Gestos táctiles: 1 dedo rotar, 2 dedos pellizco para zoom
  controls.touches = {
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN
  };

  // 5. Luces Ambientales y Puntuales
  const ambientLight = new THREE.AmbientLight(0xfff3d6, 0.6);
  scene.add(ambientLight);

  const centralLight = new THREE.PointLight(0xffdf80, 2.5, 90, 1.2);
  centralLight.position.set(0, 0, 0);
  scene.add(centralLight);

  const softBlueLight = new THREE.DirectionalLight(0x738aff, 0.4);
  softBlueLight.position.set(50, 40, 50);
  scene.add(softBlueLight);

  const softPinkLight = new THREE.DirectionalLight(0xff758f, 0.35);
  softPinkLight.position.set(-50, -40, -50);
  scene.add(softPinkLight);

  // 6. Listeners de Ventana y Puntero
  window.addEventListener('resize', onWindowResize, false);
  canvas.addEventListener('pointerdown', onPointerDown, false);
  canvas.addEventListener('pointermove', onPointerMove, false);
  canvas.addEventListener('pointerup', onPointerUp, false);
}

// ============================================================================
// 5. GENERACIÓN DEL UNIVERSO Y CONSTELACIÓN 3D
// ============================================================================

function createConstellationUniverse() {
  createBackgroundStarfield();
  createStardustClouds();
  createCentralSpecialStar();
  createMemoryStars();
  createConstellationLines();
}

/**
 * Genera textura de halo brillante con Canvas 2D en memoria (Cero dependencias)
 */
function createGlowTexture(colorInner = '#ffffff', colorOuter = '#ffd166', size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  grad.addColorStop(0, colorInner);
  grad.addColorStop(0.18, colorOuter);
  grad.addColorStop(0.45, 'rgba(255, 209, 102, 0.35)');
  grad.addColorStop(0.7, 'rgba(255, 117, 143, 0.1)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

/**
 * 1. Campo de estrellas lejanas titilantes
 */
function createBackgroundStarfield() {
  const starCount = 3200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  const colorPalette = [
    new THREE.Color(0xffffff),
    new THREE.Color(0xffe599),
    new THREE.Color(0xffd166),
    new THREE.Color(0xffb3c1),
    new THREE.Color(0xb3c5ff)
  ];

  for (let i = 0; i < starCount; i++) {
    // Distribución esférica en el espacio profundo
    const radius = 220 + Math.random() * 450;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;

    sizes[i] = 1.0 + Math.random() * 2.2;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const glowTex = createGlowTexture('#ffffff', '#ffe599', 64);
  const material = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    map: glowTex,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  backgroundStarsParticleSystem = new THREE.Points(geometry, material);
  scene.add(backgroundStarsParticleSystem);
}

/**
 * 2. Polvo estelar romántico flotante
 */
function createStardustClouds() {
  const count = 220;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 110;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 110;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const dustTex = createGlowTexture('#ffd166', '#ff758f', 64);
  const material = new THREE.PointsMaterial({
    size: 2.8,
    map: dustTex,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  stardustParticles = new THREE.Points(geometry, material);
  scene.add(stardustParticles);
}

/**
 * 3. Estrella Central Especial (FOTO 11 - CARTA DE CUMPLEAÑOS)
 */
function createCentralSpecialStar() {
  const starGroup = new THREE.Group();
  starGroup.position.set(0, 0, 0);

  // Núcleo brillante facetado de cristal dorado
  const coreGeo = new THREE.IcosahedronGeometry(2.5, 3);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xfff0aa,
    emissive: 0xffb703,
    emissiveIntensity: 1.2,
    roughness: 0.15,
    metalness: 0.8
  });
  centralStarMesh = new THREE.Mesh(coreGeo, coreMat);
  starGroup.add(centralStarMesh);

  // Halo resplandeciente exterior (Sprite)
  const haloTex = createGlowTexture('#ffffff', '#ffb703', 256);
  const haloMat = new THREE.SpriteMaterial({
    map: haloTex,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  centralStarHalo = new THREE.Sprite(haloMat);
  centralStarHalo.scale.set(16, 16, 1);
  starGroup.add(centralStarHalo);

  // Anillos Cósmicos Giratorios de Luz (tipo giróscopo celestial)
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0xffd166,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.08, 16, 100), ringMat1);
  ring1.rotation.x = Math.PI / 3;
  starGroup.add(ring1);
  centralStarRings.push(ring1);

  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xff758f,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.06, 16, 100), ringMat2);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.z = Math.PI / 6;
  starGroup.add(ring2);
  centralStarRings.push(ring2);

  // Asignar datos interactivos al mesh del núcleo
  centralStarMesh.userData = {
    isStar: true,
    isCentral: true,
    data: estrellaPrincipalData,
    parentGroup: starGroup,
    baseScale: 1.0,
    hoverScale: 1.35
  };

  starObjects.push(centralStarMesh);
  scene.add(starGroup);
}

/**
 * 4. Estrellas de Recuerdos Secundarias (10 estrellas)
 */
function createMemoryStars() {
  const glowTex = createGlowTexture('#ffffff', '#ffd166', 128);

  recuerdos.forEach((recuerdo, index) => {
    const starGroup = new THREE.Group();
    starGroup.position.set(recuerdo.pos[0], recuerdo.pos[1], recuerdo.pos[2]);

    // Núcleo estelar
    const coreGeo = new THREE.SphereGeometry(1.25, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffeb99,
      emissive: 0xf4a261,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.6
    });
    const starMesh = new THREE.Mesh(coreGeo, coreMat);
    starGroup.add(starMesh);

    // Halo suave
    const spriteMat = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(7.5, 7.5, 1);
    starGroup.add(sprite);

    // Mini anillo orbital sutil
    const miniRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.04, 12, 60),
      new THREE.MeshBasicMaterial({
        color: 0xffd166,
        transparent: true,
        opacity: 0.35
      })
    );
    miniRing.rotation.x = Math.random() * Math.PI;
    miniRing.rotation.y = Math.random() * Math.PI;
    starGroup.add(miniRing);

    // Metadatos interactivos
    starMesh.userData = {
      isStar: true,
      isCentral: false,
      data: recuerdo,
      index: index,
      parentGroup: starGroup,
      miniRing: miniRing,
      baseScale: 1.0,
      hoverScale: 1.35,
      floatSpeed: 0.8 + Math.random() * 0.6,
      floatOffset: Math.random() * Math.PI * 2
    };

    starObjects.push(starMesh);
    scene.add(starGroup);
  });
}

/**
 * 5. Líneas de Constelación conectando las estrellas
 */
function createConstellationLines() {
  const linePoints = [];

  // Conectar cada estrella con la central o formando la constelación
  recuerdos.forEach((rec, idx) => {
    // Línea hacia el centro con peso sutil
    linePoints.push(new THREE.Vector3(0, 0, 0));
    linePoints.push(new THREE.Vector3(rec.pos[0], rec.pos[1], rec.pos[2]));

    // Conectar en cadena con la estrella siguiente
    const nextRec = recuerdos[(idx + 1) % recuerdos.length];
    linePoints.push(new THREE.Vector3(rec.pos[0], rec.pos[1], rec.pos[2]));
    linePoints.push(new THREE.Vector3(nextRec.pos[0], nextRec.pos[1], nextRec.pos[2]));
  });

  const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffd166,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
  });

  constellationLines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(constellationLines);
}

// ============================================================================
// 6. GESTIÓN DE INTERACCIÓN, RAYCASTING Y EVENTOS TÁCTILES
// ============================================================================

function onPointerDown(e) {
  pointerDownPos.x = e.clientX;
  pointerDownPos.y = e.clientY;
  pointerDownPos.time = performance.now();
}

function onPointerMove(e) {
  // En dispositivos móviles evitamos hover costoso
  if (e.pointerType === 'touch') return;

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(starObjects);

  const tooltip = document.getElementById('star-tooltip');
  const tooltipText = document.getElementById('tooltip-text');

  if (intersects.length > 0) {
    const star = intersects[0].object;
    document.body.style.cursor = 'pointer';

    if (hoveredStar !== star) {
      if (hoveredStar) resetStarHover(hoveredStar);
      hoveredStar = star;
      highlightStarHover(star);
    }

    // Actualizar tooltip flotante
    const starData = star.userData.data;
    tooltipText.textContent = starData.titulo;
    tooltip.style.left = `${e.clientX}px`;
    tooltip.style.top = `${e.clientY - 20}px`;
    tooltip.classList.add('visible');
  } else {
    document.body.style.cursor = 'default';
    if (hoveredStar) {
      resetStarHover(hoveredStar);
      hoveredStar = null;
    }
    tooltip.classList.remove('visible');
  }
}

function onPointerUp(e) {
  const dx = e.clientX - pointerDownPos.x;
  const dy = e.clientY - pointerDownPos.y;
  const dist = Math.hypot(dx, dy);
  const timeElapsed = performance.now() - pointerDownPos.time;

  // Si fue un desplazamiento para rotar la cámara, ignorar el clic
  if (dist > TAP_THRESHOLD_PX || timeElapsed > TAP_TIME_LIMIT_MS) {
    return;
  }

  // Fue un toque limpio o clic preciso: calcular raycasting
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(starObjects);

  if (intersects.length > 0) {
    const selectedStar = intersects[0].object;
    playMagicalChime();
    selectStar(selectedStar);
  }
}

function highlightStarHover(star) {
  gsap.to(star.scale, {
    x: star.userData.hoverScale,
    y: star.userData.hoverScale,
    z: star.userData.hoverScale,
    duration: 0.35,
    ease: "power2.out"
  });
  if (star.material && star.material.emissiveIntensity) {
    gsap.to(star.material, { emissiveIntensity: 1.8, duration: 0.3 });
  }
}

function resetStarHover(star) {
  gsap.to(star.scale, {
    x: star.userData.baseScale,
    y: star.userData.baseScale,
    z: star.userData.baseScale,
    duration: 0.35,
    ease: "power2.out"
  });
  if (star.material && star.material.emissiveIntensity) {
    gsap.to(star.material, {
      emissiveIntensity: star.userData.isCentral ? 1.2 : 0.85,
      duration: 0.3
    });
  }
}

// ============================================================================
// 7. TRANSICIÓN SUAVE DE CÁMARA (GSAP) & APERTURA DE MODALES
// ============================================================================

/**
 * Enfoca la cámara en la estrella seleccionada y abre el modal correspondiente
 */
function selectStar(starMesh) {
  const isCentral = starMesh.userData.isCentral;
  const starData = starMesh.userData.data;
  const starWorldPos = new THREE.Vector3();
  starMesh.getWorldPosition(starWorldPos);

  isCameraFocused = true;
  focusedStarObject = starMesh;

  // Registrar como descubierta
  discoveredSet.add(starData.id);
  updateDiscoveredCounter();

  // Calcular la posición deseada de la cámara frente a la estrella
  const offsetDistance = isCentral ? 18 : 14;
  const direction = camera.position.clone().sub(starWorldPos).normalize();
  
  // Evitar vectores cero o raros
  if (direction.lengthSq() < 0.001) direction.set(0, 0.4, 1).normalize();

  const targetCameraPos = starWorldPos.clone().add(direction.multiplyScalar(offsetDistance));

  // Animación fluida con GSAP
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);

  gsap.to(camera.position, {
    x: targetCameraPos.x,
    y: targetCameraPos.y,
    z: targetCameraPos.z,
    duration: 1.4,
    ease: "power2.inOut",
    onUpdate: () => controls.update()
  });

  gsap.to(controls.target, {
    x: starWorldPos.x,
    y: starWorldPos.y,
    z: starWorldPos.z,
    duration: 1.4,
    ease: "power2.inOut",
    onComplete: () => {
      if (isCentral) {
        openBirthdayModal();
      } else {
        currentMemoryIndex = starMesh.userData.index;
        openMemoryModal(starData);
      }
    }
  });

  // Pulso de brillo en la estrella al seleccionarla
  if (starMesh.material && starMesh.material.emissiveIntensity) {
    gsap.to(starMesh.material, {
      emissiveIntensity: 2.2,
      duration: 0.6,
      yoyo: true,
      repeat: 1
    });
  }
}

/**
 * Restablece la vista general del universo
 */
function resetCameraView() {
  closeAllModals();

  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);

  gsap.to(camera.position, {
    x: defaultCameraPos.x,
    y: defaultCameraPos.y,
    z: defaultCameraPos.z,
    duration: 1.4,
    ease: "power2.inOut",
    onUpdate: () => controls.update()
  });

  gsap.to(controls.target, {
    x: defaultCameraTarget.x,
    y: defaultCameraTarget.y,
    z: defaultCameraTarget.z,
    duration: 1.4,
    ease: "power2.inOut",
    onComplete: () => {
      isCameraFocused = false;
      focusedStarObject = null;
    }
  });
}

// ============================================================================
// 8. MODAL DE RECUERDO ESTÁNDAR (GLASSMORPHISM)
// ============================================================================

function setSafeImageSrc(element, primarySrc, fallbackSrc) {
  if (!element) return;
  element.onerror = () => {
    if (fallbackSrc && element.src !== fallbackSrc) {
      element.src = fallbackSrc;
    }
  };
  element.src = primarySrc;
}

function openMemoryModal(data) {
  const modal = document.getElementById('memory-modal');
  const tag = document.getElementById('modal-tag');
  const title = document.getElementById('modal-title');
  const text = document.getElementById('modal-text');
  const img = document.getElementById('modal-img');
  const imgBlur = document.getElementById('modal-img-blur');

  tag.textContent = `💫 Recuerdo #${data.id} · ${data.tag}`;
  title.textContent = data.titulo;
  text.textContent = data.mensaje;

  // Carga con fallback automático tanto para imagen principal como fondo difuminado
  setSafeImageSrc(img, data.foto, data.fallbackFoto);
  setSafeImageSrc(imgBlur, data.foto, data.fallbackFoto);

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

function navigateMemory(delta) {
  currentMemoryIndex = (currentMemoryIndex + delta + recuerdos.length) % recuerdos.length;
  const nextRecuerdo = recuerdos[currentMemoryIndex];
  
  // Buscar el mesh correspondiente
  const targetMesh = starObjects.find(
    s => s.userData.isStar && !s.userData.isCentral && s.userData.index === currentMemoryIndex
  );

  if (targetMesh) {
    selectStar(targetMesh);
  }
}

// ============================================================================
// 9. MODAL ESPECIAL: ESTRELLA PRINCIPAL & CARTA DE CUMPLEAÑOS (FOTO 11)
// ============================================================================

function openBirthdayModal() {
  const modal = document.getElementById('birthday-modal');
  const img = document.getElementById('birthday-img');
  const imgBlur = document.getElementById('birthday-img-blur');

  setSafeImageSrc(img, estrellaPrincipalData.foto, estrellaPrincipalData.fallbackFoto);
  setSafeImageSrc(imgBlur, estrellaPrincipalData.foto, estrellaPrincipalData.fallbackFoto);

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');

  // Lanzar explosión mágica de confeti de celebración
  triggerGrandConfetti();
}

/**
 * Efecto de fuegos artificiales y confeti dorado/rosado usando canvas-confetti
 */
function triggerGrandConfetti() {
  if (typeof confetti !== 'function') return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#ffd166', '#ff758f', '#fff2b2', '#ff8fab', '#ffffff']
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Ráfagas secuenciales elegantes
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 1.1 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });

  // Cañón lateral adicional
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#ffd166', '#ff758f']
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#ffd166', '#ff758f']
    });
  }, 400);
}

function closeAllModals() {
  const memoryModal = document.getElementById('memory-modal');
  const birthdayModal = document.getElementById('birthday-modal');

  memoryModal.classList.remove('active');
  memoryModal.setAttribute('aria-hidden', 'true');

  birthdayModal.classList.remove('active');
  birthdayModal.setAttribute('aria-hidden', 'true');
}

// ============================================================================
// 10. GAVETA DE RECUERDOS (DRAWER LATERAL)
// ============================================================================

function renderDrawerItems() {
  const container = document.getElementById('drawer-items-list');
  container.innerHTML = '';

  // 1. Estrella Principal primero en la lista
  const specialItem = document.createElement('div');
  specialItem.className = 'drawer-item special-item';
  specialItem.innerHTML = `
    <img class="drawer-item-thumb" src="${estrellaPrincipalData.foto}" alt="Estrella Principal" onerror="this.src='${estrellaPrincipalData.fallbackFoto}'">
    <div class="drawer-item-info">
      <span class="drawer-item-title">✨ Carta de Cumpleaños</span>
      <span class="drawer-item-tag">Estrella Central 👑</span>
    </div>
  `;
  specialItem.addEventListener('click', () => {
    closeDrawer();
    selectStar(centralStarMesh);
  });
  container.appendChild(specialItem);

  // 2. Recuerdos regulares
  recuerdos.forEach((rec, idx) => {
    const item = document.createElement('div');
    item.className = 'drawer-item';
    item.innerHTML = `
      <img class="drawer-item-thumb" src="${rec.foto}" alt="${rec.titulo}" onerror="this.src='${rec.fallbackFoto}'">
      <div class="drawer-item-info">
        <span class="drawer-item-title">#${rec.id} ${rec.titulo}</span>
        <span class="drawer-item-tag">${rec.tag}</span>
      </div>
    `;
    item.addEventListener('click', () => {
      closeDrawer();
      const target = starObjects.find(
        s => s.userData.isStar && !s.userData.isCentral && s.userData.index === idx
      );
      if (target) selectStar(target);
    });
    container.appendChild(item);
  });
}

function toggleDrawer() {
  const drawer = document.getElementById('drawer-memory-list');
  drawer.classList.toggle('active');
}

function closeDrawer() {
  const drawer = document.getElementById('drawer-memory-list');
  drawer.classList.remove('active');
}

// ============================================================================
// 11. SISTEMA DE AUDIO & CAMPANA MÁGICA
// ============================================================================

function initAudioSystem() {
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('btn-music-toggle');

  // Fade-in de volumen suave
  audio.volume = 0;
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicBtn.classList.remove('muted');
      musicBtn.classList.add('playing');
      
      let vol = 0;
      const fadeInterval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.75) {
          audio.volume = 0.75;
          clearInterval(fadeInterval);
        } else {
          audio.volume = vol;
        }
      }, 100);
    }).catch(err => {
      console.warn("Reproducción automática no permitida aún por navegador:", err);
      musicBtn.classList.remove('playing');
      musicBtn.classList.add('muted');
    });
  }
}

function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const musicBtn = document.getElementById('btn-music-toggle');

  if (audio.paused) {
    audio.play();
    musicBtn.classList.remove('muted');
    musicBtn.classList.add('playing');
  } else {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('muted');
  }
}

/**
 * Sonido sutil y mágico generado con Web Audio API (Cero archivos externos)
 */
function playMagicalChime() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Tonos armónicos brillantes
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const randomNote = notes[Math.floor(Math.random() * notes.length)];

    osc.type = 'sine';
    osc.frequency.setValueAtTime(randomNote, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(randomNote * 1.5, audioCtx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.55);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {
    // Si no está soportado, se ignora silenciosamente
  }
}

// ============================================================================
// 12. LISTENERS DEL DOM & CONTROLES
// ============================================================================

function initDOMListeners() {
  // 1. Botón de Bienvenida ("Haz clic para encender las estrellas ✨")
  const btnEnter = document.getElementById('btn-enter');
  const welcomeScreen = document.getElementById('welcome-screen');

  btnEnter.addEventListener('click', () => {
    initAudioSystem();

    // Desvanecer pantalla de bienvenida
    welcomeScreen.classList.add('hidden');

    // Animación de entrada inicial de la cámara hacia la constelación
    gsap.from(camera.position, {
      z: 110,
      y: 35,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => controls.update()
    });
  });

  // 2. Botón de Música en el HUD
  document.getElementById('btn-music-toggle').addEventListener('click', toggleMusic);

  // 3. Botón de Reset de Cámara (Vista General)
  document.getElementById('btn-reset-cam').addEventListener('click', resetCameraView);

  // 4. Drawer de Recuerdos
  document.getElementById('btn-memory-list').addEventListener('click', toggleDrawer);
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);

  // 5. Cierres de Modales
  document.getElementById('modal-close').addEventListener('click', resetCameraView);
  document.getElementById('modal-btn-back').addEventListener('click', resetCameraView);
  document.getElementById('birthday-close').addEventListener('click', resetCameraView);
  document.getElementById('btn-birthday-back').addEventListener('click', resetCameraView);

  // Navegación en modal
  document.getElementById('modal-btn-prev').addEventListener('click', () => navigateMemory(-1));
  document.getElementById('modal-btn-next').addEventListener('click', () => navigateMemory(1));

  // Botones de Confeti en carta de cumpleaños (desktop y móvil)
  const confettiAction = () => {
    playMagicalChime();
    triggerGrandConfetti();
  };
  const btnConfetti = document.getElementById('btn-confetti');
  if (btnConfetti) btnConfetti.addEventListener('click', confettiAction);

  const btnConfettiMobile = document.getElementById('btn-confetti-mobile');
  if (btnConfettiMobile) btnConfettiMobile.addEventListener('click', confettiAction);

  // Cerrar modales con clic fuera de la tarjeta
  const memoryModal = document.getElementById('memory-modal');
  memoryModal.addEventListener('click', (e) => {
    if (e.target === memoryModal) resetCameraView();
  });

  const birthdayModal = document.getElementById('birthday-modal');
  birthdayModal.addEventListener('click', (e) => {
    if (e.target === birthdayModal) resetCameraView();
  });

  // Cerrar con tecla Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      resetCameraView();
      closeDrawer();
    }
  });
}

function updateDiscoveredCounter() {
  const counterText = document.getElementById('discovered-text');
  if (counterText) {
    counterText.textContent = `${discoveredSet.size} de ${totalStarsCount}`;
  }
}

function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

// ============================================================================
// 13. LOOP DE ANIMACIÓN Y RENDERIZADO
// ============================================================================

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  // 1. Actualizar OrbitControls si no hay tween activo de cámara
  controls.update();

  // 2. Rotación sutil del universo de fondo
  if (backgroundStarsParticleSystem) {
    backgroundStarsParticleSystem.rotation.y = elapsedTime * 0.012;
  }
  if (stardustParticles) {
    stardustParticles.rotation.y = -elapsedTime * 0.02;
    stardustParticles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;
  }

  // 3. Animación de la Estrella Central Especial
  if (centralStarMesh) {
    centralStarMesh.rotation.y = elapsedTime * 0.4;
    centralStarMesh.rotation.x = elapsedTime * 0.2;

    // Efecto de latido / respiración de luz
    const breath = 1.0 + Math.sin(elapsedTime * 2.2) * 0.08;
    centralStarMesh.scale.set(breath, breath, breath);

    if (centralStarHalo) {
      const haloScale = 16 + Math.sin(elapsedTime * 2.5) * 2.5;
      centralStarHalo.scale.set(haloScale, haloScale, 1);
    }

    // Rotación de los anillos cósmicos
    if (centralStarRings.length >= 2) {
      centralStarRings[0].rotation.z = elapsedTime * 0.6;
      centralStarRings[1].rotation.x = -elapsedTime * 0.45;
    }
  }

  // 4. Movimiento de flotación de las estrellas secundarias
  starObjects.forEach((star) => {
    if (star.userData.isStar && !star.userData.isCentral) {
      const u = star.userData;
      const group = u.parentGroup;
      if (group) {
        // Flotación armónica en Y
        const floatY = Math.sin(elapsedTime * u.floatSpeed + u.floatOffset) * 0.8;
        group.position.y = u.data.pos[1] + floatY;
      }
      if (u.miniRing) {
        u.miniRing.rotation.z += 0.015;
      }
    }
  });

  // 5. Pulsación en las líneas de la constelación
  if (constellationLines) {
    constellationLines.material.opacity = 0.18 + Math.sin(elapsedTime * 1.8) * 0.08;
  }

  // Renderizar escena
  renderer.render(scene, camera);
}
