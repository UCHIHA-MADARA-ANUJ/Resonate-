// ============================================================================
// RESONATE ACOUSTIC ENGINE V5 - BEAST MODE
// Upgraded: Audible, crisp, cinematic, non-annoying. Master volume boosted.
// ============================================================================

export class AcousticResonator {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isInitialized = false;

  private static instance: AcousticResonator;

  private constructor() {}

  public static getInstance(): AcousticResonator {
    if (!AcousticResonator.instance) {
      AcousticResonator.instance = new AcousticResonator();
    }
    return AcousticResonator.instance;
  }

  public async initialize() {
    if (this.isInitialized) return;
    if (typeof window === 'undefined') return;

    this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    
    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = this.createImpulseResponse(this.ctx, 2.0, 3.0); // Shorter, punchier reverb
    
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowshelf';
    this.filter.frequency.value = 300;
    this.filter.gain.value = 6; // Heavy sub-bass boost

    this.filter.connect(this.convolver);
    this.convolver.connect(this.masterGain);
    this.filter.connect(this.masterGain);

    this.masterGain.connect(this.ctx.destination);
    this.masterGain.gain.value = 0.8; // Boosted global volume

    this.isInitialized = true;
  }

  private createImpulseResponse(ctx: AudioContext, duration: number, decay: number) {
    const rate = ctx.sampleRate;
    const length = rate * duration;
    const impulse = ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      left[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
      right[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
    return impulse;
  }

  // Crisp, audible UI hover ping (Not annoying, high quality)
  public playSoftHover() {
    if (!this.ctx || !this.filter) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.filter);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public playDeepThud() {
    if (!this.ctx || !this.filter) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.02); 
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.0); 

    osc.connect(gain);
    gain.connect(this.filter);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.0);
  }

  public playDataTick() {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(4000, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, this.ctx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playCinematicRiser() {
    if (!this.ctx || !this.filter) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(20, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 3.0); 
    
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, this.ctx.currentTime + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.1);

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1000;

    osc.connect(lp);
    lp.connect(gain);
    gain.connect(this.filter); 

    osc.start();
    osc.stop(this.ctx.currentTime + 3.1);
  }
}
