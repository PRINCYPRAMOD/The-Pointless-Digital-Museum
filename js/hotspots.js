import * as THREE from 'three';

export function buildHotspots(scene) {
  const spots = [];
  const geo = new THREE.OctahedronGeometry(0.32, 0);

  const positions = [
    { pos: [0, 0.45, -14], targetVp: 'v1', label: 'Grand Hall Center' },
    { pos: [0, 0.45, -28], targetVp: 'v2', label: 'Near Archway' },
    { pos: [0, 0.45, -38], targetVp: 'v3', label: 'Enter Collection \u2192' },
    { pos: [0, 0.45, -54], targetVp: 'v4', label: 'Row 1' },
    { pos: [0, 0.45, -68], targetVp: 'v5', label: 'Row 2' },
    { pos: [0, 0.45, -82], targetVp: 'v6', label: 'Row 3' },
    { pos: [0, 0.45, -92], targetVp: 'v7', label: 'The Final Bubble' }
  ];

  positions.forEach(item => {
    const mat = new THREE.MeshStandardMaterial({
      color: 0xF3D058, emissive: new THREE.Color(0xD4AA2B), emissiveIntensity: 0.8,
      metalness: 0.7, roughness: 0.2, transparent: true, opacity: 0.9
    });
    const m = new THREE.Mesh(geo.clone(), mat);
    m.position.set(...item.pos);
    m.userData.hotspot  = true;
    m.userData.targetVp = item.targetVp;
    m.userData.label    = item.label;
    scene.add(m);
    spots.push(m);

    // Glowing Floor Ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.4, 0.65, 24),
      new THREE.MeshBasicMaterial({ color: 0xD4AA2B, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(item.pos[0], 0.02, item.pos[2]);
    scene.add(ring);
    m.userData.ring = ring;
  });

  return spots;
}

export function updateHotspots(spots, time) {
  spots.forEach((m, i) => {
    m.position.y = 0.45 + Math.sin(time * 1.8 + i) * 0.09;
    m.rotation.y = time * 0.8 + i;
    m.material.opacity = 0.75 + Math.sin(time * 2.2 + i) * 0.2;
    if (m.userData.ring) {
      m.userData.ring.material.opacity = 0.25 + Math.sin(time * 1.5 + i) * 0.15;
    }
  });
}
