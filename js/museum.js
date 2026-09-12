import * as THREE from 'three';
import { createMarbleTexture, createWoodTexture, createWallTexture, createSignTexture } from './textures.js';

const _cache = {};
function marbleMat() {
  if (!_cache.marble) {
    const tex = createMarbleTexture(512, 512);
    tex.repeat.set(8, 8);
    _cache.marble = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.18, metalness: 0.05 });
  }
  return _cache.marble;
}
function wallMat(color) {
  const key = 'wall_' + color;
  if (!_cache[key]) {
    const tex = createWallTexture(256, 256, color);
    tex.repeat.set(4, 2);
    _cache[key] = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.95 });
  }
  return _cache[key];
}
function lazyCols() {
  if (!_cache.colMat) _cache.colMat = new THREE.MeshStandardMaterial({ color: 0xD8D4C8, roughness: 0.28 });
  return _cache.colMat;
}
function lazyGold() {
  if (!_cache.goldMat) _cache.goldMat = new THREE.MeshStandardMaterial({ color: 0xD4AA2B, roughness: 0.2, metalness: 0.85 });
  return _cache.goldMat;
}
function lazyStone() {
  if (!_cache.stoneMat) _cache.stoneMat = new THREE.MeshStandardMaterial({ color: 0xA09585, roughness: 0.8 });
  return _cache.stoneMat;
}

function mesh(geo, mat, px, py, pz, rx, ry, rz) {
  const m = new THREE.Mesh(geo, mat);
  if (px !== undefined) m.position.set(px, py, pz);
  if (rx !== undefined) m.rotation.set(rx, ry, rz);
  return m;
}

function addColumn(scene, x, z) {
  const cm = lazyCols(), gm = lazyGold();
  scene.add(mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), cm, x, 0.2, z));
  const shaft = mesh(new THREE.CylinderGeometry(0.4, 0.48, 7.2, 16), cm, x, 4.0, z);
  shaft.castShadow = true;
  scene.add(shaft);
  scene.add(mesh(new THREE.BoxGeometry(1.2, 0.5, 1.2), cm, x, 7.8, z));
  const ring = mesh(new THREE.TorusGeometry(0.5, 0.06, 6, 20), gm, x, 7.55, z, Math.PI/2, 0, 0);
  scene.add(ring);
}

function addLight(scene, x, z, intensity = 1.4, color = 0xFFD480) {
  const col = new THREE.Color(color);
  const fixture = mesh(
    new THREE.SphereGeometry(0.2, 10, 10),
    new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 3.5 }),
    x, 7.75, z
  );
  scene.add(fixture);
  const light = new THREE.PointLight(color, intensity, 22, 1.5);
  light.position.set(x, 7.5, z);
  scene.add(light);
}

function addSign(scene, x, y, z, rotY, title, lines) {
  const tex = createSignTexture({ w: 512, h: 256, title, lines });
  const m = mesh(
    new THREE.PlaneGeometry(2.6, 1.2),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8 }),
    x, y, z, 0, rotY, 0
  );
  scene.add(m);
}

// ─── Statues in Grand Hall with funny accessories ─────────
export function addInteractiveStatues(scene) {
  const sm = lazyStone();
  const statues = [];

  [-6.8, 6.8].forEach((x, idx) => {
    const group = new THREE.Group();
    group.position.set(x, 0, -2.5);

    // Pedestal
    group.add(mesh(new THREE.BoxGeometry(0.9, 1.5, 0.9), sm, 0, 0.75, 0));
    // Body
    group.add(mesh(new THREE.CylinderGeometry(0.26, 0.34, 1.4, 10), sm, 0, 2.2, 0));
    // Head
    const head = mesh(new THREE.SphereGeometry(0.22, 12, 12), sm, 0, 3.15, 0);
    group.add(head);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.85, 6);
    const aL = mesh(armGeo, sm, -0.42, 2.4, 0, 0, 0, -Math.PI / 3.2);
    const aR = mesh(armGeo, sm,  0.42, 2.4, 0, 0, 0,  Math.PI / 3.2);
    group.add(aL); group.add(aR);

    // Silly Accessory 1: Party Hat / Sunglasses
    if (idx === 0) {
      // Party Cone Hat
      const hatMat = new THREE.MeshStandardMaterial({ color: 0xFF3366, roughness: 0.3 });
      const hat = mesh(new THREE.ConeGeometry(0.18, 0.45, 12), hatMat, 0, 3.5, 0);
      group.add(hat);
      // Pom pom
      group.add(mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshStandardMaterial({ color: 0xFFEE00 }), 0, 3.75, 0));
    } else {
      // Cool Sunglasses
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 });
      const glasses = mesh(new THREE.BoxGeometry(0.32, 0.08, 0.05), glassMat, 0, 3.18, 0.22);
      group.add(glasses);
      // Mustache
      const stacheMat = new THREE.MeshStandardMaterial({ color: 0x221100, roughness: 0.9 });
      const stache = mesh(new THREE.TorusGeometry(0.08, 0.025, 6, 10, Math.PI), stacheMat, 0, 3.02, 0.22, Math.PI, 0, 0);
      group.add(stache);
    }

    // Plaque
    const plTex = createSignTexture({
      w: 256, h: 96,
      title: idx === 0 ? "STATUE OF PROCRASTINATION" : "STATUE OF CONFUSION",
      titleSz: 14, lines: ["Tap to interact"], lineSz: 12
    });
    group.add(mesh(new THREE.PlaneGeometry(0.7, 0.3), new THREE.MeshStandardMaterial({ map: plTex }), 0, 0.8, 0.46));

    // Interactive target
    const hit = mesh(new THREE.BoxGeometry(1.2, 3.8, 1.2), new THREE.MeshBasicMaterial({ visible: false }), 0, 1.9, 0);
    hit.userData.isStatue = true;
    hit.userData.statueIdx = idx;
    group.add(hit);

    scene.add(group);
    statues.push({ group, hit });
  });

  return statues;
}

// ─── Service Desk / Bell & Complaints Box in Entrance ────
export function addEntranceFunObjects(scene) {
  const funObjects = [];
  const gm = lazyGold();

  // Reception Desk
  const deskWood = createWoodTexture();
  const deskMat = new THREE.MeshStandardMaterial({ map: deskWood, roughness: 0.5 });
  const desk = mesh(new THREE.BoxGeometry(3.6, 1.1, 1.2), deskMat, 0, 0.55, -8);
  scene.add(desk);

  // Gold Trim on desk
  scene.add(mesh(new THREE.BoxGeometry(3.64, 0.06, 1.24), gm, 0, 1.12, -8));

  // 1. Service Bell on Desk
  const bellGroup = new THREE.Group();
  bellGroup.position.set(-0.9, 1.15, -8);
  // Base
  bellGroup.add(mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.06, 16), gm, 0, 0.03, 0));
  // Dome
  bellGroup.add(mesh(new THREE.SphereGeometry(0.16, 16, 12, 0, Math.PI*2, 0, Math.PI/2), gm, 0, 0.06, 0));
  // Push button
  bellGroup.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8), gm, 0, 0.22, 0));
  
  // Plaque for Bell
  const bTex = createSignTexture({ w: 256, h: 64, title: '', lines: ['🔔 RING FOR NO SERVICE'], lineSz: 16 });
  bellGroup.add(mesh(new THREE.PlaneGeometry(0.5, 0.15), new THREE.MeshStandardMaterial({ map: bTex }), 0, -0.2, 0.61));

  // Hit target
  const bellHit = mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.MeshBasicMaterial({ visible: false }), 0, 0.2, 0);
  bellHit.userData.isServiceBell = true;
  bellGroup.add(bellHit);
  scene.add(bellGroup);
  funObjects.push(bellHit);

  // 2. Complaints Shredder Box
  const boxGroup = new THREE.Group();
  boxGroup.position.set(0.9, 1.15, -8);
  // Red/Gold box
  const bMat = new THREE.MeshStandardMaterial({ color: 0x881111, roughness: 0.4 });
  boxGroup.add(mesh(new THREE.BoxGeometry(0.45, 0.45, 0.35), bMat, 0, 0.225, 0));
  // Slot on top
  boxGroup.add(mesh(new THREE.BoxGeometry(0.28, 0.02, 0.04), new THREE.MeshBasicMaterial({ color: 0x000000 }), 0, 0.455, 0));
  
  // Plaque
  const cTex = createSignTexture({ w: 256, h: 64, title: '', lines: ['🗑️ COMPLAINTS (SHREDDER)'], lineSz: 14 });
  boxGroup.add(mesh(new THREE.PlaneGeometry(0.5, 0.15), new THREE.MeshStandardMaterial({ map: cTex }), 0, -0.2, 0.61));

  const compHit = mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.MeshBasicMaterial({ visible: false }), 0, 0.2, 0);
  compHit.userData.isComplaintsBox = true;
  boxGroup.add(compHit);
  scene.add(boxGroup);
  funObjects.push(compHit);

  // 3. Red Security Laser Tripwires near Doorway (z = -36)
  const laserMat = new THREE.MeshBasicMaterial({ color: 0xFF0033, transparent: true, opacity: 0.75 });
  for (let l = 0; l < 3; l++) {
    const y = 0.8 + l * 0.9;
    const beam = mesh(new THREE.CylinderGeometry(0.015, 0.015, 4.0, 6), laserMat, 0, y, -36, 0, 0, Math.PI/2);
    scene.add(beam);
  }
  const laserHit = mesh(new THREE.BoxGeometry(4.0, 3.0, 0.4), new THREE.MeshBasicMaterial({ visible: false }), 0, 1.8, -36);
  laserHit.userData.isLaserGrid = true;
  scene.add(laserHit);
  funObjects.push(laserHit);

  return funObjects;
}

// ═══════════════════════════════════════════════════════
// BUILD ENTRY HALL (20w x 8h x 38d)
// ═══════════════════════════════════════════════════════
export function buildEntryHall(scene) {
  const W = 20, H = 8, D = 38;
  const mm = marbleMat();
  const wm = wallMat('#1A1108');
  const gm = lazyGold();

  // Floor
  const floor = mesh(new THREE.PlaneGeometry(W, D), mm, 0, 0, -D/2, -Math.PI/2, 0, 0);
  scene.add(floor);

  // Ceiling
  scene.add(mesh(new THREE.PlaneGeometry(W, D),
    new THREE.MeshStandardMaterial({ color: 0x090604, roughness: 1 }),
    0, H, -D/2, Math.PI/2, 0, 0));

  // Walls
  scene.add(mesh(new THREE.PlaneGeometry(D, H), wm, -W/2, H/2, -D/2, 0, Math.PI/2, 0));
  scene.add(mesh(new THREE.PlaneGeometry(D, H), wm,  W/2, H/2, -D/2, 0, -Math.PI/2, 0));

  // Back wall with Grand Archway
  const doorW = 5, doorH = 5.8;
  const sw = (W - doorW) / 2;
  scene.add(mesh(new THREE.PlaneGeometry(sw, H), wm, -W/2 + sw/2, H/2, -D));
  scene.add(mesh(new THREE.PlaneGeometry(sw, H), wm,  W/2 - sw/2, H/2, -D));
  scene.add(mesh(new THREE.PlaneGeometry(doorW, H - doorH), wm, 0, doorH + (H-doorH)/2, -D));

  // Gold Grand Archway Frame
  scene.add(mesh(new THREE.BoxGeometry(0.18, doorH, 0.3), gm, -doorW/2, doorH/2, -D+0.1));
  scene.add(mesh(new THREE.BoxGeometry(0.18, doorH, 0.3), gm,  doorW/2, doorH/2, -D+0.1));
  scene.add(mesh(new THREE.BoxGeometry(doorW+0.36, 0.18, 0.3), gm, 0, doorH, -D+0.1));

  // Welcome Header
  const wTex = createSignTexture({
    w: 1024, h: 192, bg: '#100A05', borderColor: '#C9A227',
    title: 'THE POINTLESS DIGITAL MUSEUM', titleSz: 32, titleColor: '#F3D058',
    lines: ['"Where the completely ordinary is celebrated as priceless art."'],
    lineSz: 20, textColor: '#E5DCce'
  });
  scene.add(mesh(new THREE.PlaneGeometry(10, 1.8), new THREE.MeshStandardMaterial({ map: wTex, roughness: 0.8 }), 0, 5.0, -D+0.08));

  // Directional Sign
  const r2Tex = createSignTexture({
    w: 512, h: 96, bg: '#080502', borderColor: '#8B6914',
    lines: ['THE COLLECTION (10 EXHIBITS)  \u2192'], lineSz: 24, textColor: '#F3D058'
  });
  scene.add(mesh(new THREE.PlaneGeometry(4.8, 0.85), new THREE.MeshStandardMaterial({ map: r2Tex, roughness: 0.8 }), 0, 6.6, -D+0.08));

  // Columns (3 pairs)
  [-6, -18, -30].forEach(z => { addColumn(scene, -8.5, z); addColumn(scene, 8.5, z); });

  // Warm Chandelier Ceiling Lights
  [-3, -13, -23, -33].forEach(z => { addLight(scene, 0, z, 1.6, 0xFFDA8A); });

  // Wall Banners
  [[-9.45, -12, Math.PI/2], [9.45, -12, -Math.PI/2], [-9.45, -24, Math.PI/2], [9.45, -24, -Math.PI/2]].forEach(a => {
    const tex = createSignTexture({
      w: 128, h: 320, bg: '#120B05', borderColor: '#C9A227',
      title: 'MUSEUM', titleSz: 14, titleColor: '#F3D058',
      lines: ['OF', 'POINTLESS', 'HERITAGE', '', '🏛️'], lineSz: 11
    });
    scene.add(mesh(new THREE.PlaneGeometry(1.6, 4.0), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }), a[0], 5.6, a[1], 0, a[2], 0));
  });

  // Humorous Museum Notices
  addSign(scene, -9.46, 2.5, -4,  Math.PI/2, 'ADMISSION RULES', ['1. Do not ask for refunds.', '2. No thinking allowed inside.', '3. Please waste time quietly.']);
  addSign(scene,  9.46, 2.5, -16, -Math.PI/2, 'SECURITY ADVISORY', ['Our security guards are paid in coupons.', 'Stealing an exhibit will only burden you.']);
  addSign(scene, -9.46, 2.5, -28, Math.PI/2, 'CURATOR STATEMENT', ['"We could have built something useful.', 'We deliberately chose not to."']);

  addEntranceFunObjects(scene);
}

// ═══════════════════════════════════════════════════════
// BUILD COLLECTION ROOM (28w x 8h x 58d, z = -40 to -98)
// ═══════════════════════════════════════════════════════
export function buildCollection(scene) {
  const W = 28, H = 8, D = 58;
  const z0 = -40;
  const mm = marbleMat();
  const wm = wallMat('#140D06');

  // Floor
  scene.add(mesh(new THREE.PlaneGeometry(W, D), mm, 0, 0, z0 - D/2, -Math.PI/2, 0, 0));

  // Ceiling
  scene.add(mesh(new THREE.PlaneGeometry(W, D),
    new THREE.MeshStandardMaterial({ color: 0x090604, roughness: 1 }),
    0, H, z0 - D/2, Math.PI/2, 0, 0));

  // Walls
  scene.add(mesh(new THREE.PlaneGeometry(D, H), wm, -W/2, H/2, z0 - D/2, 0, Math.PI/2, 0));
  scene.add(mesh(new THREE.PlaneGeometry(D, H), wm,  W/2, H/2, z0 - D/2, 0, -Math.PI/2, 0));
  scene.add(mesh(new THREE.PlaneGeometry(W, H), wm, 0, H/2, z0 - D));

  // Grand Header on back wall
  const cTex = createSignTexture({
    w: 1024, h: 192, bg: '#0F0904', borderColor: '#C9A227',
    title: 'THE PERMANENT COLLECTION', titleSz: 36, titleColor: '#F3D058',
    lines: ['"A Monument to Human Indecision, Confusion & Clutter"'],
    lineSz: 22, textColor: '#BDB19F'
  });
  scene.add(mesh(new THREE.PlaneGeometry(12, 2.2), new THREE.MeshStandardMaterial({ map: cTex, roughness: 0.8 }), 0, 5.2, z0 - D + 0.08));

  // Ceiling Lights
  [-48, -58, -68, -78, -88].forEach(z => { addLight(scene, 0, z, 1.2, 0xFFE09A); });
  [-10, 10].forEach(x => {
    [-52, -66, -80].forEach(z => { addLight(scene, x, z, 0.6, 0xFFE09A); });
  });

  // Pillars
  [-50, -64, -78, -90].forEach(z => {
    addColumn(scene, -12.5, z);
    addColumn(scene,  12.5, z);
  });

  // Easter egg wall signs
  addSign(scene, -13.46, 2.5, -58,  Math.PI/2, 'PHOTOGRAPHY POLICY', ['Taking pictures of these exhibits', 'is technically a waste of storage space.']);
  addSign(scene,  13.46, 2.5, -74, -Math.PI/2, 'AUDIO GUIDE NOTE', ['If you don\'t understand the art,', 'congratulations! You understand it.']);
  addSign(scene,  0, 2.4, z0 - D + 0.08, 0, 'CURATORIAL PHILOSOPHY', ['"Everything matters until you look at it closely."']);
}
