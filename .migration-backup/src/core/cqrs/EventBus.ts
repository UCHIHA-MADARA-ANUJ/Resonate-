import { DomainEvent } from "../../core/cqrs/Entity";

type EventHandler = (event: DomainEvent) => Promise<void>;

export class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();
  private static instance: EventBus;

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe(eventType: string, handler: EventHandler): void {
    const currentHandlers = this.handlers.get(eventType) || [];
    currentHandlers.push(handler);
    this.handlers.set(eventType, currentHandlers);
  }

  public async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      // @ts-ignore
      const eventType = event.type; 
      if (eventType) {
        const eventHandlers = this.handlers.get(eventType) || [];
        // Execute handlers concurrently
        await Promise.all(eventHandlers.map(handler => handler(event)));
      }
    }
  }
}
