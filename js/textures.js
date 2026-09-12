import * as THREE from 'three';

export function createMarbleTexture(w = 512, h = 512) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#E8E2D5';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 35; i++) {
    ctx.beginPath();
    const alpha = 0.12 + Math.random() * 0.22;
    ctx.strokeStyle = `rgba(140,128,110,${alpha})`;
    ctx.lineWidth = 0.6 + Math.random() * 2.2;
    ctx.moveTo(Math.random() * w, Math.random() * h);
    ctx.bezierCurveTo(
      Math.random() * w, Math.random() * h,
      Math.random() * w, Math.random() * h,
      Math.random() * w, Math.random() * h
    );
    ctx.stroke();
  }
  const idata = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < idata.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    idata.data[i]   = Math.max(0, Math.min(255, idata.data[i]   + n));
    idata.data[i+1] = Math.max(0, Math.min(255, idata.data[i+1] + n * 0.9));
    idata.data[i+2] = Math.max(0, Math.min(255, idata.data[i+2] + n * 0.7));
  }
  ctx.putImageData(idata, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function createWoodTexture(w = 256, h = 256) {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#2A170A';
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 90; i++) {
    const y = (i / 90) * h + (Math.random() - 0.5) * 6;
    ctx.beginPath();
    ctx.strokeStyle = `rgba(${65 + Math.random()*30},${32+Math.random()*16},${10+Math.random()*10},0.4)`;
    ctx.lineWidth = 0.5 + Math.random() * 1.6;
    ctx.moveTo(0, y);
    for (let x = 20; x <= w; x += 20) {
      ctx.lineTo(x, y + (Math.random() - 0.5) * 5);
    }
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function createWallTexture(w = 256, h = 256, base = '#1A1108') {
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const idata = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < idata.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 16;
    idata.data[i]   = Math.max(0, Math.min(255, idata.data[i]   + n));
    idata.data[i+1] = Math.max(0, Math.min(255, idata.data[i+1] + n * 0.6));
    idata.data[i+2] = Math.max(0, Math.min(255, idata.data[i+2] + 0));
  }
  ctx.putImageData(idata, 0, 0);
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function createSignTexture(opts = {}) {
  const {
    w = 512, h = 256,
    bg = '#140D05',
    borderColor = '#C9A227',
    title = '', titleSz = 26,
    lines = [], lineSz = 18,
    titleColor = '#C9A227',
    textColor = '#EDE6D8'
  } = opts;
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  // Gold double frame
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, w - 12, h - 12);
  ctx.lineWidth = 1;
  ctx.strokeRect(12, 12, w - 24, h - 24);
  const cx = w / 2;
  let y = 36;
  if (title) {
    ctx.fillStyle = titleColor;
    ctx.font = `bold ${titleSz}px Georgia`;
    ctx.textAlign = 'center';
    ctx.fillText(title, cx, y + titleSz);
    y += titleSz + 14;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(24, y); ctx.lineTo(w - 24, y);
    ctx.stroke();
    y += 18;
  }
  ctx.fillStyle = textColor;
  ctx.font = `${lineSz}px Georgia`;
  ctx.textAlign = 'center';
  for (const line of lines) {
    ctx.fillText(line, cx, y + lineSz);
    y += lineSz + 8;
  }
  return new THREE.CanvasTexture(cv);
}
