import * as THREE from 'three';
import { createWoodTexture, createSignTexture } from './textures.js';

export const EXHIBIT_DATA = [
  {
    id: '001',
    name: 'The Lonely Sock',
    stats: { Material: 'Synthetic Cotton', Origin: 'Laundromat Dryer #4', 'Paired With': 'Missing Since 2019', Value: 'Priceless / Worthless' },
    uselessness: 97.5,
    description: 'Once part of a proud matrimonial pair. Its companion escaped into the fourth dimension during a standard gentle wash cycle. It waits in solemn hope.',
    position: [-8.5, 0, -52], type: 'sock', color: 0x2A6BE0,
    viewPos: [-8.5, 1.6, -49.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '002',
    name: 'The Inverted Umbrella',
    stats: { Material: 'Bento Metal & Polyester', 'Failed In': '0.5 mph Breeze', Condition: 'Inside-Out', 'Rain Protection': '0.00%' },
    uselessness: 98.8,
    description: 'Engineered to withstand monsoon tempests, this delicate specimen folded backward upon greeting a mild British mist. Now functions exclusively as a birdbath.',
    position: [0, 0, -52], type: 'umbrella', color: 0x992222,
    viewPos: [0, 1.6, -49.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '003',
    name: 'The Mystery Cable',
    stats: { Connectors: 'Proprietary / Unknown', Length: '1.2m of Chaos', Compatibility: 'None Known to Science', Status: 'Kept "Just In Case"' },
    uselessness: 95.0,
    description: 'Nobody remembers what device this connected to. Everyone refuses to dispose of it in case that ancient machine suddenly re-emerges from the attic.',
    position: [8.5, 0, -52], type: 'cable', color: 0x222222,
    viewPos: [8.5, 1.6, -49.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '004',
    name: 'The Quantum USB Drive',
    stats: { Capacity: '128MB (Pre-loaded)', Plug_Attempts: 'Always 3', State: 'Superposition', Frustration: '100%' },
    uselessness: 93.4,
    description: 'A masterpiece of theoretical physics. Regardless of initial orientation, it must be flipped twice before fitting into any USB port.',
    position: [-8.5, 0, -66], type: 'usb', color: 0xC0C0C0,
    viewPos: [-8.5, 1.6, -63.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '005',
    name: 'The Procrastination Mug',
    stats: { Material: 'Stained Ceramic', Inscription: '"World\'s Best Planner"', 'Last Used': 'To Avoid Work', Coffee_Rings: '14 Layers' },
    uselessness: 91.2,
    description: 'Originally purchased to supercharge productivity. Currently serves as an emotional support vessel while staring blankly into empty Google Docs.',
    position: [0, 0, -66], type: 'mug', color: 0xD94A26,
    viewPos: [0, 1.6, -63.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '006',
    name: 'The Dead Ballpoint Pen',
    stats: { Ink_Level: '98% Remaining', Ink_Flow: '0.00%', Last_Worked: 'Inside The Store', Cause_of_Death: 'Signing Important Doc' },
    uselessness: 96.7,
    description: 'Filled to the brim with dark ink, yet resolutely scratches dry gouges into paper whenever something genuinely urgent requires a signature.',
    position: [8.5, 0, -66], type: 'pen', color: 0x1A2035,
    viewPos: [8.5, 1.6, -63.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '007',
    name: 'The Motivational Poster',
    stats: { Slogan: '"HANG IN THERE"', Years_Hung: '7 Years', People_Motivated: '0', Dust_Collected: '4.2 kg' },
    uselessness: 89.9,
    description: 'A majestic framed depiction of a kitten clinging to a branch. Has witnessed 1,400 existential crises without offering any practical solutions.',
    position: [-8.5, 0, -80], type: 'poster', color: 0xE6B800,
    viewPos: [-8.5, 1.6, -77.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '008',
    name: 'The Random Pet Rock',
    stats: { Age: '450 Million Years', Actions_Taken: 'None', Diet: 'Dust & Sunlight', Energy_Output: '0.00 W' },
    uselessness: 99.9,
    description: 'A genuine geological marvel. It has achieved total enlightenment by doing absolutely nothing for nearly half a billion consecutive years.',
    position: [0, 0, -80], type: 'rock', color: 0x888278,
    viewPos: [0, 1.6, -77.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '009',
    name: 'The Expired Coupon (10% Off)',
    stats: { Discount: '10% (Max $2)', Expired: 'August 14, 2011', Store_Status: 'Bankrupt (2012)', Emotional_Value: 'Deep Regret' },
    uselessness: 98.1,
    description: 'Discovered in a wallet during a 2024 decluttering. The discount could have saved $1.40 on artisanal mustard over a decade ago.',
    position: [8.5, 0, -80], type: 'coupon', color: 0x44AA66,
    viewPos: [8.5, 1.6, -77.2], viewYaw: 0, viewPitch: -0.05
  },
  {
    id: '010',
    name: 'The Untapped Bubble Wrap',
    stats: { Total_Bubbles: '100', Popped: '99', Remaining: '1 Pristine Bubble', Psychological_Tension: 'Maximum' },
    uselessness: 94.8,
    description: 'A single, tense, unpopped bubble surviving amidst the wreckage of ninety-nine vanquished peers. The urge to pop it is almost unbearable.',
    position: [0, 0, -92], type: 'bubblewrap', color: 0x88CCEE,
    viewPos: [0, 1.6, -89.2], viewYaw: 0, viewPitch: -0.05
  }
];

// ─── 3D Object Creators (Large scale & High Detail) ───────────
function makeSock(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.8 });
  const mat2 = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.8 });
  const mat3 = new THREE.MeshStandardMaterial({ color: 0xFFAA22, roughness: 0.8 });

  // Main Leg & Foot (Capsule)
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.6, 8, 16), mat);
  body.rotation.z = Math.PI / 3.4;
  g.add(body);

  // Striped Cuff
  const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 0.22, 16), mat2);
  cuff.position.set(-0.24, 0.38, 0);
  cuff.rotation.z = Math.PI / 3.4;
  g.add(cuff);

  // Toe Cap (Golden Yellow accent)
  const toe = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), mat3);
  toe.position.set(0.32, -0.32, 0);
  toe.scale.set(1, 0.8, 1);
  g.add(toe);

  // Heel patch
  const heel = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), mat3);
  heel.position.set(0.08, -0.28, 0);
  g.add(heel);

  return g;
}

function makeUmbrella(color) {
  const g = new THREE.Group();
  const canMat = new THREE.MeshStandardMaterial({ color, roughness: 0.45, side: THREE.DoubleSide });
  
  // Broken inverted canopy (flipped cone)
  const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.5, 16, 1, true), canMat);
  canopy.rotation.x = Math.PI;
  canopy.position.y = 0.26;
  g.add(canopy);

  // Warped metal spokes
  const ribMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, metalness: 0.8, roughness: 0.2 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.75, 6), ribMat);
    rib.rotation.z = Math.PI / 2.3;
    rib.rotation.y = a;
    rib.position.set(Math.cos(a) * 0.35, 0.22, Math.sin(a) * 0.35);
    g.add(rib);
  }

  // Handle shaft & J-hook
  const hMat = new THREE.MeshStandardMaterial({ color: 0x3D2412, roughness: 0.6 });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8), hMat);
  shaft.position.y = -0.35;
  g.add(shaft);

  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 12, Math.PI), hMat);
  hook.position.set(0.07, -0.75, 0);
  g.add(hook);

  return g;
}

function makeCable(color) {
  const g = new THREE.Group();
  // Complex Tangled Knot
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.36, 0.065, 120, 12, 2, 3),
    new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.6, metalness: 0.3 })
  );
  g.add(knot);

  // USB and AUX plug dangling
  const plugMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.85, roughness: 0.2 });
  const goldPinMat = new THREE.MeshStandardMaterial({ color: 0xD4AA2B, metalness: 0.9, roughness: 0.1 });
  
  const usb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.22, 0.07), plugMat);
  usb.position.set(0.45, -0.35, 0.1);
  g.add(usb);

  const aux = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.25, 8), goldPinMat);
  aux.position.set(-0.45, -0.32, -0.1);
  g.add(aux);

  return g;
}

function makeUSB(color) {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0xD0D0D0, metalness: 0.9, roughness: 0.15 });

  // Body
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.55, 0.12), bodyMat);
  body.rotation.z = Math.PI / 4;
  g.add(body);

  // USB Metal Tip
  const tip = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.26, 0.08), metalMat);
  tip.rotation.z = Math.PI / 4;
  tip.position.set(0.28, -0.28, 0);
  g.add(tip);

  // Keyring loop
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 12), metalMat);
  loop.position.set(-0.3, 0.3, 0);
  g.add(loop);

  return g;
}

function makeMug(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.35 });

  // Outer Mug Cup
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.27, 0.68, 24, 1, true), mat);
  g.add(cup);

  // Bottom
  const bot = new THREE.Mesh(new THREE.CircleGeometry(0.27, 24), mat);
  bot.rotation.x = -Math.PI / 2;
  bot.position.y = -0.34;
  g.add(bot);

  // Handle
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.05, 10, 16, Math.PI), mat);
  handle.rotation.y = Math.PI / 2;
  handle.position.set(0.42, 0, 0);
  g.add(handle);

  // Cold coffee puddle inside
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.29, 20), new THREE.MeshStandardMaterial({ color: 0x200D04, roughness: 0.1 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.22;
  g.add(coffee);

  return g;
}

function makePen(color) {
  const g = new THREE.Group();
  const bMat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.4 });
  const sMat = new THREE.MeshStandardMaterial({ color: 0xD8D8D8, metalness: 0.9, roughness: 0.1 });

  // Long Barrel
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.0, 12), bMat);
  barrel.rotation.z = Math.PI / 6;
  g.add(barrel);

  // Silver Tip
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.16, 12), sMat);
  tip.rotation.z = Math.PI / 6;
  tip.position.set(0.52, -0.58, 0);
  g.add(tip);

  // Pocket Clip
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.6, 0.025), sMat);
  clip.rotation.z = Math.PI / 6;
  clip.position.set(0.08, 0.16, 0);
  g.add(clip);

  // Broken spring sticking out of top
  const spring = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.04, 0.01, 40, 6, 4, 1),
    new THREE.MeshStandardMaterial({ color: 0xAAAAAA, metalness: 0.9 })
  );
  spring.position.set(-0.52, 0.58, 0);
  g.add(spring);

  return g;
}

function makePoster(color) {
  const g = new THREE.Group();
  const cv = document.createElement('canvas');
  cv.width = 300; cv.height = 400;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#FFF8E7'; ctx.fillRect(0, 0, 300, 400);
  ctx.strokeStyle = '#C9A227'; ctx.lineWidth = 10; ctx.strokeRect(10, 10, 280, 380);
  
  // Sloth hanging clipart
  ctx.fillStyle = '#8B6B43';
  ctx.beginPath(); ctx.arc(150, 180, 50, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#5A4225';
  ctx.fillRect(80, 130, 140, 16); // tree branch
  
  ctx.fillStyle = '#2A1808'; ctx.font = 'bold 30px Georgia'; ctx.textAlign = 'center';
  ctx.fillText('HANG IN', 150, 300);
  ctx.fillText('THERE', 150, 340);
  
  const tex = new THREE.CanvasTexture(cv);
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.05),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, side: THREE.DoubleSide }));
  paper.position.y = 0.05;
  g.add(paper);

  // Gold luxury frame
  const fMat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.8 });
  const fH = new THREE.BoxGeometry(0.88, 0.06, 0.05);
  const fV = new THREE.BoxGeometry(0.06, 1.15, 0.05);
  
  const t = new THREE.Mesh(fH, fMat); t.position.y =  0.58; g.add(t);
  const b = new THREE.Mesh(fH, fMat); b.position.y = -0.48; g.add(b);
  const l = new THREE.Mesh(fV, fMat); l.position.x = -0.44; l.position.y = 0.05; g.add(l);
  const r = new THREE.Mesh(fV, fMat); r.position.x =  0.44; r.position.y = 0.05; g.add(r);

  return g;
}

function makeRock(color) {
  const geo = new THREE.IcosahedronGeometry(0.5, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.16);
    pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.16);
    pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.16);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  const g = new THREE.Group();
  const rock = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.98 }));
  g.add(rock);

  // Gold plaque on rock
  const pl = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.04),
    new THREE.MeshStandardMaterial({ color: 0xD4AA2B, metalness: 0.9, roughness: 0.2 }));
  pl.position.set(0, -0.1, 0.48);
  g.add(pl);

  return g;
}

function makeCoupon(color) {
  const g = new THREE.Group();
  const cv = document.createElement('canvas');
  cv.width = 320; cv.height = 180;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#E8F5E9'; ctx.fillRect(0, 0, 320, 180);
  ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 4; ctx.setLineDash([8, 6]);
  ctx.strokeRect(8, 8, 304, 164);
  
  ctx.fillStyle = '#C62828'; ctx.font = 'bold 36px Arial'; ctx.textAlign = 'center';
  ctx.fillText('10% OFF', 160, 60);
  ctx.fillStyle = '#2E7D32'; ctx.font = 'bold 16px Arial';
  ctx.fillText('ANY PURCHASE OVER $50', 160, 95);
  ctx.fillStyle = '#B71C1C'; ctx.font = 'italic bold 18px Arial';
  ctx.fillText('EXPIRED: AUG 14, 2011', 160, 135);

  const tex = new THREE.CanvasTexture(cv);
  const coupon = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.58),
    new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7, side: THREE.DoubleSide }));
  coupon.rotation.y = Math.PI / 8;
  g.add(coupon);

  return g;
}

function makeBubbleWrap(color) {
  const g = new THREE.Group();
  const sheetMat = new THREE.MeshStandardMaterial({ color: 0xAADEFF, transparent: true, opacity: 0.5, roughness: 0.2 });
  const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.02, 0.9), sheetMat);
  g.add(sheet);

  // Popped flat rings
  const poppedMat = new THREE.MeshStandardMaterial({ color: 0x6699AA, roughness: 0.5 });
  for (let x = -3; x <= 3; x++) {
    for (let z = -3; z <= 3; z++) {
      if (x === 0 && z === 0) continue; // Center is unpopped!
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.015, 6, 12), poppedMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(x * 0.12, 0.02, z * 0.12);
      g.add(ring);
    }
  }

  // ONE UNPOPPED GLORIOUS BUBBLE
  const intactMat = new THREE.MeshStandardMaterial({
    color: 0xEEFFFF, transparent: true, opacity: 0.85,
    roughness: 0.05, metalness: 0.3
  });
  const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), intactMat);
  bubble.position.set(0, 0.07, 0);
  g.add(bubble);

  return g;
}

const MAKERS = {
  sock: makeSock, umbrella: makeUmbrella, cable: makeCable,
  usb: makeUSB, mug: makeMug, pen: makePen,
  poster: makePoster, rock: makeRock, coupon: makeCoupon, bubblewrap: makeBubbleWrap
};

// ─── Display Case Builder (Ultra Crystal Clear & Highly Lit) ───
export function buildDisplayCase(scene, exhibit) {
  const [px, , pz] = exhibit.position;
  const group = new THREE.Group();

  // 1. Rich Wood Pedestal
  const woodTex = createWoodTexture();
  const pedMat = new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.65 });
  const ped = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), pedMat);
  ped.position.set(px, 0.6, pz);
  scene.add(ped);

  // 2. Polished Gold Base Trim & Pedestal Cap
  const gm = new THREE.MeshStandardMaterial({ color: 0xD4AA2B, roughness: 0.18, metalness: 0.85 });
  const trim = new THREE.Mesh(new THREE.BoxGeometry(1.64, 0.08, 1.64), gm);
  trim.position.set(px, 1.22, pz);
  scene.add(trim);

  // 3. Ultra Crystal Clear Glass Case (Very high visibility!)
  const glassGeo = new THREE.BoxGeometry(1.35, 1.65, 1.35);
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xF2F8FF, transparent: true, opacity: 0.06,
    roughness: 0.0, metalness: 0.0, side: THREE.DoubleSide
  });
  const glassBox = new THREE.Mesh(glassGeo, glassMat);
  glassBox.position.set(px, 2.06, pz);
  scene.add(glassBox);

  // 4. Gold Corner Posts
  const edgeGeo = new THREE.BoxGeometry(0.045, 1.68, 0.045);
  [[-0.675, -0.675], [-0.675, 0.675], [0.675, -0.675], [0.675, 0.675]].forEach(c => {
    const e = new THREE.Mesh(edgeGeo, gm);
    e.position.set(px + c[0], 2.06, pz + c[1]);
    scene.add(e);
  });

  // 5. Gold Top Plate
  const topPlate = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 1.4), gm);
  topPlate.position.set(px, 2.9, pz);
  scene.add(topPlate);

  // 6. Exhibit 3D Object (Rotates slowly in animate loop)
  const maker = MAKERS[exhibit.type];
  let obj3D = null;
  if (maker) {
    obj3D = maker(exhibit.color);
    obj3D.position.set(px, 1.9, pz);
    scene.add(obj3D);
    group.userData.rotatingObject = obj3D;
  }

  // 7. Museum Plaque with Gold Inscription
  const plTex = createSignTexture({
    w: 512, h: 128, bg: '#160E05', borderColor: '#C9A227',
    title: 'EXHIBIT ' + exhibit.id, titleSz: 22, titleColor: '#F3D058',
    lines: [exhibit.name], lineSz: 18, textColor: '#FFFFFF'
  });
  const plaque = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.35, 0.08),
    new THREE.MeshStandardMaterial({ map: plTex, roughness: 0.7 })
  );
  plaque.position.set(px, 0.72, pz + 0.82);
  scene.add(plaque);

  // 8. Dedicated Dual Spotlights (Warm Main + Cool Rim Light)
  const spotMain = new THREE.SpotLight(0xFFE8B0, 5.5, 9, Math.PI / 5, 0.45, 1.2);
  spotMain.position.set(px, 7.2, pz);
  spotMain.target.position.set(px, 1.9, pz);
  scene.add(spotMain);
  scene.add(spotMain.target);

  const fillLight = new THREE.PointLight(0xFFDDAA, 1.6, 4, 1.8);
  fillLight.position.set(px, 3.2, pz);
  scene.add(fillLight);

  // 9. Interactive Click Hit-Box
  const hitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 3.0, 1.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.set(px, 1.5, pz);
  hitMesh.userData.exhibitData = exhibit;
  hitMesh.userData.caseGroup = group;
  scene.add(hitMesh);

  return { hitMesh, obj3D };
}

export function buildExhibits(scene) {
  const hitMeshes = [];
  const rotatingObjects = [];
  EXHIBIT_DATA.forEach(exhibit => {
    const res = buildDisplayCase(scene, exhibit);
    hitMeshes.push(res.hitMesh);
    if (res.obj3D) rotatingObjects.push(res.obj3D);
  });
  return { hitMeshes, rotatingObjects };
}
