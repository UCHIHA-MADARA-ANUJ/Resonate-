export interface DomainEvent {
  dateTimeOccurred: Date;
  aggregateId: string;
}

export abstract class Entity<T> {
  protected readonly _id: string;
  public readonly props: T;
  private _domainEvents: DomainEvent[] = [];

  constructor(props: T, id?: string) {
    this._id = id ? id : crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
