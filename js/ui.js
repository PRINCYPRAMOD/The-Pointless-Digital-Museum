import { VIEWPOINTS } from './controls.js';
import { soundEngine } from './audio.js';

const WHY_ANSWERS = [
  "We don't know. But removing it would create an empty space, and we're not ready for that kind of responsibility.",
  "The museum board held a 4-hour emergency meeting and voted 7-0 to avoid doing actual work.",
  "It was brought here in 2017 by an intern who forgot to ask what room it belonged to.",
  "Philosophers agree that without this pointless object, the universe would have to find another excuse to exist.",
  "Scientists attempted to find its purpose. They were hospitalized for severe confusion.",
  "A billionaire donated this for a tax deduction. We did not question their financial genius.",
  "If it had a purpose, we would have had to classify it as useful equipment, which requires safety paperwork."
];

const BELL_RESPONSES = [
  "🛎️ DING! ...Nobody came. The receptionist is on a coffee break since 2018.",
  "🛎️ DING! Please hold. You are caller #9,482 in the queue.",
  "🛎️ DING! You rang the bell with great passion, achieving absolutely nothing.",
  "🛎️ DING! Ringing louder only makes the silence more embarrassing.",
  "🛎️ DING! A staff member heard you, nodded, and went back to doomscrolling."
];

const COMPLAINT_RESPONSES = [
  "🗑️ *BRRRZZT!* Your complaint has been shredded and recycled into museum brochures.",
  "🗑️ Thank you! Our digital shredder was feeling hungry today.",
  "🗑️ Complaint filed successfully under: 'Things We Will Read In The Year 3000'.",
  "🗑️ We have forwarded your complaint directly to /dev/null.",
  "🗑️ 100% of complaints are treated with utmost indifference."
];

const DOCENT_TRACKS = {
  0: "Welcome to the Grand Entry Hall of The Pointless Digital Museum. Notice the towering marble columns and our classical statues, contemplating absolutely nothing.",
  1: "Here in The Collection, we celebrate items and statues that have surrendered all ambition. Inspect each artifact closely to absorb its total lack of utility."
};

export class UI {
  constructor(controls) {
    this.controls    = controls;
    this.$panel      = document.getElementById('exhibit-panel');
    this.$panelNum   = document.getElementById('panel-exhibit-num');
    this.$panelName  = document.getElementById('panel-name');
    this.$panelStats = document.getElementById('panel-stats');
    this.$panelDesc  = document.getElementById('panel-desc');
    this.$uBarFill   = document.getElementById('u-bar-fill');
    this.$uValue     = document.getElementById('u-value');
    this.$whyBtn     = document.getElementById('why-btn');
    this.$whyAnswer  = document.getElementById('why-answer');
    this.$inspectBtn = document.getElementById('inspect-btn');
    this.$locName    = document.getElementById('location-name');
    this.$locIcon    = document.getElementById('location-icon');
    this.$mm0        = document.getElementById('mm-0');
    this.$mm1        = document.getElementById('mm-1');
    this.$mmYou      = document.querySelector('.mm-you');
    this.$navLabel   = document.getElementById('nav-label');
    this.$viewCount  = document.getElementById('view-counter');
    this.$toast      = document.getElementById('easter-toast');
    this.$btnPrev    = document.getElementById('btn-prev');
    this.$btnNext    = document.getElementById('btn-next');
    this.$closeUp    = document.getElementById('close-up-banner');
    this.$closeUpBack= document.getElementById('close-up-back-btn');
    this.$docent     = document.getElementById('docent-bubble');
    this.$docentText = document.getElementById('docent-text');
    this.$audioBtn   = document.getElementById('audio-btn');
    this.$audioLabel = document.getElementById('audio-label');
    this.$soundBtn   = document.getElementById('sound-btn');
    this.$soundLabel = document.getElementById('sound-label');
    this.$soundIcon  = document.getElementById('sound-icon');

    // Statue Modal Elements
    this.$statueModal  = document.getElementById('statue-modal');
    this.$statueTitle  = document.getElementById('statue-title');
    this.$statueSub    = document.getElementById('statue-sub');
    this.$statueBubble = document.getElementById('statue-bubble-text');
    this.$statueDesc   = document.getElementById('statue-desc');
    this.$statueQuote  = document.getElementById('statue-quote');

    this.currentExhibit = null;
    this.currentStatue  = null;
    this.audioEnabled   = true;
    this._whyIdx        = 0;
    this._bellIdx       = 0;
    this._compIdx       = 0;
    this._toastTimer    = null;

    this._setup();
    this._startVisitorCounter();
    this._updateSoundUI();
  }

  _setup() {
    document.getElementById('panel-close').addEventListener('click', () => this.hidePanel());
    document.getElementById('statue-close').addEventListener('click', () => this.hideStatueModal());

    this.$whyBtn.addEventListener('click', () => this._showWhy());
    this.$inspectBtn.addEventListener('click', () => {
      if (this.currentExhibit) {
        this.controls.moveToExhibit(this.currentExhibit);
      }
    });

    this.$closeUpBack.addEventListener('click', () => {
      this.controls.returnFromCloseUp();
    });

    // Sound FX ON/OFF Toggle
    this.$soundBtn?.addEventListener('click', () => {
      const isEnabled = soundEngine.toggleSound();
      this._updateSoundUI(isEnabled);
      this.showToast(isEnabled ? "🔊 Sound Effects Enabled" : "🔇 Sound Effects Muted");
    });

    // Audio Guide Voice Toggle
    this.$audioBtn.addEventListener('click', () => {
      this.audioEnabled = !this.audioEnabled;
      this.$audioLabel.textContent = this.audioEnabled ? 'AUDIO GUIDE: ON' : 'AUDIO GUIDE: MUTED';
      if (!this.audioEnabled) {
        this.$docent.classList.remove('show');
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      } else {
        this.speakDocent("Audio guide reactivated. Prepare for enlightenment.");
      }
    });

    // Entrance interactive buttons
    document.getElementById('btn-bell')?.addEventListener('click', () => this.ringBell());
    document.getElementById('btn-complaint')?.addEventListener('click', () => this.submitComplaint());
    document.getElementById('btn-statue-list')?.addEventListener('click', () => {
      this.showToast("🏛️ 10 Unique Classical Statues placed around the 360° museum! Click any statue to interact.");
    });
  }

  _updateSoundUI(state) {
    const isEnabled = state !== undefined ? state : soundEngine.enabled;
    if (this.$soundLabel) this.$soundLabel.textContent = isEnabled ? 'SOUND: ON' : 'SOUND: MUTED';
    if (this.$soundIcon)  this.$soundIcon.textContent  = isEnabled ? '🔊' : '🔇';
  }

  showPanel(exhibit) {
    this.hideStatueModal();
    this.currentExhibit = exhibit;
    this.$panelNum.textContent  = 'EXHIBIT ' + exhibit.id;
    this.$panelName.textContent = exhibit.name;

    let statsHTML = '';
    for (const [k, v] of Object.entries(exhibit.stats)) {
      statsHTML += `<span>${k}</span><span class="stat-val">${v}</span>`;
    }
    this.$panelStats.innerHTML = statsHTML;
    this.$panelDesc.textContent = exhibit.description;
    
    const pct = exhibit.uselessness + '%';
    this.$uValue.textContent = pct;
    this.$uBarFill.style.width = '0%';
    setTimeout(() => { this.$uBarFill.style.width = pct; }, 50);

    this.$whyAnswer.textContent = '';
    this.$whyAnswer.classList.remove('visible');
    this._whyIdx = 0;
    this.$panel.classList.add('open');

    soundEngine.playObservingSparkle();
    this.speakDocent(`Behold Exhibit ${exhibit.id}: ${exhibit.name}. ${exhibit.description}`);
  }

  hidePanel() {
    this.$panel.classList.remove('open');
    this.currentExhibit = null;
  }

  showStatueModal(statue) {
    this.hidePanel();
    this.currentStatue = statue;

    this.$statueTitle.textContent  = statue.name;
    this.$statueSub.textContent    = `${statue.pedestalTitle} — ${statue.pedestalSubtitle}`;
    this.$statueBubble.textContent = `"${statue.speechBubble.replace(/\n/g, ' ')}"`;
    this.$statueDesc.textContent   = statue.description;
    this.$statueQuote.textContent  = statue.interactionQuote;

    this.$statueModal.classList.add('open');
    
    // Play the statue's dedicated sound effect!
    soundEngine.playStatueSound(statue.id);

    this.speakDocent(`${statue.name}. ${statue.speechBubble.replace(/\n/g, ' ')}`);
  }

  hideStatueModal() {
    this.$statueModal.classList.remove('open');
    this.currentStatue = null;
  }

  _showWhy() {
    this.$whyAnswer.textContent = WHY_ANSWERS[this._whyIdx % WHY_ANSWERS.length];
    this.$whyAnswer.classList.add('visible');
    this._whyIdx++;
  }

  ringBell() {
    soundEngine.playBellChime();
    const msg = BELL_RESPONSES[this._bellIdx++ % BELL_RESPONSES.length];
    this.showToast(msg);
  }

  submitComplaint() {
    soundEngine.playComplaintShredder();
    const msg = COMPLAINT_RESPONSES[this._compIdx++ % COMPLAINT_RESPONSES.length];
    this.showToast(msg);
  }

  showLaserWarning() {
    soundEngine.playLaserAlarm();
    this.showToast("🚨 SECURITY ALARM: Unauthorized admiration of purposeless statues detected!");
  }

  showToast(msg) {
    this.$toast.textContent = msg;
    this.$toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.$toast.classList.remove('show'), 4400);
  }

  speakDocent(text) {
    if (!this.audioEnabled) return;
    this.$docentText.textContent = `"${text}"`;
    this.$docent.classList.add('show');
    clearTimeout(this._docentTimer);
    this._docentTimer = setTimeout(() => this.$docent.classList.remove('show'), 6500);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.92;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    }
  }

  updateNav(vp, isCloseUp) {
    const allVps = VIEWPOINTS;
    const idx = allVps.findIndex(v => v.id === vp.id);
    
    this.$navLabel.textContent = isCloseUp ? 'INSPECTING' : 'EXPLORE';
    this.$viewCount.textContent = (idx >= 0 ? idx + 1 : '-') + ' / ' + allVps.length;
    this.$btnPrev.disabled = !vp.prev;
    this.$btnNext.disabled = !vp.next;

    this.$locName.textContent = vp.label;
    this.$locIcon.textContent = vp.room === 0 ? '🏛️' : '🖼️';

    this.$mm0.classList.toggle('active', vp.room === 0);
    this.$mm1.classList.toggle('active', vp.room === 1);
    this.$mmYou.textContent = '▲ ' + vp.label.toUpperCase();

    if (isCloseUp) {
      this.$closeUp.classList.add('show');
    } else {
      this.$closeUp.classList.remove('show');
    }

    if (!isCloseUp && DOCENT_TRACKS[vp.room] && (vp.id === 'v0' || vp.id === 'v3')) {
      this.speakDocent(DOCENT_TRACKS[vp.room]);
    }
  }

  _startVisitorCounter() {
    let count = 142857;
    setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1;
      const el = document.getElementById('counter-val');
      if (el) el.textContent = count.toLocaleString();
    }, 4000);
  }
}
