import * as THREE from 'three';
import { createMarbleTexture, createSignTexture } from './textures.js';
import { soundEngine } from './audio.js';

let _statueMarbleMat = null;
export function getStatueMarbleMat() {
  if (!_statueMarbleMat) {
    const tex = createMarbleTexture(512, 512);
    tex.repeat.set(2, 2);
    _statueMarbleMat = new THREE.MeshStandardMaterial({
      map: tex,
      color: 0xF7F2EC,
      roughness: 0.18,
      metalness: 0.04
    });
  }
  return _statueMarbleMat;
}

const goldAccentMat = new THREE.MeshStandardMaterial({ color: 0xD4AA2B, roughness: 0.2, metalness: 0.85 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.1, metalness: 0.9 });
const phoneGlowMat = new THREE.MeshBasicMaterial({ color: 0x66CCFF });

// ─── 10 STATUE DEFINITIONS & ACCURATE CAPTIONS ─────────────
export const STATUE_DATA = [
  {
    id: 's01',
    name: 'The Overthinker',
    pose: 'thinker',
    speechBubble: 'Overthinking since 300 BC.\nStill useless.',
    pedestalTitle: 'DEEP THOUGHTS',
    pedestalSubtitle: 'NO SOLUTIONS',
    position: [-6.5, 0, -10],
    rotationY: 0.45,
    viewPos: [-6.5, 1.7, -7.5],
    viewYaw: 0,
    room: 0,
    description: 'Seated in profound philosophical contemplation with chin on fist. After 2,300 years of overthinking, he has reached zero practical conclusions.',
    interactionQuote: 'THE STATUE HAS NOT MOVED IN 2,347 YEARS.\n\n"Honestly, relatable."'
  },
  {
    id: 's02',
    name: 'The Pointing Guide',
    pose: 'pointing',
    speechBubble: 'Go that way.\nI have absolutely no idea why.',
    pedestalTitle: 'DIRECTIONAL EXPERT',
    pedestalSubtitle: 'ZERO EXPERIENCE',
    position: [7.2, 0, -22],
    rotationY: -0.6,
    viewPos: [7.2, 1.7, -19.5],
    viewYaw: 0,
    room: 0,
    description: 'A tall classical orator dramatically extending an arm to point toward an arbitrary corner. Radiates 100% confidence with 0% navigational knowledge.',
    interactionQuote: 'Pointed with great determination into an empty wall for 18 consecutive centuries.'
  },
  {
    id: 's03',
    name: 'The Phone Addict',
    pose: 'phone',
    speechBubble: 'Waiting for a reply\nsince 300 BC.',
    pedestalTitle: 'THE ORIGINAL',
    pedestalSubtitle: 'LEFT ON READ',
    position: [-7.5, 0, -26],
    rotationY: 0.5,
    viewPos: [-7.5, 1.7, -23.5],
    viewYaw: 0,
    room: 0,
    description: 'Seated with crossed legs and severe text-neck posture, staring into a glowing marble smartphone with zero notifications.',
    interactionQuote: 'Last seen: Today at 300 BC (Double blue ticks).'
  },
  {
    id: 's04',
    name: 'The Lazy Guard',
    pose: 'guard',
    speechBubble: 'Protecting priceless artifacts.\nUnfortunately, there aren\'t any.',
    pedestalTitle: 'ROYAL SECURITY',
    pedestalSubtitle: 'PAID IN EXPOSURE',
    position: [6.8, 0, -4],
    rotationY: -0.4,
    viewPos: [6.8, 1.7, -1.8],
    viewYaw: 0,
    room: 0,
    description: 'Leaning lazily against his spear with Roman centurion helmet and ground-resting shield. Threat level detected: 0.00%.',
    interactionQuote: 'Shift duration: 2,400 years. Incidents handled: 0.'
  },
  {
    id: 's05',
    name: 'The Confused Philosopher',
    pose: 'confused',
    speechBubble: 'I came here to understand something.\nThat was my first mistake.',
    pedestalTitle: 'CONFUSION',
    pedestalSubtitle: 'PERMANENT COLLECTION',
    position: [-7.8, 0, -34],
    rotationY: 0.3,
    viewPos: [-7.8, 1.7, -31.5],
    viewYaw: 0,
    room: 0,
    description: 'Standing with both arms raised in the universal confused shrug. Arrived seeking ultimate truth; found a hall of socks and rocks.',
    interactionQuote: 'Still trying to understand why this museum was granted a cultural heritage license.'
  },
  {
    id: 's06',
    name: 'The Observing Sock Scholar',
    pose: 'observing_sock',
    speechBubble: 'After 2,000 years of philosophy,\nI still can\'t find its other half.',
    pedestalTitle: 'EXAMINING THE SOCK',
    pedestalSubtitle: 'THE SEARCH CONTINUES',
    position: [-10.8, 0, -52],
    rotationY: 0.65,
    viewPos: [-10.8, 1.7, -49.5],
    viewYaw: 0,
    room: 1,
    description: 'Bent deeply forward with hands behind back, peering through a gold magnifying glass to scrutinize Exhibit 001 (The Lonely Sock).',
    interactionQuote: 'He has formulated 14 theories regarding the missing sock. None involve the dryer.'
  },
  {
    id: 's07',
    name: 'The Flexer',
    pose: 'flexing',
    speechBubble: 'Bro has been working out\nfor 2,000 years.',
    pedestalTitle: 'GAINS: HISTORICAL',
    pedestalSubtitle: 'REST DAY: NEVER',
    position: [11.0, 0, -58],
    rotationY: -0.5,
    viewPos: [11.0, 1.7, -55.5],
    viewYaw: 0,
    room: 1,
    description: 'Exaggerated muscular bodybuilder silhouette performing a double-bicep front flex. Has skipped leg day for seventy-three generations.',
    interactionQuote: 'Diet: 100% limestone and pure unearned confidence.'
  },
  {
    id: 's08',
    name: 'The Tired Statuary',
    pose: 'tired',
    speechBubble: 'When your 5-minute break\nbecomes 3 hours.',
    pedestalTitle: 'EXHIBIT 017',
    pedestalSubtitle: 'MOTIVATION \u2014 EXTINCT',
    position: [-11.0, 0, -72],
    rotationY: 0.55,
    viewPos: [-11.0, 1.7, -69.5],
    viewYaw: 0,
    room: 1,
    description: 'Completely slumped sideways against a support column with limp dangling arms, thoroughly exhausted by modern expectations.',
    interactionQuote: 'Energy reserves: 0.00%. Will resume work after one more nap.'
  },
  {
    id: 's09',
    name: 'The Sad Statue',
    pose: 'sad',
    speechBubble: 'Was going to be productive today.',
    pedestalTitle: 'THE PROCRASTINATOR',
    pedestalSubtitle: 'STARTING TOMORROW',
    position: [11.0, 0, -82],
    rotationY: -0.6,
    viewPos: [11.0, 1.7, -79.5],
    viewYaw: 0,
    room: 1,
    description: 'Kneeling on the pedestal with head buried in both hands beside Exhibit 005 (The Procrastination Mug).',
    interactionQuote: 'Currently researching how to start working without actually doing anything.'
  },
  {
    id: 's10',
    name: 'The Sleeping Statue',
    pose: 'sleeping',
    speechBubble: 'Was going to explore the museum.\nMaybe tomorrow.',
    pedestalTitle: 'PRODUCTIVITY',
    pedestalSubtitle: 'COMING SOON\u2122',
    position: [-10.8, 0, -90],
    rotationY: 0.4,
    viewPos: [-10.8, 1.7, -87.5],
    viewYaw: 0,
    room: 1,
    description: 'Reclining horizontally on a marble daybed with a sculpted pillow and eye mask, fully committed to avoiding effort.',
    interactionQuote: 'Do not disturb. He is dreaming of a world where tasks complete themselves.'
  }
];

// ─── 3D SPEECH BUBBLE GENERATOR (Matches Reference Image) ──
function createSpeechBubbleTexture(text) {
  const cv = document.createElement('canvas');
  cv.width = 512;
  cv.height = 256;
  const ctx = cv.getContext('2d');

  ctx.clearRect(0, 0, 512, 256);

  const x = 16, y = 16, w = 480, h = 175, r = 24;
  ctx.fillStyle = 'rgba(12, 8, 4, 0.94)';
  ctx.strokeStyle = '#F3D058';
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  // Pointer tail pointing down to statue head
  ctx.lineTo(x + 130, y + h);
  ctx.lineTo(x + 85, y + h + 45);
  ctx.lineTo(x + 105, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Subtle inner gold pinstripe
  ctx.strokeStyle = 'rgba(243, 208, 88, 0.35)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'italic 500 27px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = text.split('\n');
  const startY = y + (h / 2) - ((lines.length - 1) * 18);
  lines.forEach((l, idx) => {
    ctx.fillText(l, x + w / 2, startY + (idx * 36));
  });

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// ─── 10 VISUALLY DISTINCT SCULPTURE BUILDERS ─────────────────

// 1. OVERTHINKER: Seated, elevated knee, elbow on knee, fist under chin + Pixel Sunglasses
function buildThinkerSculpture(mat) {
  const g = new THREE.Group();
  
  // Seat rock
  const rock = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.7, 0.8), mat);
  rock.position.set(0, 0.35, -0.05);
  g.add(rock);

  // Left Leg (sitting flat)
  const lThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.65, 8), mat);
  lThigh.position.set(-0.25, 0.55, 0.28);
  lThigh.rotation.x = Math.PI / 2.2;
  g.add(lThigh);
  const lCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.6, 8), mat);
  lCalf.position.set(-0.25, 0.28, 0.6);
  g.add(lCalf);

  // Right Leg (elevated knee to support elbow!)
  const rThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.65, 8), mat);
  rThigh.position.set(0.24, 0.8, 0.3);
  rThigh.rotation.x = Math.PI / 3.2;
  g.add(rThigh);
  const rCalf = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.7, 8), mat);
  rCalf.position.set(0.24, 0.45, 0.58);
  g.add(rCalf);

  // Muscular Torso bent forward at 30 degrees
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 1.1, 10), mat);
  torso.position.set(0, 1.25, 0.15);
  torso.rotation.x = Math.PI / 6;
  g.add(torso);

  // Chest / Shoulders
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.45, 0.4), mat);
  chest.position.set(0, 1.62, 0.32);
  chest.rotation.x = Math.PI / 6;
  g.add(chest);

  // Head brooding downward
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat);
  head.position.set(0, 1.98, 0.48);
  head.rotation.x = Math.PI / 5;
  g.add(head);

  // Right arm: elbow resting on raised knee, fist supporting chin
  const rArmUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.08, 0.6, 8), mat);
  rArmUpper.position.set(0.28, 1.45, 0.42);
  rArmUpper.rotation.set(Math.PI / 3, 0, -Math.PI / 8);
  g.add(rArmUpper);

  const rArmFore = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.55, 8), mat);
  rArmFore.position.set(0.16, 1.72, 0.52);
  rArmFore.rotation.set(-Math.PI / 3.5, 0, -Math.PI / 6);
  g.add(rArmFore);

  // Left arm resting on left thigh
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.75, 8), mat);
  lArm.position.set(-0.35, 1.25, 0.3);
  lArm.rotation.set(Math.PI / 5, 0, Math.PI / 8);
  g.add(lArm);

  // Pixel Sunglasses (from reference image!)
  const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.09, 0.06), darkMat);
  glasses.position.set(0, 1.98, 0.69);
  glasses.rotation.x = Math.PI / 5;
  g.add(glasses);

  return g;
}

// 2. POINTING STATUE: Tall Heroic Standing Orator with outstretched pointing arm
function buildPointingSculpture(mat) {
  const g = new THREE.Group();

  // Contrapposto Standing Legs
  const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.12, 1.4, 8), mat);
  lLeg.position.set(-0.2, 0.7, 0);
  g.add(lLeg);

  const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 1.4, 8), mat);
  rLeg.position.set(0.22, 0.7, 0.1);
  rLeg.rotation.z = -0.15;
  g.add(rLeg);

  // Heroic Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 1.2, 10), mat);
  torso.position.set(0, 1.9, 0);
  g.add(torso);

  // Toga sash across chest
  const sash = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.08, 6, 12), mat);
  sash.rotation.set(Math.PI / 3, Math.PI / 4, 0);
  sash.position.set(0, 2.0, 0);
  g.add(sash);

  // Head proudly raised
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 12, 12), mat);
  head.position.set(0, 2.75, 0);
  head.rotation.y = -Math.PI / 5;
  g.add(head);

  // Dramatic Outstretched Pointing Arm (Right)
  const pArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.06, 1.25, 8), mat);
  pArm.position.set(0.68, 2.25, 0.35);
  pArm.rotation.set(Math.PI / 2, 0, -Math.PI / 3.2);
  g.add(pArm);

  // Left arm resting on hip
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.8, 8), mat);
  lArm.position.set(-0.42, 1.9, 0);
  lArm.rotation.set(0, 0, Math.PI / 3.2);
  g.add(lArm);

  return g;
}

// 3. PHONE ADDICT: Seated with crossed legs & texting posture + glowing smartphone
function buildPhoneSculpture(mat) {
  const g = new THREE.Group();

  // Bench plinth
  const bench = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.65, 0.7), mat);
  bench.position.set(0, 0.325, 0);
  g.add(bench);

  // Crossed legs (Right thigh crossed over left knee)
  const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.8, 8), mat);
  lLeg.position.set(-0.2, 0.45, 0.35);
  lLeg.rotation.x = Math.PI / 2.5;
  g.add(lLeg);

  const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.9, 8), mat);
  rLeg.position.set(0.05, 0.65, 0.42);
  rLeg.rotation.set(Math.PI / 2.8, 0, -Math.PI / 5);
  g.add(rLeg);

  // Slouched "text-neck" Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.25, 1.1, 10), mat);
  torso.position.set(0, 1.2, 0.1);
  torso.rotation.x = Math.PI / 5.5;
  g.add(torso);

  // Head tilted heavily down at phone (45 deg)
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat);
  head.position.set(0, 1.85, 0.35);
  head.rotation.x = Math.PI / 3.2;
  g.add(head);

  // Both arms bent holding phone in front of chest
  const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.65, 8), mat);
  rArm.position.set(0.22, 1.45, 0.35);
  rArm.rotation.set(Math.PI / 3, 0, -Math.PI / 4);
  g.add(rArm);

  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.65, 8), mat);
  lArm.position.set(-0.22, 1.45, 0.35);
  lArm.rotation.set(Math.PI / 3, 0, Math.PI / 4);
  g.add(lArm);

  // Glowing Smartphone
  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.03), darkMat);
  phone.position.set(0, 1.5, 0.52);
  phone.rotation.x = -Math.PI / 5;
  g.add(phone);

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.24), phoneGlowMat);
  screen.position.set(0, 1.5, 0.54);
  screen.rotation.x = -Math.PI / 5;
  g.add(screen);

  return g;
}

// 4. LAZY GUARD: Bored Centurion leaning on spear with ground shield & crested helmet
function buildGuardSculpture(mat) {
  const g = new THREE.Group();

  // Wide warrior lower body
  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 1.4, 10), mat);
  legs.position.set(0, 0.7, 0);
  g.add(legs);

  // Broad Torso leaning slightly back/casual
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.3, 1.25, 10), mat);
  torso.position.set(0, 1.9, 0);
  torso.rotation.z = 0.1;
  g.add(torso);

  // Roman Muscle Cuirass
  const armor = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.45), mat);
  armor.position.set(0, 2.05, 0);
  g.add(armor);

  // Head with Roman Centurion Helmet Crest
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), mat);
  head.position.set(0, 2.75, 0);
  head.rotation.z = -0.15; // Bored tilted head
  g.add(head);

  // Transverse Helmet Crest (Galea)
  const crest = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.28, 0.6), new THREE.MeshStandardMaterial({ color: 0x992222, roughness: 0.5 }));
  crest.position.set(0, 3.02, 0);
  g.add(crest);

  // Spear planted casually on ground, tilted lazily
  const spear = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 3.4, 8), goldAccentMat);
  spear.position.set(0.65, 1.6, 0.15);
  spear.rotation.z = 0.12;
  g.add(spear);

  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 8), goldAccentMat);
  tip.position.set(0.85, 3.25, 0.15);
  g.add(tip);

  // Roman Scutum Shield resting on pedestal ground
  const shield = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.3, 0.08), mat);
  shield.position.set(-0.55, 0.9, 0.2);
  shield.rotation.y = Math.PI / 8;
  g.add(shield);

  // Arm resting on top of shield
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.8, 8), mat);
  lArm.position.set(-0.45, 1.95, 0.15);
  lArm.rotation.z = Math.PI / 4;
  g.add(lArm);

  return g;
}

// 5. CONFUSED PHILOSOPHER: Universal "Shrug" with raised palms & tilted head
function buildConfusedSculpture(mat) {
  const g = new THREE.Group();

  // Standing Greek Robes
  const toga = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.48, 1.4, 12), mat);
  toga.position.set(0, 0.7, 0);
  g.add(toga);

  // Upright Torso
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.28, 1.2, 10), mat);
  torso.position.set(0, 1.9, 0);
  g.add(torso);

  // Head tilted with quizzical expression
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), mat);
  head.position.set(0, 2.75, 0);
  head.rotation.set(0, -0.2, 0.28); // Tilted "Huh?" head
  g.add(head);

  // Philosopher's Beard
  const beard = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 8), mat);
  beard.position.set(0, 2.45, 0.2);
  beard.rotation.x = -Math.PI / 8;
  g.add(beard);

  // Both Arms in Exaggerated "Shrug" Pose (Distinct "W" silhouette)
  const lArmUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.55, 8), mat);
  lArmUpper.position.set(-0.45, 2.1, 0);
  lArmUpper.rotation.z = Math.PI / 4;
  g.add(lArmUpper);

  const lArmFore = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.6, 8), mat);
  lArmFore.position.set(-0.7, 2.38, 0.25);
  lArmFore.rotation.set(Math.PI / 3, 0, Math.PI / 3);
  g.add(lArmFore);

  const rArmUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 0.55, 8), mat);
  rArmUpper.position.set(0.45, 2.1, 0);
  rArmUpper.rotation.z = -Math.PI / 4;
  g.add(rArmUpper);

  const rArmFore = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.6, 8), mat);
  rArmFore.position.set(0.7, 2.38, 0.25);
  rArmFore.rotation.set(Math.PI / 3, 0, -Math.PI / 3);
  g.add(rArmFore);

  return g;
}

// 6. FLEXER: Massive V-Taper, Double-Bicep Bodybuilder Flex
function buildFlexerSculpture(mat) {
  const g = new THREE.Group();

  // Muscular Quad Legs in wide bodybuilding stance
  const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 1.4, 8), mat);
  lLeg.position.set(-0.32, 0.7, 0);
  lLeg.rotation.z = 0.15;
  g.add(lLeg);

  const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 1.4, 8), mat);
  rLeg.position.set(0.32, 0.7, 0);
  rLeg.rotation.z = -0.15;
  g.add(rLeg);

  // Massive V-Taper Muscular Torso (Wide Lats & Shoulders)
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.28, 1.25, 10), mat);
  torso.position.set(0, 1.9, 0);
  g.add(torso);

  const pecs = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.45, 0.48), mat);
  pecs.position.set(0, 2.2, 0.08);
  g.add(pecs);

  // Head with proud grin
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), mat);
  head.position.set(0, 2.82, 0);
  g.add(head);

  // Double Bicep Flex: Both arms raised high, biceps peaked
  // Left Flex
  const lBicep = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.65, 8), mat);
  lBicep.position.set(-0.62, 2.45, 0);
  lBicep.rotation.z = Math.PI / 2.4;
  g.add(lBicep);

  const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.6, 8), mat);
  lForearm.position.set(-0.72, 2.9, 0.1);
  lForearm.rotation.z = -Math.PI / 3;
  g.add(lForearm);

  // Right Flex
  const rBicep = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.65, 8), mat);
  rBicep.position.set(0.62, 2.45, 0);
  rBicep.rotation.z = -Math.PI / 2.4;
  g.add(rBicep);

  const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.6, 8), mat);
  rForearm.position.set(0.72, 2.9, 0.1);
  rForearm.rotation.z = Math.PI / 3;
  g.add(rForearm);

  return g;
}

// 7. TIRED STATUE: Asymmetrical slump against column with limp dangling arms
function buildTiredSculpture(mat) {
  const g = new THREE.Group();

  // Support pillar to lean against
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 2.6, 12), mat);
  pillar.position.set(-0.65, 1.3, 0);
  g.add(pillar);

  // Buckled, tired legs
  const legs = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 1.3, 10), mat);
  legs.position.set(0, 0.65, 0);
  legs.rotation.z = 0.15;
  g.add(legs);

  // Slumped Torso leaning heavily against left pillar
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.26, 1.15, 10), mat);
  torso.position.set(-0.2, 1.75, 0);
  torso.rotation.z = 0.28;
  g.add(torso);

  // Head resting sideways against the pillar
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat);
  head.position.set(-0.45, 2.45, 0);
  head.rotation.z = 0.35;
  g.add(head);

  // Limply dangling arms (zero energy)
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 1.0, 8), mat);
  lArm.position.set(-0.55, 1.6, 0.1);
  g.add(lArm);

  const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 1.0, 8), mat);
  rArm.position.set(0.12, 1.5, 0.1);
  rArm.rotation.z = -0.15;
  g.add(rArm);

  return g;
}

// 8. SAD STATUE: Kneeling with head buried in both hands (Emotional Procrastinator)
function buildSadSculpture(mat) {
  const g = new THREE.Group();

  // Low Kneeling Base / Pooled Toga Drapery
  const drape = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.8, 0.45, 12), mat);
  drape.position.set(0, 0.225, 0);
  g.add(drape);

  // Folded Thighs / Knees
  const knees = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.6), mat);
  knees.position.set(0, 0.45, 0.15);
  g.add(knees);

  // Torso curled tightly forward in despair
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.25, 1.0, 10), mat);
  torso.position.set(0, 1.05, 0.22);
  torso.rotation.x = Math.PI / 3.5;
  g.add(torso);

  // Head buried deep in hands
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat);
  head.position.set(0, 1.48, 0.52);
  head.rotation.x = Math.PI / 2.5;
  g.add(head);

  // Both arms covering face / holding head
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.65, 8), mat);
  lArm.position.set(-0.2, 1.35, 0.48);
  lArm.rotation.set(Math.PI / 4, 0, Math.PI / 4);
  g.add(lArm);

  const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.65, 8), mat);
  rArm.position.set(0.2, 1.35, 0.48);
  rArm.rotation.set(Math.PI / 4, 0, -Math.PI / 4);
  g.add(rArm);

  return g;
}

// 9. OBSERVING SOCK: Deep Forward Lunge peering through Magnifying Glass
function buildObservingSockSculpture(mat) {
  const g = new THREE.Group();

  // Stepping Stance (one leg back, one leg forward)
  const fLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 1.3, 8), mat);
  fLeg.position.set(-0.15, 0.65, 0.2);
  fLeg.rotation.x = -Math.PI / 10;
  g.add(fLeg);

  const bLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.11, 1.3, 8), mat);
  bLeg.position.set(0.25, 0.65, -0.2);
  bLeg.rotation.x = Math.PI / 8;
  g.add(bLeg);

  // Torso bent forward at severe 50 degree cantilever
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.26, 1.15, 10), mat);
  torso.position.set(0, 1.6, 0.35);
  torso.rotation.x = Math.PI / 3.4;
  g.add(torso);

  // Head thrust forward intently looking down
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 12, 12), mat);
  head.position.set(0, 1.95, 0.78);
  head.rotation.x = Math.PI / 3;
  g.add(head);

  // Right arm extended forward holding gold magnifying glass
  const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.7, 8), mat);
  rArm.position.set(0.22, 1.75, 0.85);
  rArm.rotation.set(Math.PI / 2.8, 0, -Math.PI / 8);
  g.add(rArm);

  // Gold Magnifying Glass Lens & Rim
  const glassRim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.02, 8, 16), goldAccentMat);
  glassRim.position.set(0.18, 1.7, 1.25);
  glassRim.rotation.x = Math.PI / 4;
  g.add(glassRim);

  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 6), goldAccentMat);
  handle.position.set(0.24, 1.55, 1.15);
  handle.rotation.x = Math.PI / 4;
  g.add(handle);

  // Left arm tucked politely behind back (Curator posture)
  const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.7, 8), mat);
  lArm.position.set(-0.25, 1.5, 0.15);
  lArm.rotation.set(-Math.PI / 4, 0, Math.PI / 5);
  g.add(lArm);

  return g;
}

// 10. SLEEPING STATUE: Reclining Horizontally on a Marble Daybed with Sleep Mask
function buildSleepingSculpture(mat) {
  const g = new THREE.Group();

  // Long Marble Daybed / Couch
  const daybed = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.55, 0.9), mat);
  daybed.position.set(0, 0.275, 0);
  g.add(daybed);

  // Sculpted Pillow Cushion on Left
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.22, 0.7), mat);
  pillow.position.set(-0.65, 0.65, 0);
  g.add(pillow);

  // Reclining Torso lying horizontally
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.24, 1.0, 10), mat);
  torso.position.set(-0.1, 0.75, 0);
  torso.rotation.z = Math.PI / 2;
  g.add(torso);

  // Head resting on pillow
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), mat);
  head.position.set(-0.68, 0.85, 0);
  head.rotation.set(0, 0, 0.2);
  g.add(head);

  // Sleep Mask over eyes
  const mask = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.28), new THREE.MeshStandardMaterial({ color: 0x992222, roughness: 0.6 }));
  mask.position.set(-0.68, 0.9, 0.08);
  g.add(mask);

  // Legs stretched out horizontally under blanket
  const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.75), mat);
  blanket.position.set(0.45, 0.72, 0);
  g.add(blanket);

  // Relaxed arm draped across stomach
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.06, 0.65, 8), mat);
  arm.position.set(-0.1, 0.92, 0.2);
  arm.rotation.set(0, 0, Math.PI / 2.2);
  g.add(arm);

  return g;
}

const STATUE_BUILDERS = {
  thinker: buildThinkerSculpture,
  pointing: buildPointingSculpture,
  phone: buildPhoneSculpture,
  guard: buildGuardSculpture,
  confused: buildConfusedSculpture,
  flexing: buildFlexerSculpture,
  tired: buildTiredSculpture,
  sad: buildSadSculpture,
  observing_sock: buildObservingSockSculpture,
  sleeping: buildSleepingSculpture
};

// ─── BUILD COMPLETE STATUE WITH PEDESTAL & DEDICATED LIGHTING ──
export function buildStatue(scene, sData) {
  const group = new THREE.Group();
  group.position.set(sData.position[0], 0, sData.position[2]);
  group.rotation.y = sData.rotationY || 0;

  const mat = getStatueMarbleMat();
  const isSleeping = sData.pose === 'sleeping';

  // 1. Classical Tiered Pedestal (Wider base for sleeping daybed statue)
  const pedW = isSleeping ? 2.4 : 1.6;
  const pedD = isSleeping ? 1.4 : 1.6;

  const basePlinth = new THREE.Mesh(new THREE.BoxGeometry(pedW, 0.25, pedD), mat);
  basePlinth.position.y = 0.125;
  group.add(basePlinth);

  const pedShaft = new THREE.Mesh(new THREE.BoxGeometry(pedW - 0.25, 1.2, pedD - 0.25), mat);
  pedShaft.position.y = 0.85;
  group.add(pedShaft);

  const capMolding = new THREE.Mesh(new THREE.BoxGeometry(pedW - 0.1, 0.18, pedD - 0.1), mat);
  capMolding.position.y = 1.54;
  group.add(capMolding);

  // Gold Trim Ring
  const goldTrim = new THREE.Mesh(new THREE.BoxGeometry(pedW - 0.08, 0.04, pedD - 0.08), goldAccentMat);
  goldTrim.position.y = 1.45;
  group.add(goldTrim);

  // 2. Engraved Classical Plaque on Pedestal
  const plTex = createSignTexture({
    w: 512, h: 256,
    bg: '#181008',
    borderColor: '#C9A227',
    title: sData.pedestalTitle,
    titleSz: 28,
    titleColor: '#F3D058',
    lines: [sData.pedestalSubtitle],
    lineSz: 20,
    textColor: '#EDE4D4'
  });
  const plaque = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.6),
    new THREE.MeshStandardMaterial({ map: plTex, roughness: 0.7 })
  );
  plaque.position.set(0, 0.85, (pedD - 0.25) / 2 + 0.02);
  group.add(plaque);

  // 3. Unique Sculptured Body
  const builder = STATUE_BUILDERS[sData.pose] || buildThinkerSculpture;
  const sculpture = builder(mat);
  sculpture.position.y = 1.63;
  group.add(sculpture);

  // 4. Floating Classical Speech Bubble (As in Reference Image!)
  const bubbleTex = createSpeechBubbleTexture(sData.speechBubble);
  const bubble = new THREE.Mesh(
    new THREE.PlaneGeometry(2.3, 1.15),
    new THREE.MeshStandardMaterial({ map: bubbleTex, transparent: true, roughness: 0.5, side: THREE.DoubleSide })
  );
  bubble.position.set(0.55, isSleeping ? 3.6 : 4.9, 0.2);
  group.add(bubble);
  group.userData.speechBubbleMesh = bubble;

  // 5. Dedicated Dramatic Spotlight (Warm Key Lighting)
  const spot = new THREE.SpotLight(0xFFE4A0, 4.8, 10, Math.PI / 4.5, 0.45, 1.2);
  spot.position.set(sData.position[0], 7.4, sData.position[2]);
  spot.target.position.set(sData.position[0], 2.8, sData.position[2]);
  scene.add(spot);
  scene.add(spot.target);

  // 6. Interactive Click Hit Mesh
  const hitMesh = new THREE.Mesh(
    new THREE.BoxGeometry(pedW + 0.3, isSleeping ? 3.2 : 4.8, pedD + 0.3),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitMesh.position.set(sData.position[0], isSleeping ? 1.6 : 2.4, sData.position[2]);
  hitMesh.userData.isStatue = true;
  hitMesh.userData.statueData = sData;
  hitMesh.userData.statueGroup = group;
  scene.add(hitMesh);

  scene.add(group);

  return { hitMesh, group, bubble };
}

// ─── BUILD ALL 10 STATUES ──────────────────────────────────
export function buildAllStatues(scene) {
  const hitMeshes = [];
  const speechBubbles = [];

  STATUE_DATA.forEach(sData => {
    const res = buildStatue(scene, sData);
    hitMeshes.push(res.hitMesh);
    if (res.bubble) speechBubbles.push(res.bubble);
  });

  return { hitMeshes, speechBubbles };
}

export function updateSpeechBubbles(bubbles, time) {
  bubbles.forEach((b, i) => {
    b.position.y += Math.sin(time * 1.5 + i) * 0.0015;
  });
}
