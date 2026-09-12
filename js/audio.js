// ─── Procedural Web Audio Engine (Zero external assets, 100% legal & lightweight) ───

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('pointless_sound_enabled') !== 'false';
    this.lastPlayTimes = {};
    this.cooldownMs = 450; // Prevent rapid stacking
  }

  _initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('pointless_sound_enabled', this.enabled);
    if (this.enabled) {
      this._initCtx();
      this.playPointingWhoosh();
    }
    return this.enabled;
  }

  _canPlay(type) {
    if (!this.enabled) return false;
    const now = Date.now();
    const last = this.lastPlayTimes[type] || 0;
    if (now - last < this.cooldownMs) return false;
    this.lastPlayTimes[type] = now;
    return true;
  }

  // 1. OVERTHINKER: Mysterious, Contemplative Deep Chime
  playOverthinkerChime() {
    if (!this._canPlay('thinker')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const freqs = [329.63, 493.88, 659.25, 987.77]; // E4, B4, E5, B5
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.06);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18 / (i + 1), ctx.currentTime + i * 0.06 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6 + i * 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.06);
      osc.stop(ctx.currentTime + 2.0);
    });
  }

  // 2. PHONE ADDICT: Realistic 2-Tone Smartphone Ding (880Hz -> 1760Hz)
  playPhoneNotification() {
    if (!this._canPlay('phone')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const tones = [{ f: 880, t: 0, d: 0.12 }, { f: 1760, t: 0.10, d: 0.28 }];
    tones.forEach(item => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(item.f, ctx.currentTime + item.t);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + item.t);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + item.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + item.t + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + item.t);
      osc.stop(ctx.currentTime + item.t + item.d + 0.05);
    });
  }

  // 3. LAZY GUARD: Bored Breathy Sigh
  playLazyGuardSigh() {
    if (!this._canPlay('guard')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    // Filtered noise + low sine glide
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 0.85);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  }

  // 4. CONFUSED PHILOSOPHER: Curious "Hmm?" Rising Pitch
  playConfusedHmm() {
    if (!this._canPlay('confused')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(190, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  // 5. FLEXER: Dramatic Brass Impact / Sting
  playFlexerImpact() {
    if (!this._canPlay('flexer')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const freqs = [110, 164.81, 220]; // A2, E3, A3
    freqs.forEach(f => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f * 1.5, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(f, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    });
  }

  // 6. TIRED STATUE: Exhausted Descending Yawn Glide
  playTiredYawn() {
    if (!this._canPlay('tired')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.95);
  }

  // 7. SAD STATUE: Dramatic Melancholy Minor Chord (A Minor)
  playSadMelody() {
    if (!this._canPlay('sad')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const notes = [220, 261.63, 329.63, 440]; // A3, C4, E4, A4
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.4 + i * 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + 1.8);
    });
  }

  // 8. SLEEPING STATUE: Soft Rhythmic Snore / Breathing
  playSleepingSnore() {
    if (!this._canPlay('sleep')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(65, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(85, ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.9);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.05);
  }

  // 9. POINTING STATUE: Crisp Whoosh + Directional Chime
  playPointingWhoosh() {
    if (!this._canPlay('pointing')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  }

  // 10. OBSERVING SOCK: Curious Magnifying Sparkle Chime
  playObservingSparkle() {
    if (!this._canPlay('sock_statue')) return;
    const ctx = this._initCtx();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.05);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8 + i * 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.05);
      osc.stop(ctx.currentTime + 1.1);
    });
  }

  playStatueSound(statueId) {
    switch (statueId) {
      case 's01': this.playOverthinkerChime(); break;
      case 's02': this.playPointingWhoosh(); break;
      case 's03': this.playPhoneNotification(); break;
      case 's04': this.playLazyGuardSigh(); break;
      case 's05': this.playConfusedHmm(); break;
      case 's06': this.playObservingSparkle(); break;
      case 's07': this.playFlexerImpact(); break;
      case 's08': this.playTiredYawn(); break;
      case 's09': this.playSadMelody(); break;
      case 's10': this.playSleepingSnore(); break;
      default:    this.playOverthinkerChime(); break;
    }
  }

  playBellChime() {
    if (!this._canPlay('bell')) return;
    const ctx = this._initCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  }

  playComplaintShredder() {
    if (!this._canPlay('shredder')) return;
    const ctx = this._initCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.4);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }

  playLaserAlarm() {
    if (!this._canPlay('alarm')) return;
    const ctx = this._initCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.setValueAtTime(400, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  }
}

export const soundEngine = new SoundEngine();
