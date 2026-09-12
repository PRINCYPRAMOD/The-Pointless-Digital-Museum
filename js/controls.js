import * as THREE from 'three';

export const VIEWPOINTS = [
  { id: 'v0', pos: [0, 1.7, -2],   yaw: 0,    pitch: 0,     room: 0, label: 'Grand Entry Hall', next: 'v1', prev: null },
  { id: 'v1', pos: [0, 1.7, -14],  yaw: 0,    pitch: 0,     room: 0, label: 'Grand Entry Hall', next: 'v2', prev: 'v0' },
  { id: 'v2', pos: [0, 1.7, -28],  yaw: 0,    pitch: 0,     room: 0, label: 'Grand Entry Hall', next: 'v3', prev: 'v1' },
  { id: 'v3', pos: [0, 1.7, -46],  yaw: 0,    pitch: -0.05, room: 1, label: 'The Collection',   next: 'v4', prev: 'v2' },
  { id: 'v4', pos: [0, 1.7, -58],  yaw: 0,    pitch: -0.06, room: 1, label: 'Row 1 Exhibits',   next: 'v5', prev: 'v3' },
  { id: 'v5', pos: [0, 1.7, -72],  yaw: 0,    pitch: -0.06, room: 1, label: 'Row 2 Exhibits',   next: 'v6', prev: 'v4' },
  { id: 'v6', pos: [0, 1.7, -86],  yaw: 0,    pitch: -0.06, room: 1, label: 'Row 3 Exhibits',   next: 'v7', prev: 'v5' },
  { id: 'v7', pos: [0, 1.7, -94],  yaw: 0,    pitch: -0.08, room: 1, label: 'The Final Bubble', next: null, prev: 'v6' }
];

const VP_MAP = {};
VIEWPOINTS.forEach(v => { VP_MAP[v.id] = v; });

export class Controls {
  constructor(camera, renderer) {
    this.camera = camera;
    this.canvas = renderer.domElement;
    this.yaw = 0;
    this.pitch = 0;
    this.current = VIEWPOINTS[0];
    this.previousVp = VIEWPOINTS[0];
    this.isCloseUp = false;
    this._isDrag = false;
    this._px = 0;
    this._py = 0;
    this._touchP = null;
    this._navCb = null;
    this._setup();
    this._apply(this.current);
  }

  onNavigate(fn) { this._navCb = fn; }

  moveTo(idOrVp, animate = true) {
    const vp = typeof idOrVp === 'string' ? VP_MAP[idOrVp] : idOrVp;
    if (!vp) return;
    if (!this.isCloseUp) this.previousVp = this.current;
    this.current = vp;
    this.isCloseUp = false;

    if (animate && window.gsap) {
      gsap.to(this.camera.position, {
        x: vp.pos[0], y: vp.pos[1], z: vp.pos[2],
        duration: 1.6, ease: 'power2.inOut'
      });
      gsap.to(this, {
        yaw: vp.yaw, pitch: vp.pitch,
        duration: 1.6, ease: 'power2.inOut',
        onUpdate: () => this._applyRotation()
      });
    } else {
      this._apply(vp);
    }
    if (this._navCb) this._navCb(vp, false);
  }

  moveToExhibit(exhibit) {
    this.previousVp = this.current;
    this.isCloseUp = true;
    const vp = {
      pos: exhibit.viewPos || [exhibit.position[0], 1.65, exhibit.position[2] + 2.4],
      yaw: exhibit.viewYaw || 0,
      pitch: exhibit.viewPitch || -0.05,
      room: 1,
      label: exhibit.name + ' (Close-Up)',
      id: '_exhibit_' + exhibit.id,
      next: null,
      prev: this.previousVp.id
    };
    this.current = vp;

    if (window.gsap) {
      gsap.to(this.camera.position, {
        x: vp.pos[0], y: vp.pos[1], z: vp.pos[2],
        duration: 1.5, ease: 'power2.inOut'
      });
      gsap.to(this, {
        yaw: vp.yaw, pitch: vp.pitch,
        duration: 1.5, ease: 'power2.inOut',
        onUpdate: () => this._applyRotation()
      });
    } else {
      this._apply(vp);
    }
    if (this._navCb) this._navCb(vp, true);
  }

  moveToStatue(statue) {
    this.previousVp = this.current;
    this.isCloseUp = true;
    const vp = {
      pos: statue.viewPos || [statue.position[0], 1.7, statue.position[2] + 2.6],
      yaw: statue.viewYaw || 0,
      pitch: -0.04,
      room: statue.room,
      label: statue.name + ' (Statue Focus)',
      id: '_statue_' + statue.id,
      next: null,
      prev: this.previousVp.id
    };
    this.current = vp;

    if (window.gsap) {
      gsap.to(this.camera.position, {
        x: vp.pos[0], y: vp.pos[1], z: vp.pos[2],
        duration: 1.5, ease: 'power2.inOut'
      });
      gsap.to(this, {
        yaw: vp.yaw, pitch: vp.pitch,
        duration: 1.5, ease: 'power2.inOut',
        onUpdate: () => this._applyRotation()
      });
    } else {
      this._apply(vp);
    }
    if (this._navCb) this._navCb(vp, true);
  }

  returnFromCloseUp() {
    this.isCloseUp = false;
    this.moveTo(this.previousVp, true);
  }

  next() { if (this.current.next) this.moveTo(this.current.next); }
  prev() { if (this.current.prev) this.moveTo(this.current.prev); }

  _apply(vp) {
    this.yaw = vp.yaw;
    this.pitch = vp.pitch;
    this.camera.position.set(vp.pos[0], vp.pos[1], vp.pos[2]);
    this._applyRotation();
  }

  _applyRotation() {
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = Math.max(-0.88, Math.min(0.88, this.pitch));
  }

  _setup() {
    const cv = this.canvas;
    cv.addEventListener('mousedown', e => {
      if (e.button !== 0) return;
      this._isDrag = true;
      this._px = e.clientX;
      this._py = e.clientY;
      cv.style.cursor = 'grabbing';
    });
    window.addEventListener('mouseup', () => {
      this._isDrag = false;
      cv.style.cursor = 'grab';
    });
    window.addEventListener('mousemove', e => {
      if (!this._isDrag) return;
      const dx = (e.clientX - this._px) * 0.0038;
      const dy = (e.clientY - this._py) * 0.0038;
      this.yaw   -= dx;
      this.pitch -= dy;
      this._px = e.clientX;
      this._py = e.clientY;
      this._applyRotation();
    });

    cv.addEventListener('touchstart', e => {
      if (e.touches.length === 1)
        this._touchP = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });
    cv.addEventListener('touchend', () => { this._touchP = null; });
    cv.addEventListener('touchmove', e => {
      if (!this._touchP || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - this._touchP.x) * 0.0045;
      const dy = (e.touches[0].clientY - this._touchP.y) * 0.0045;
      this.yaw   -= dx;
      this.pitch -= dy;
      this._touchP = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      this._applyRotation();
      e.preventDefault();
    }, { passive: false });
  }
}
