import { Entity } from "../../core/cqrs/Entity";
import { User } from "./User";

export interface ResonanceCircleProps {
  topic: string;
  maxCapacity: number;
  participants: Set<string>; // User IDs
  isEncrypted: boolean;
  activeModeratorId: string; // The AI moderator node ID
  createdAt: Date;
}

export class ResonanceCircle extends Entity<ResonanceCircleProps> {
  private constructor(props: ResonanceCircleProps, id?: string) {
    super(props, id);
  }

  public static create(props: ResonanceCircleProps, id?: string): ResonanceCircle {
    if (props.maxCapacity > 6) {
      throw new Error("Circles must remain intimate. Max capacity exceeded.");
    }
    return new ResonanceCircle(props, id);
  }

  public join(userId: string): void {
    if (this.props.participants.size >= this.props.maxCapacity) {
      throw new Error("Circle capacity reached.");
    }

    if (this.props.participants.has(userId)) {
      return;
    }

    this.props.participants.add(userId);

    this.addDomainEvent({
      dateTimeOccurred: new Date(),
      aggregateId: this.id,
      // @ts-ignore
      type: 'USER_JOINED_CIRCLE',
      userId: userId
    });
  }

  public leave(userId: string): void {
    this.props.participants.delete(userId);

    this.addDomainEvent({
      dateTimeOccurred: new Date(),
      aggregateId: this.id,
      // @ts-ignore
      type: 'USER_LEFT_CIRCLE',
      userId: userId
    });
  }

  public getParticipantCount(): number {
    return this.props.participants.size;
  }
}
