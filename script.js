// Effet de lueur du curseur
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.getElementById('cursor-glow');
  
  document.addEventListener('mousemove', function(e) {
    // Centre le cercle sur la souris
    cursor.style.left = (e.clientX - 450) + 'px';
    cursor.style.top = (e.clientY - 450) + 'px';
  });
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hideAllStars() {
  for (let i = 1; i <= 10; i++) {
    document.getElementById(`star${i}`).style.display = "none";
  }
}

function getTwoDifferentRandomStars() {
  const a = Math.floor(Math.random() * 10) + 1;
  let b;
  do {
    b = Math.floor(Math.random() * 10) + 1;
  } while (b === a);
  return [a, b];
}

async function actionRandom() {
  const [starA, starB] = getTwoDifferentRandomStars();

  document.getElementById(`star${starA}`).style.display = "block";
  await sleep(2200);

  hideAllStars();
  document.getElementById(`star${starA}`).style.display = "block"; // facultatif, sinon on voit juste B
  document.getElementById(`star${starB}`).style.display = "block";
  await sleep(2200);

  hideAllStars();
  document.getElementById(`star${starB}`).style.display = "block";
  await sleep(2200);

  hideAllStars();
}


document.getElementById("mon-bouton").addEventListener("click", actionRandom);
document.getElementById("starpicture").addEventListener("click", actionRandom);
document.getElementById("emoji-genie").addEventListener("click", actionRandom);


// Pour les carrés verticaux
ScrollReveal().reveal('.carre-vertical', {
  origin: 'bottom',
  distance: '0px',
  duration: 500,
  delay: 70,
  reset: true
});

ScrollReveal().reveal('.carre-vertical', {
  origin: 'top',
  distance: '0px',
  duration: 500,
  delay: 70,
  reset: true,    
  viewOffset: {
    top: 175
  }
});

// Pour la description
ScrollReveal().reveal('.description', {
  origin: 'bottom',
  distance: '0px',
  duration: 500,
  delay: 70,
  reset: true
});

ScrollReveal().reveal('.description', {
  origin: 'top',
  distance: '0px',
  duration: 500,
  delay: 70,
  reset: true,    
  viewOffset: {
    top: 175
  }
});


function handleClick() {
  document.querySelector('.right-image').style.display = 'none';
  document.querySelector('.Genius').style.display = 'block';
}

function handleClick2() { 
  document.querySelector('.right-image').style.display = 'block';
  document.querySelector('.Genius').style.display = 'none';}

let stylesSwapped = false;

function swapStyles() {
  const h1 = document.querySelector('.Noé');
  const noway = document.getElementById('noway');
  
  if (!stylesSwapped) {
    // Échange les styles
    h1.classList.add('style-noway');
    noway.classList.add('style-h1');
    stylesSwapped = true;
  } else {
    // Remet les styles originaux
    h1.classList.remove('style-noway');
    noway.classList.remove('style-h1');
    stylesSwapped = false;
  }
}

// Event listener pour noway - seulement quand il est en petit
document.getElementById('noway').addEventListener('click', function() {
  if (!stylesSwapped) { // Seulement si les styles ne sont pas échangés
    handleClick(); // Change l'image
    swapStyles(); // Échange les styles
  }
});

// Event listener pour h1 - seulement quand il est en petit
document.querySelector('.Noé').addEventListener('click', function() {
  if (stylesSwapped) { // Seulement si les styles sont échangés
    handleClick2(); // Change l'image
    swapStyles(); // Échange les styles
  }
});

function handleClick() {
  document.querySelector('.right-image').style.display = 'none';
  document.querySelector('.Genius').style.display = 'block';
  document.querySelector('.noway3').classList.add('shifted'); // Décalage
}

function handleClick2() { 
  document.querySelector('.right-image').style.display = 'block';
  document.querySelector('.Genius').style.display = 'none';
  document.querySelector('.noway3').classList.remove('shifted'); // Retour à la position normale
}




























// Copie adaptée depuis le CodePen (Canvas 2D) — aucune dépendance externe
class P3 {
  constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z; }
  scale(s) { return new P3(this.x*s, this.y*s, this.z*s); }
  add(p) { return new P3(this.x+p.x, this.y+p.y, this.z+p.z); }
  sub(p) { return new P3(this.x-p.x, this.y-p.y, this.z-p.z); }
  mag() { return Math.hypot(this.x, this.y, this.z); }
  unit() { return this.scale(1/this.mag()); }
  dist(p) { return this.sub(p).mag(); }
  setIndex(i, v) { if(i===0)this.x=v; else if(i===1)this.y=v; else if(i===2)this.z=v; }
  getIndex(i) { return i===0?this.x : i===1?this.y : i===2?this.z : i===3?1 : 0; }
}

const canvas = document.querySelector('#cv1');
const canvas2 = document.querySelector('#cv2');
if (!canvas || !canvas2) {
  throw new Error('Canvas manquant (#cv1 ou #cv2). Vérifie index.html.');
}





const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');

function colorGeneratorFactory()  {
  const colorMap = new Map();
  return function (x, y) {
    const key = `${x},${y}`;
    if (colorMap.has(key)) return  colorMap.get(key);
    const randomColor = 'rgb(' + Array.from({ length: 3 }, () => Math.floor(Math.random() * 128 + 80)).join(',') +  ')';
    colorMap.set(key, randomColor);
    return randomColor;
  };
}

// --- Variantes de color generators --- //
function colorGeneratorBlueFactory() {
  const colorMap = new Map();
  return function (x, y) {
    const key = `${x},${y}`;
    if (colorMap.has(key)) return  colorMap.get(key);
    const randomColor = 'rgb(' + Array.from({ length: 3 }, () => Math.floor(Math.random() * 100 + 50)).join(',') +  ')';
    colorMap.set(key, randomColor);
    return randomColor;
  };
}

function colorGeneratorRedFactory() {
  const colorMap = new Map();
  return function (x, y) {
    const key = `${x},${y}`;
    if (colorMap.has(key)) return colorMap.get(key);

    // Tons rouges / rosés
    const r = Math.floor(Math.random() * 100 + 155);   // rouge fort
    const g = Math.floor(Math.random() * 60 + 30);     // peu de vert
    const b = Math.floor(Math.random() * 100 + 100);   // un peu de bleu pour les teintes rose/violet
    const randomColor = `rgb(${r},${g},${b})`;

    colorMap.set(key, randomColor);
    return randomColor;
  };
}


function colorGenerator2Factory() {
  const colorMap = new Map();
  return function (x, y) {
    const key = `${x},${y}`;
    if (colorMap.has(key)) return colorMap.get(key);

    // Tons bleus / violets
    const r = Math.floor(Math.random() * 60 + 20);      // très peu de rouge
    const g = Math.floor(Math.random() * 80 + 40);      // un peu de vert
    const b = Math.floor(Math.random() * 120 + 135);    // bleu dominant
    const randomColor = `rgb(${r},${g},${b})`;

    colorMap.set(key, randomColor);
    return randomColor;
  };
}


const getColor = colorGeneratorFactory();
const getColorBlue = colorGeneratorBlueFactory();
const getColorRed  = colorGeneratorRedFactory();
const getColor2 = colorGenerator2Factory();
const DPI = window.devicePixelRatio || 1;
const cube = {
  center: new P3(),
  size: 200 * DPI,
  screenSize: 400 * DPI * 1.5,
  halfScreenSize: 200 * DPI * 1.5,
  D: 300 * DPI,
};

canvas.width = cube.screenSize;
canvas.height = cube.screenSize;
canvas2.width = cube.screenSize;
canvas2.height = cube.screenSize;


const canvas3 = document.querySelector('#cv3');
const ctx3 = canvas3.getContext('2d');

canvas3.width = cube.screenSize;
canvas3.height = cube.screenSize;
const matrix = makeRotationMatrix(new P3(0, 50, 80));
const matrix2 = multiplyMatrices(makeRotationMatrix(new P3(-45, 0, 0)), matrix);
const ZERO = new P3();

// --- PLANÈTE 3 ---
const canvas4 = document.querySelector('#cv4');
const ctx4 = canvas4.getContext('2d');
canvas4.width = cube.screenSize;
canvas4.height = cube.screenSize;
ctx4.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx4.rotate(48 * Math.PI / 180);
ctx4.translate(-cube.halfScreenSize, -cube.halfScreenSize);

// --- PLANÈTE 4 ---
const canvas5 = document.querySelector('#cv5');
const ctx5 = canvas5.getContext('2d');
canvas5.width = cube.screenSize;
canvas5.height = cube.screenSize;
ctx5.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx5.rotate(48 * Math.PI / 180);
ctx5.translate(-cube.halfScreenSize, -cube.halfScreenSize);

// --- PLANÈTE 5 ---
const canvas6 = document.querySelector('#cv6');
const ctx6 = canvas6.getContext('2d');
canvas6.width = cube.screenSize;
canvas6.height = cube.screenSize;
ctx6.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx6.rotate(48 * Math.PI / 180);
ctx6.translate(-cube.halfScreenSize, -cube.halfScreenSize);



function drawLine(_a, _b, color, info, cap = false) {
  const { matrix, cube, ctx } = info;
  const a = applyMatrixToPoint(matrix, _a);
  const b = applyMatrixToPoint(matrix, _b);
  if (cap && (a.dist(ZERO) > cube.size/2 || b.dist(ZERO) > cube.size/2)) return;
  const ZZ  = a.z + cube.D;
  const ZZ2 = b.z + cube.D;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(a.x*cube.D / ZZ + cube.halfScreenSize, a.y*cube.D / ZZ + cube.halfScreenSize);
  ctx.lineTo(b.x*cube.D / ZZ2 + cube.halfScreenSize, b.y*cube.D / ZZ2 + cube.halfScreenSize);
  ctx.stroke();
  ctx.closePath();
}

function drawSinLine(a, b, period, amplitude, phase, color, info) {
  const up = new P3(0, -1, 0);
  const v = b.sub(a).unit();
  const N = 100;
  const dist = b.sub(a).mag();
  const step  = dist / N;
  const periodX = Math.PI * 2 * period;
  let prev = undefined;
  for (let t = 0; t < N; t++) {
    const T = step * t;
    const S = Math.sin(periodX * (T + phase)) * amplitude;
    const p = a.add(v.scale(step * t).add(up.scale(S)));
    if (prev) drawLine(prev, p, color, info, true);
    prev = p;
  }
}

function drawCubeLines(cube, N, M, phase, info) {
  const { center, size } = cube;
  const topLeft = center.sub(new P3(size/2, size/2, size/2));
  const stepN = size / N;
  const stepM = size / M;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const p = topLeft.add(new P3(x * stepM, y * stepN, 0));
      const p2 = p.add(new P3(0, 0, size));
      drawSinLine(p, p2, 0.01, 4, phase, getColor(x, y), info);
    }
  }
}

function drawCubeLinesRed(cube, N, M, phase, info) {
  const { center, size } = cube;
  const topLeft = center.sub(new P3(size/2, size/2, size/2));
  const stepN = size / N;
  const stepM = size / M;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const p  = topLeft.add(new P3(x * stepM, y * stepN, 0));
      const p2 = p.add(new P3(0, 0, size));
      drawSinLine(p, p2, 0.01, 4, phase, getColorRed(x, y), info);
    }
  }
}

function drawCubeLinesBlue(cube, N, M, phase, info) {
  const { center, size } = cube;
  const topLeft = center.sub(new P3(size/2, size/2, size/2));
  const stepN = size / N;
  const stepM = size / M;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const p  = topLeft.add(new P3(x * stepM, y * stepN, 0));
      const p2 = p.add(new P3(0, 0, size));
      drawSinLine(p, p2, 0.01, 4, phase, getColorBlue(x, y), info);
    }
  }
}


function drawCubeLines2(cube, N, M, phase, info) {
  const { center, size } = cube;
  const topLeft = center.sub(new P3(size/2, size/2, size/2));
  const stepN = size / N;
  const stepM = size / M;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const p  = topLeft.add(new P3(x * stepM, y * stepN, 0));
      const p2 = p.add(new P3(0, 0, size));
      drawSinLine(p, p2, 0.01, 4, phase, getColor2(x, y), info);
    }
  }
}

function drawRing(cube, scalar, angleFrom, angleTo, color, info) {
  const skip = 1;
  let a = angleFrom;
  const deg2Rad = 180/Math.PI;
  const S = cube.size * 0.5 * scalar;
  while (a !== angleTo) {
    const a2 = a + skip;
    const p1 = new P3(Math.cos(a/deg2Rad) * S, 0, Math.sin(a/deg2Rad) * S);
    const p2 = new P3(Math.cos(a2/deg2Rad) * S, 0, Math.sin(a2/deg2Rad) * S);
    drawLine(p1, p2, color, info, false);
    a = a2 % 360;
  }
}

function drawRings(cube, angleFrom, angleTo, info) {
  ctx.lineWidth = 2 * DPI;
  const scalar = 0.01 * DPI;
  const N = 50 / DPI - 1;
  for (let i = 0; i < N; i++) {
    drawRing(cube, 1.35 + scalar * i, angleFrom, angleTo, getColor(i**i, -(i**i)), { ...info, matrix: matrix2 });
  }
}

let phase = 0;
let hueT = 0;
let dropShadowT = 0;

const info = { cube, matrix, ctx, canvas };

ctx.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx2.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx.rotate(48 * Math.PI / 180);
ctx2.rotate(48 * Math.PI / 180);
ctx.translate(-cube.halfScreenSize, -cube.halfScreenSize);
ctx2.translate(-cube.halfScreenSize, -cube.halfScreenSize);


/* mêmes transformations de base que pour ctx/ctx2 */
ctx3.translate(cube.halfScreenSize, cube.halfScreenSize);
ctx3.rotate(48 * Math.PI / 180);
ctx3.translate(-cube.halfScreenSize, -cube.halfScreenSize);

function draw() {
  ctx.clearRect(0, 0, cube.screenSize, cube.screenSize);
  ctx.lineWidth = Math.round(6/800 * cube.screenSize);

  // Planète 1 (rouge) + anneaux
  drawCubeLines(cube, 25/1.5, 20/1.5, phase, info);
  drawRings(cube, 236, 126, { ...info, ctx: ctx2, canvas: canvas2 });

  // Planète 2 (bleue) sans anneau
  ctx3.clearRect(0, 0, cube.screenSize, cube.screenSize);
  ctx3.lineWidth = Math.round(6/800 * cube.screenSize);
  drawCubeLinesBlue(cube, 25/1.5, 20/1.5, phase + 50, { ...info, ctx: ctx3, canvas: canvas3 });
  
  ctx4.clearRect(0, 0, cube.screenSize, cube.screenSize);
  ctx4.lineWidth = Math.round(6/400 * cube.screenSize);
  drawCubeLinesRed(cube, 25/1.5, 20/1.5, phase + 40, { ...info, ctx: ctx4 });

  ctx5.clearRect(0, 0, cube.screenSize, cube.screenSize);
  ctx5.lineWidth = Math.round(6/800 * cube.screenSize);
  drawCubeLinesBlue(cube, 25/1.5, 20/1.5, phase + 50, { ...info, ctx: ctx5, canvas: canvas5 });

  ctx6.clearRect(0, 0, cube.screenSize, cube.screenSize);
  ctx6.lineWidth = Math.round(6/500 * cube.screenSize);
  drawCubeLines2(cube, 25/1.5, 25/1.5, phase + 1200, { ...info, ctx: ctx6 });
  // Effets
  phase += 15;
  dropShadowT += 0.1;
  const ds = Math.floor((Math.sin(dropShadowT)+1) * 20 * DPI) + 25 * DPI;
  const shadowColor = 'rgba(205, 255, 255, 0.8)';
  canvas.style.filter = `contrast(15) blur(1px) hue-rotate(${Math.floor(hueT)}deg) drop-shadow(0px 0px ${ds}px ${shadowColor})`;
  canvas2.style.filter = `contrast(15) blur(2px) hue-rotate(${Math.floor(hueT)}deg)`;
  canvas3.style.filter = `contrast(15) blur(1px) hue-rotate(${Math.floor(hueT + 120)}deg)`;
  hueT = (hueT+2) % 360;

  setTimeout(() => requestAnimationFrame(draw), 500); // ~10 FPS
}

draw();

/* --- Matrices --- */
function multiplyMatrices(m1, m2) {
  const rv = Array.from({ length: 16 }, () => 0);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let sum = 0;
      for (let i = 0; i < 4; i++) sum += m1[r*4 + i] * m2[i*4 + c];
      rv[r*4 + c] = sum;
    }
  }
  return rv;
}
function applyMatrixToPoint(m, p) {
  const rv = new P3();
  for (let i = 0; i < 4; i++) {
    let sum = 0;
    for (let j = 0; j < 4; j++) sum += m[i*4 + j] * p.getIndex(j);
    rv.setIndex(i, sum);
  }
  return rv;
}
function makeRotationMatrix(r) {
  return multiplyMatrices(
    makeZRotationMatrix(r.z),
    multiplyMatrices(makeXRotationMatrix(r.x), makeYRotationMatrix(r.y))
  );
}
function makeYRotationMatrix(angle) {
  const c = Math.cos(angle / 57.3);
  const s = Math.sin(angle / 57.3);
  return [ c,0,s,0,  0,1,0,0,  -s,0,c,0,  0,0,0,1 ];
}
function makeXRotationMatrix(angle) {
  const c = Math.cos(angle / 57.3);
  const s = Math.sin(angle / 57.3);
  return [ 1,0,0,0,  0,c,-s,0,  0,s,c,0,  0,0,0,1 ];
}
function makeZRotationMatrix(angle) {
  const c = Math.cos(angle / 57.3);
  const s = Math.sin(angle / 57.3);
  return [ c,-s,0,0,  s,c,0,0,  0,0,1,0,  0,0,0,1 ];
}


// --- Effet d'étoiles transparentes (basé sur le pen Rishabh-Potti) ---
const starsCanvas = document.getElementById("stars");
const starsCtx = starsCanvas.getContext("2d");
function resizeStars() {
  const DPR = window.devicePixelRatio || 1;
  starsCanvas.style.width = window.innerWidth + "px";
  starsCanvas.style.height = window.innerHeight + "px";
  starsCanvas.width = Math.floor(window.innerWidth * DPR);
  starsCanvas.height = Math.floor(window.innerHeight * DPR);
  starsCtx.setTransform(DPR, 0, 0, DPR, 0, 0); // dessiner en “pixels CSS”
}
window.addEventListener("resize", resizeStars);
resizeStars();

// Génère des étoiles aléatoires
const numStars = 550;
const stars = Array.from({ length: numStars }, () => ({
  x: Math.random() * starsCanvas.width,
  y: Math.random() * starsCanvas.height,
  radius: Math.random() * 1.2,
  alpha: Math.random(),
  delta: 0.005 + Math.random() * 0.015
}));

function animateStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  for (const s of stars) {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta = -s.delta;
    starsCtx.globalAlpha = s.alpha;
    starsCtx.beginPath();
    starsCtx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    starsCtx.fillStyle = "white";
    starsCtx.fill();
  }
  requestAnimationFrame(animateStars);
}
animateStars();





document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('about-carousel');
  if (!root) return;

  const track = root.querySelector('.nc-track');
  const prev  = root.querySelector('.nc-prev');
  const next  = root.querySelector('.nc-next');
  const slides = Array.from(root.querySelectorAll('.nc-slide'));
  const dotsWrap = root.querySelector('.nc-dots');

  let index = 0;
  const last = slides.length - 1;

  // Bullets
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'nc-dot' + (i === 0 ? ' is-active' : '');
    d.dataset.i = String(i);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dotsWrap.querySelectorAll('.nc-dot').forEach((el, i) => {
      el.classList.toggle('is-active', i === index);
    });
  }
  function goTo(i) { index = Math.min(Math.max(i, 0), last); render(); }
  function nextSlide() { if (index < last) goTo(index + 1); else goTo(0); }
  function prevSlide() { if (index > 0) goTo(index - 1); else goTo(last); }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  // Clavier (quand le focus est dans la page)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    else if (e.key === 'ArrowLeft') prevSlide();
  });

  // Swipe tactile
  let startX = null;
  track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, {passive: true});
  track.addEventListener('touchmove',  (e) => {}, {passive: true});
  track.addEventListener('touchend',   (e) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? nextSlide() : prevSlide());
    startX = null;
  });

  // Sécurité au redimensionnement (cases 100%)
  window.addEventListener('resize', render);

  render();
});
