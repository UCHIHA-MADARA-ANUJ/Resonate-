import { Entity } from "../../core/cqrs/Entity";
import { EmotionalState } from "../value-objects/EmotionalState";

export interface UserProps {
  cryptoPublicKey: string; // Used for E2E encryption
  emotionalBaseline: EmotionalState;
  currentSessionStreak: number;
  lastActive: Date;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(props: UserProps, id?: string): User {
    // Domain invariants validation
    if (!props.cryptoPublicKey) {
      throw new Error("User cannot be instantiated without a cryptographic key pair.");
    }
    return new User(props, id);
  }

  public registerEmotionalShift(newState: EmotionalState): void {
    if (newState.isCritical) {
      // Trigger Domain Event for SOS Protocol
      this.addDomainEvent({
        dateTimeOccurred: new Date(),
        aggregateId: this.id,
        // @ts-ignore
        type: 'CRITICAL_EMOTIONAL_SHIFT_DETECTED'
      });
    }

    this.props.emotionalBaseline = newState;
    this.props.lastActive = new Date();
  }

  public completeResoQuest(): void {
    this.props.currentSessionStreak += 1;
    this.addDomainEvent({
      dateTimeOccurred: new Date(),
      aggregateId: this.id,
      // @ts-ignore
      type: 'RESO_QUEST_COMPLETED'
    });
  }
}
