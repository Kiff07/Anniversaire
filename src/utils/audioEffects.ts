// Web Audio API Cinema Sound Effects Generator
// 100% synthesized sound - zero external dependencies or broken links

class CinemaAudio {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Triumphant Universal Studios style orchestral brass fanfare
  playUniversalFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Fanfare melodic sequence (frequencies in Hz: Bb3, D4, F4, Bb4, F4, Bb4, D5, C5, Bb4...)
    const notes = [
      { f: 233.08, start: 0.0, dur: 0.6, type: 'sawtooth' }, // Bb3
      { f: 293.66, start: 0.6, dur: 0.3, type: 'sawtooth' }, // D4
      { f: 349.23, start: 0.9, dur: 0.3, type: 'sawtooth' }, // F4
      { f: 466.16, start: 1.2, dur: 1.2, type: 'sawtooth' }, // Bb4
      
      { f: 349.23, start: 2.5, dur: 0.3, type: 'sawtooth' }, // F4
      { f: 466.16, start: 2.8, dur: 0.4, type: 'sawtooth' }, // Bb4
      { f: 587.33, start: 3.2, dur: 1.4, type: 'sawtooth' }, // D5
      
      { f: 523.25, start: 4.8, dur: 0.5, type: 'sawtooth' }, // C5
      { f: 466.16, start: 5.3, dur: 0.5, type: 'sawtooth' }, // Bb4
      { f: 587.33, start: 5.8, dur: 0.6, type: 'sawtooth' }, // D5
      { f: 698.46, start: 6.4, dur: 2.5, type: 'sawtooth' }, // F5 (grand climax)
    ];

    notes.forEach(n => {
      // Main brass oscillator
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(n.f, now + n.start);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(n.f * 1.003, now + n.start); // slight detune for orchestral width

      // Low pass filter for brass warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + n.start);
      filter.frequency.exponentialRampToValueAtTime(3200, now + n.start + 0.1);
      filter.frequency.exponentialRampToValueAtTime(1200, now + n.start + n.dur);

      gain.gain.setValueAtTime(0.001, now + n.start);
      gain.gain.linearRampToValueAtTime(0.18, now + n.start + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.12, now + n.start + n.dur * 0.7);
      gain.gain.linearRampToValueAtTime(0.0001, now + n.start + n.dur);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.start);
      osc2.start(now + n.start);
      osc.stop(now + n.start + n.dur + 0.1);
      osc2.stop(now + n.start + n.dur + 0.1);
    });

    // Timpani / percussion rumble on big notes
    const timpanis = [0.0, 1.2, 3.2, 6.4];
    timpanis.forEach(t => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(95, now + t);
      osc.frequency.exponentialRampToValueAtTime(45, now + t + 0.6);

      gain.gain.setValueAtTime(0.3, now + t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.85);
    });
  }

  // Wooden clapperboard snap
  playClapSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Wood transient impulse
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(2, now);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // White noise click
    const bufferSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.6, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.start(now);
    noise.start(now);
    osc.stop(now + 0.09);
    noise.stop(now + 0.05);
  }

  // Countdown beep (Vintage film reel leader beep)
  playCountdownBeep(isFinal = false) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isFinal ? 1200 : 900, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (isFinal ? 0.35 : 0.12));

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + (isFinal ? 0.36 : 0.13));
  }

  // Paparazzi camera flash with shutter click
  playCameraShutter() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Shutter click 1
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.03);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.045);

    // Shutter click 2 (rebound)
    setTimeout(() => {
      const ctx2 = this.getContext();
      if (!ctx2) return;
      const n2 = ctx2.currentTime;
      const osc2 = ctx2.createOscillator();
      const gain2 = ctx2.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(600, n2);
      osc2.frequency.exponentialRampToValueAtTime(120, n2 + 0.04);
      gain2.gain.setValueAtTime(0.25, n2);
      gain2.gain.exponentialRampToValueAtTime(0.001, n2 + 0.05);
      osc2.connect(gain2);
      gain2.connect(ctx2.destination);
      osc2.start(n2);
      osc2.stop(n2 + 0.055);
    }, 70);
  }

  // Oscar Fanfare
  playOscarFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { f: 523.25, start: 0.0, dur: 0.18 }, // C5
      { f: 659.25, start: 0.18, dur: 0.18 }, // E5
      { f: 783.99, start: 0.36, dur: 0.18 }, // G5
      { f: 1046.50, start: 0.54, dur: 0.8 }, // C6
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.start);

      gain.gain.setValueAtTime(0.2, now + n.start);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + n.start);
      osc.stop(now + n.start + n.dur + 0.05);
    });
  }

  // Dramatic Inception Horn ("BRRRRAAAAMMMM")
  playInceptionHorn() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(65.41, now); // C2
    osc.frequency.exponentialRampToValueAtTime(55, now + 1.8);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(65.8, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, now);
    filter.frequency.linearRampToValueAtTime(900, now + 0.25);
    filter.frequency.exponentialRampToValueAtTime(180, now + 2.0);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.3);
    osc2.stop(now + 2.3);
  }

  // Crowd applause generator
  playApplause() {
    const ctx = this.getContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 2.0;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const envelope = Math.sin((i / bufferSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.35;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 1.0;

    noise.connect(filter);
    filter.connect(ctx.destination);
    noise.start();
  }

  // Correct answer chime
  playSuccessSound() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.18, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.35);
    });
  }

  // Vintage Projector Click
  playProjectorClick() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const cinemaAudio = new CinemaAudio();
