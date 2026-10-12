// The Dhaulagiri Circuit in 3D, on its own page (dhaulagiri.html), to turn and zoom.
// Trail: Beni, up the Myagdi Khola past Darbang, Muri, Boghara and Dobang to Italian Base Camp,
// up the glacier to Dhaulagiri Base Camp, over French Pass, through Hidden Valley, over Dhampus
// Pass and down to Yak Kharka and Marpha. It is routed between those places along the easiest
// ground on this terrain, so it follows the valleys but is not a GPS track.
// Terrain: Copernicus GLO-30 DEM (© DLR e.V. 2010–2014 and © Airbus 2014–2018, provided under
// COPERNICUS by the European Union and ESA), averaged to 400 × 498, 28.30–28.86° N, 83.30–83.75° E.
// Surface: Sentinel-2 cloudless 2020 by EOX IT Services GmbH (contains modified Copernicus
// Sentinel data 2020), CC BY-NC-SA 4.0.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';

const NX = 400, NY = 498, LAT0 = 28.86, LAT1 = 28.30, LON0 = 83.30, LON1 = 83.75;
const KM_X = (LON1 - LON0) * 97.6, KM_Y = (LAT0 - LAT1) * 111.0;
const VE = 1.5, FLOOR = 700;
const fmt = n => Math.round(n).toLocaleString('en-GB').replace(/,/g, ' ');

// surveyed heights; positions are the summits in the elevation data
const PEAKS = [
  ['Dhaulagiri I', 8167, 28.6975, 83.4897], ['Dhaulagiri II', 7751, 28.7631, 83.3875], ['Dhaulagiri III', 7715, 28.7543, 83.3774],
  ['Dhaulagiri IV', 7661, 28.7362, 83.3144], ['Tukuche Peak', 6920, 28.7449, 83.5576], ['Nilgiri South', 6839, 28.6729, 83.7352],
];

let Z, T, tex;
const z = (i, j) => Z[Math.max(0, Math.min(NY - 1, i)) * NX + Math.max(0, Math.min(NX - 1, j))];
const X = lo => (lo - LON0) / (LON1 - LON0) * KM_X;
const Zw = la => (LAT0 - la) / (LAT0 - LAT1) * KM_Y;
const Y = h => Math.max(0, h - FLOOR) / 1000 * VE;
function ground(la, lo) {
  const fi = (LAT0 - la) / (LAT0 - LAT1) * (NY - 1), fj = (lo - LON0) / (LON1 - LON0) * (NX - 1);
  const i = Math.floor(fi), j = Math.floor(fj), a = fi - i, b = fj - j;
  return (z(i, j) * (1 - a) + z(i + 1, j) * a) * (1 - b) + (z(i, j + 1) * (1 - a) + z(i + 1, j + 1) * a) * b;
}

function terrain() {
  const pos = new Float32Array(NX * NY * 3), uv = new Float32Array(NX * NY * 2);
  for (let i = 0; i < NY; i++) for (let j = 0; j < NX; j++) {
    const k = i * NX + j;
    pos[k * 3] = j / (NX - 1) * KM_X; pos[k * 3 + 1] = Y(z(i, j)); pos[k * 3 + 2] = i / (NY - 1) * KM_Y;
    uv[k * 2] = j / (NX - 1); uv[k * 2 + 1] = 1 - i / (NY - 1);
  }
  const idx = new Uint32Array((NX - 1) * (NY - 1) * 6); let n = 0;
  for (let i = 0; i < NY - 1; i++) for (let j = 0; j < NX - 1; j++) {
    const a = i * NX + j, b = a + 1, d = a + NX, e = d + 1; idx[n++] = a; idx[n++] = d; idx[n++] = b; idx[n++] = b; idx[n++] = d; idx[n++] = e;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(new THREE.BufferAttribute(idx, 1)); g.computeVertexNormals();
  const land = new THREE.Mesh(g, new THREE.MeshStandardMaterial({ map: tex, roughness: .95 }));
  land.name = 'land'; land.castShadow = land.receiveShadow = true;
  // plain earth walls under the land
  const p = [], c = [], ix = [], top = new THREE.Color('#8f7252'), bot = new THREE.Color('#4a3626'), base = -1;
  const wall = pts => { const o = p.length / 3; pts.forEach(([x, zz, h], k) => {
    p.push(x, base, zz, x, Y(h), zz); c.push(bot.r, bot.g, bot.b, top.r, top.g, top.b);
    if (k) { const b = o + (k - 1) * 2; ix.push(b, b + 2, b + 1, b + 1, b + 2, b + 3); } }); };
  const Wl = [], E = [], N = [], S = [];
  for (let i = 0; i < NY; i++) { const zz = i / (NY - 1) * KM_Y; Wl.push([0, zz, z(i, 0)]); E.push([KM_X, zz, z(i, NX - 1)]); }
  for (let j = 0; j < NX; j++) { const x = j / (NX - 1) * KM_X; N.push([x, 0, z(0, j)]); S.push([x, KM_Y, z(NY - 1, j)]); }
  [Wl, E, N, S].forEach(wall);
  const wg = new THREE.BufferGeometry();
  wg.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); wg.setAttribute('color', new THREE.Float32BufferAttribute(c, 3));
  wg.setIndex(ix); wg.computeVertexNormals();
  const grp = new THREE.Group(); grp.add(land, new THREE.Mesh(wg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide })));
  return grp;
}

function play(stage) {
  const r = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  r.setPixelRatio(Math.min(1.5, devicePixelRatio)); r.outputColorSpace = THREE.SRGBColorSpace;
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  const small = matchMedia('(max-width: 52rem)').matches;
  r.shadowMap.enabled = !small; r.shadowMap.type = THREE.PCFSoftShadowMap; stage.prepend(r.domElement);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog('#d6e3ee', 70, 220);
  scene.add(new THREE.HemisphereLight('#e4efff', '#5a4a36', .8));
  const sun = new THREE.DirectionalLight('#ffe7c4', 3); sun.castShadow = !small;
  sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.0004; sun.shadow.normalBias = .05;
  Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50, near: 1, far: 260 });
  sun.position.set(KM_X / 2 - 60, 60, KM_Y / 2 + 25); sun.target.position.set(KM_X / 2, 0, KM_Y / 2); scene.add(sun, sun.target);
  const model = terrain(); scene.add(model); const land = model.getObjectByName('land');
  const flat = []; T.pts.forEach(([la, lo]) => flat.push(X(lo), Y(ground(la, lo)) + .1, Zw(la)));
  const trail = new Line2(new LineGeometry().setPositions(flat), new LineMaterial({ color: '#e0312b', linewidth: 3 })); scene.add(trail);
  const cam = new THREE.PerspectiveCamera(38, 1, .1, 800);
  const ctl = new OrbitControls(cam, r.domElement);
  ctl.enableDamping = true; ctl.maxPolarAngle = Math.PI * .47; ctl.minDistance = 4; ctl.maxDistance = 160; ctl.enabled = false;

  const layer = stage.querySelector('.play-labels'), labels = [];
  PEAKS.forEach(([n, m, la, lo]) => { const el = document.createElement('span'); el.className = 'pl-peak'; el.innerHTML = `${n}<em>${fmt(m)} m</em>`;
    layer.appendChild(el); labels.push({ el, rank: m, pos: new THREE.Vector3(X(lo), Y(m) + .2, Zw(la)) }); });
  T.stops.forEach(st => { const q = T.pts[st.k], el = document.createElement('span'); el.className = 'pl-stop'; el.innerHTML = `${st.n} <em>${fmt(st.h)} m</em>`;
    layer.appendChild(el); labels.push({ el, rank: st.h / 2, pos: new THREE.Vector3(X(q[1]), Y(ground(q[0], q[1])) + .2, Zw(q[0])) }); });
  labels.sort((a, b) => b.rank - a.rank);

  let W = 0, H = 0;
  const v = new THREE.Vector3(), d = new THREE.Vector3(), sight = new THREE.Raycaster();
  function place() {
    // never under the card or the hint on the full page
    const sb = stage.getBoundingClientRect(), taken = [...document.querySelectorAll('.card, .hint')].map(e => {
      const b = e.getBoundingClientRect(); return [b.left - sb.left - 6, b.top - sb.top - 6, b.right - sb.left + 6, b.bottom - sb.top + 6]; });
    labels.forEach(t => {
      v.copy(t.pos).project(cam); const x = (v.x + 1) / 2 * W, y = (1 - v.y) / 2 * H;
      if (t.behind || v.z > 1 || x < 0 || x > W || y < 0 || y > H) { t.el.style.display = 'none'; return; }
      t.el.style.display = 'block'; const w = t.el.offsetWidth, h = t.el.offsetHeight, b = [x - w / 2 - 2, y - h - 3, x + w / 2 + 2, y];
      const ok = !taken.some(o => b[0] < o[2] && b[2] > o[0] && b[1] < o[3] && b[3] > o[1]);
      t.el.style.display = ok ? 'block' : 'none';
      if (ok) { taken.push(b); t.el.style.transform = `translate(${x}px, ${y}px) translate(-50%,-100%)`; }
    });
  }
  function occlude() {
    labels.forEach(t => { d.copy(t.pos).sub(cam.position); const far = d.length(); sight.set(cam.position, d.normalize()); sight.far = far;
      const hit = sight.intersectObject(land)[0]; t.behind = !!hit && hit.distance < far - .5; });
  }
  let looping = false;
  function loop() {
    if (looping) return; looping = true;
    const step = () => { const moved = ctl.update(); r.render(scene, cam); place(); if (moved) requestAnimationFrame(step); else looping = false; };
    requestAnimationFrame(step);
  }
  ctl.addEventListener('change', loop);
  ctl.addEventListener('start', () => labels.forEach(t => { t.behind = false; }));
  ctl.addEventListener('end', () => setTimeout(() => { occlude(); loop(); }, 200));

  // hover: the height under the pointer
  const tip = stage.querySelector('.play-tip'), ray = new THREE.Raycaster(), m = new THREE.Vector2();
  r.domElement.addEventListener('pointermove', e => {
    const b = r.domElement.getBoundingClientRect(); m.set((e.clientX - b.left) / b.width * 2 - 1, -(e.clientY - b.top) / b.height * 2 + 1); ray.setFromCamera(m, cam);
    const hit = ray.intersectObject(land)[0]; if (!hit) { tip.style.opacity = 0; return; }
    const la = LAT0 - hit.point.z / KM_Y * (LAT0 - LAT1), lo = LON0 + hit.point.x / KM_X * (LON1 - LON0);
    tip.innerHTML = `<b>${fmt(ground(la, lo))} m</b> · ${la.toFixed(3)}° N, ${lo.toFixed(3)}° E`;
    tip.style.opacity = 1; tip.style.transform = `translate(${e.clientX - b.left + 14}px, ${e.clientY - b.top + 14}px)`;
  });
  r.domElement.addEventListener('pointerleave', () => { tip.style.opacity = 0; });

  // the first view: from the south, over the green hills of Beni, up the valley to Dhaulagiri
  function size() { const b = stage.getBoundingClientRect(); W = b.width; H = b.height; r.setSize(W, H, false); cam.aspect = W / H;
    // on the full page, centre the land in the space right of the card
    const card = document.querySelector('.card'), cw = card && W > 700 ? card.getBoundingClientRect().right : 0;
    // phones: the card sits on top, so centre the land in the space below it
    const ch = card && W <= 700 ? card.getBoundingClientRect().bottom : 0;
    if (cw) cam.setViewOffset(W, H, -cw / 2, 0, W, H); else if (ch) cam.setViewOffset(W, H, 0, -ch / 2, W, H); else cam.clearViewOffset();
    cam.updateProjectionMatrix(); trail.material.resolution.set(W, H); loop(); }
  addEventListener('resize', size); size();
  // from the south and well above; come in until the near (south) edge spans the full width,
  // then aim so the land sits in the middle of the frame top to bottom
  const look = new THREE.Vector3(KM_X / 2, Y(2500), KM_Y * .5), dir = new THREE.Vector3(0, Math.sin(.9), Math.cos(.9));
  const near = [new THREE.Vector3(0, Y(z(NY - 1, 0)), KM_Y), new THREE.Vector3(KM_X, Y(z(NY - 1, NX - 1)), KM_Y)];
  const north = new THREE.Vector3(KM_X / 2, Y(7000), 0), south = new THREE.Vector3(KM_X / 2, 0, KM_Y);
  for (let dist = 220; dist > 10; dist -= 1) {
    cam.position.copy(look).addScaledVector(dir, dist); cam.lookAt(look); cam.updateMatrixWorld();
    if (near[0].clone().project(cam).x <= -1 && near[1].clone().project(cam).x >= 1) break;
  }
  for (let n = 0; n < 30; n++) {
    const yN = north.clone().project(cam).y, yS = south.clone().project(cam).y, shift = (yN + yS) / 2;
    if (Math.abs(shift) < .01) break;
    look.z -= shift * 4; cam.position.z -= shift * 4; cam.lookAt(look); cam.updateMatrixWorld();
  }
  ctl.target.copy(look); ctl.update();
  // haze starts beyond the land, however far back the first view sits (phones sit further back)
  const d0 = cam.position.distanceTo(look); scene.fog.near = d0 * 1.1; scene.fog.far = d0 * 3;
  occlude(); loop();

  // the page scrolls past it until someone chooses to play
  const cover = stage.querySelector('.play-cover');
  if (!cover) { ctl.enabled = true; return; }            // its own page: live straight away
  cover.addEventListener('click', () => { ctl.enabled = true; stage.classList.add('active'); });
  stage.addEventListener('pointerleave', () => { ctl.enabled = false; stage.classList.remove('active'); });
}

// load only when the reader comes near it
const stage = document.querySelector('.play-stage');
if (stage) new IntersectionObserver((es, io) => {
  if (!es[0].isIntersecting) return; io.disconnect();
  Promise.all([
    fetch('data/dhaulagiri-dem.bin').then(r => r.arrayBuffer()),
    fetch('data/dhaulagiri-circuit.json').then(r => r.json()),
    new THREE.TextureLoader().loadAsync('images/site/dhaulagiri-s2.jpg'),
  ]).then(([dem, trail, t]) => {
    Z = new Uint16Array(dem); T = trail; tex = t; tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
    play(stage);
  });
}, { rootMargin: '600px 0px' }).observe(stage);
