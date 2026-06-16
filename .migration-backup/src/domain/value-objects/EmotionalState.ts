export abstract class ValueObject<T> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}

export interface EmotionalMetrics {
  valence: number; // -1.0 to 1.0
  arousal: number; // 0.0 to 1.0
  dominance: number; // 0.0 to 1.0
  cognitiveDistortionDetected: boolean;
}

export class EmotionalState extends ValueObject<EmotionalMetrics> {
  private constructor(props: EmotionalMetrics) {
    super(props);
  }

  public static create(metrics: EmotionalMetrics): EmotionalState {
    if (metrics.valence < -1.0 || metrics.valence > 1.0) {
      throw new Error("Valence must be between -1.0 and 1.0");
    }
    return new EmotionalState(metrics);
  }

  public get isCritical(): boolean {
    return this.props.valence < -0.8 && this.props.arousal > 0.8;
  }

  public get requiresIntervention(): boolean {
    return this.props.cognitiveDistortionDetected && this.props.valence < -0.5;
  }
}
