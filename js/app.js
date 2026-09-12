import * as THREE from 'three';
import { buildEntryHall, buildCollection } from './museum.js';
import { buildExhibits } from './exhibits.js';
import { buildAllStatues, updateSpeechBubbles } from './statues.js';
import { Controls, VIEWPOINTS } from './controls.js';
import { buildHotspots, updateHotspots } from './hotspots.js';
import { UI } from './ui.js';

// ─── Landing Dust Particles ──────────────────────────────
(function spawnDust() {
  const container = document.getElementById('dust-container');
  if (!container) return;
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    p.className = 'dust-particle';
    const sz = 1.2 + Math.random() * 2.2;
    p.style.width  = sz + 'px';
    p.style.height = sz + 'px';
    p.style.left   = Math.random() * 100 + 'vw';
    p.style.animationDuration = (10 + Math.random() * 22) + 's';
    p.style.animationDelay    = -(Math.random() * 30) + 's';
    container.appendChild(p);
  }
})();

// ─── Enter Museum Button ─────────────────────────────────
let museumStarted = false;
document.getElementById('enter-btn').addEventListener('click', () => {
  if (museumStarted) return;
  museumStarted = true;

  const landingEl = document.getElementById('landing');
  const museumEl  = document.getElementById('museum-container');
  const loadingEl = document.getElementById('museum-loading');
  const loadFill  = document.getElementById('loading-fill');

  museumEl.style.display = 'block';
  museumEl.style.opacity = '0';

  gsap.to(landingEl, {
    opacity: 0, duration: 1.2, ease: 'power2.inOut',
    onComplete: () => {
      landingEl.style.display = 'none';
      gsap.to(museumEl, { opacity: 1, duration: 0.8 });

      try {
        initMuseum();
      } catch (err) {
        console.error('Museum initialization error:', err);
      }

      let prog = 0;
      const iv = setInterval(() => {
        prog += 12 + Math.random() * 18;
        loadFill.style.width = Math.min(prog, 100) + '%';
        if (prog >= 100) {
          clearInterval(iv);
          setTimeout(() => {
            gsap.to(loadingEl, {
              opacity: 0, duration: 0.8,
              onComplete: () => { loadingEl.style.display = 'none'; }
            });
          }, 350);
        }
      }, 90);
    }
  });
});

// ─── Core 3D Museum Engine ───────────────────────────────
function initMuseum() {
  const canvas = document.getElementById('museum-canvas');

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Scene & Fog
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x090604);
  scene.fog = new THREE.FogExp2(0x090604, 0.010);

  // Camera
  const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.1, 250);

  // Lighting
  scene.add(new THREE.AmbientLight(0x24160A, 0.8));
  const fill = new THREE.DirectionalLight(0xFFE8C8, 0.2);
  fill.position.set(0, 6, 6);
  scene.add(fill);

  // Build 3D Environments
  buildEntryHall(scene);
  buildCollection(scene);

  const { hitMeshes, rotatingObjects } = buildExhibits(scene);
  const { hitMeshes: statueHits, speechBubbles } = buildAllStatues(scene);
  const hotspots = buildHotspots(scene);

  // Controls & UI
  const controls = new Controls(camera, renderer);
  const ui = new UI(controls);

  controls.onNavigate((vp, isCloseUp) => {
    ui.updateNav(vp, isCloseUp);
    if (!isCloseUp) {
      ui.hidePanel();
      ui.hideStatueModal();
    }
  });
  ui.updateNav(VIEWPOINTS[0], false);

  // Nav buttons
  document.getElementById('btn-next').addEventListener('click', () => controls.next());
  document.getElementById('btn-prev').addEventListener('click', () => controls.prev());

  // Raycaster & Object Interactivity
  const raycaster = new THREE.Raycaster();
  const mouse2D   = new THREE.Vector2();
  let hoveredMesh = null;

  function getMouseNDC(e) {
    const rect = canvas.getBoundingClientRect();
    mouse2D.x = ((e.clientX - rect.left) / rect.width)  *  2 - 1;
    mouse2D.y = ((e.clientY - rect.top)  / rect.height) * -2 + 1;
  }

  // Find all interactive targets
  function getInteractiveTargets() {
    const targets = [...hitMeshes, ...statueHits, ...hotspots];
    scene.traverse(child => {
      if (child.userData.isServiceBell || child.userData.isComplaintsBox || child.userData.isLaserGrid) {
        targets.push(child);
      }
    });
    return targets;
  }

  canvas.addEventListener('mousemove', e => {
    getMouseNDC(e);
    raycaster.setFromCamera(mouse2D, camera);
    const hits = raycaster.intersectObjects(getInteractiveTargets());
    const hit  = hits.length ? hits[0].object : null;

    if (hit !== hoveredMesh) {
      if (hoveredMesh && hoveredMesh.userData.hotspot) {
        hoveredMesh.material.emissiveIntensity = 0.8;
      }
      hoveredMesh = hit;
      if (hoveredMesh) {
        canvas.style.cursor = 'pointer';
        if (hoveredMesh.userData.hotspot) hoveredMesh.material.emissiveIntensity = 2.0;
      } else {
        canvas.style.cursor = 'grab';
      }
    }
  });

  let startX = 0, startY = 0;
  canvas.addEventListener('mousedown', e => {
    startX = e.clientX; startY = e.clientY;
  });

  canvas.addEventListener('click', e => {
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (Math.sqrt(dx*dx + dy*dy) > 6) return; // Ignore drag moves

    getMouseNDC(e);
    raycaster.setFromCamera(mouse2D, camera);
    const hits = raycaster.intersectObjects(getInteractiveTargets());
    if (!hits.length) return;

    const obj = hits[0].object;

    if (obj.userData.hotspot) {
      controls.moveTo(obj.userData.targetVp);
    } else if (obj.userData.exhibitData) {
      ui.showPanel(obj.userData.exhibitData);
      controls.moveToExhibit(obj.userData.exhibitData);
    } else if (obj.userData.isStatue && obj.userData.statueData) {
      ui.showStatueModal(obj.userData.statueData);
      controls.moveToStatue(obj.userData.statueData);
    } else if (obj.userData.isServiceBell) {
      ui.ringBell();
    } else if (obj.userData.isComplaintsBox) {
      ui.submitComplaint();
    } else if (obj.userData.isLaserGrid) {
      ui.showLaserWarning();
    }
  });

  // Touch Support
  let touchStart = null;
  canvas.addEventListener('touchstart', e => {
    touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });
  canvas.addEventListener('touchend', e => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      mouse2D.x = (touchStart.x / window.innerWidth)  *  2 - 1;
      mouse2D.y = (touchStart.y / window.innerHeight) * -2 + 1;
      raycaster.setFromCamera(mouse2D, camera);
      const hits = raycaster.intersectObjects(getInteractiveTargets());
      if (hits.length) {
        const obj = hits[0].object;
        if (obj.userData.hotspot) controls.moveTo(obj.userData.targetVp);
        else if (obj.userData.exhibitData) {
          ui.showPanel(obj.userData.exhibitData);
          controls.moveToExhibit(obj.userData.exhibitData);
        } else if (obj.userData.isStatue && obj.userData.statueData) {
          ui.showStatueModal(obj.userData.statueData);
          controls.moveToStatue(obj.userData.statueData);
        } else if (obj.userData.isServiceBell) ui.ringBell();
        else if (obj.userData.isComplaintsBox) ui.submitComplaint();
        else if (obj.userData.isLaserGrid) ui.showLaserWarning();
      }
    }
    touchStart = null;
  }, { passive: true });

  // Resize Handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Fade out drag hint
  setTimeout(() => {
    const hint = document.getElementById('drag-hint');
    if (hint) hint.classList.add('hidden');
  }, 6000);

  // Main Render Loop
  function animate(time) {
    requestAnimationFrame(animate);
    const t = time * 0.001;
    
    updateHotspots(hotspots, t);
    updateSpeechBubbles(speechBubbles, t);

    rotatingObjects.forEach((obj, i) => {
      obj.rotation.y = t * 0.4 + i;
    });

    renderer.render(scene, camera);
  }
  animate(0);
}
