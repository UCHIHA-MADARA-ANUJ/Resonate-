// ============================================================================
// CRDT (Conflict-Free Replicated Data Type) ENGINE
// Local-first architecture. When teens go offline, they can still journal.
// Data magically syncs without merge conflicts when they regain connection.
// ============================================================================

export class VectorClock {
  private clocks: Map<string, number>;
  public readonly clientId: string;

  constructor(clientId: string, initialClocks?: Record<string, number>) {
    this.clientId = clientId;
    this.clocks = new Map(Object.entries(initialClocks || {}));
    if (!this.clocks.has(clientId)) {
      this.clocks.set(clientId, 0);
    }
  }

  public increment(): void {
    const current = this.clocks.get(this.clientId) || 0;
    this.clocks.set(this.clientId, current + 1);
  }

  public get(id: string): number {
    return this.clocks.get(id) || 0;
  }

  public merge(other: VectorClock): void {
    other.clocks.forEach((value, id) => {
      const localValue = this.get(id);
      this.clocks.set(id, Math.max(localValue, value));
    });
  }

  public toJSON(): Record<string, number> {
    const result: Record<string, number> = {};
    this.clocks.forEach((value, key) => { result[key] = value; });
    return result;
  }

  // Returns 1 if this > other, -1 if this < other, 0 if concurrent
  public compare(other: VectorClock): number {
    let isGreater = false;
    let isLess = false;

    const allKeys = new Set([...this.clocks.keys(), ...other.clocks.keys()]);

    allKeys.forEach(key => {
      const v1 = this.get(key);
      const v2 = other.get(key);
      if (v1 > v2) isGreater = true;
      if (v1 < v2) isLess = true;
    });

    if (isGreater && !isLess) return 1;
    if (isLess && !isGreater) return -1;
    return 0; // Concurrent or identical
  }
}

export class LWWMap<T> {
  private state: Map<string, { value: T, timestamp: number, clock: VectorClock }>;
  private readonly clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.state = new Map();
  }

  public set(key: string, value: T): void {
    const existing = this.state.get(key);
    const clock = existing ? new VectorClock(this.clientId, existing.clock.toJSON()) : new VectorClock(this.clientId);
    clock.increment();
    
    this.state.set(key, {
      value,
      timestamp: Date.now(),
      clock
    });
  }

  public get(key: string): T | undefined {
    return this.state.get(key)?.value;
  }

  public merge(otherState: Map<string, { value: T, timestamp: number, clock: VectorClock }>): void {
    otherState.forEach((otherData, key) => {
      const localData = this.state.get(key);
      
      if (!localData) {
        this.state.set(key, otherData);
      } else {
        const cmp = localData.clock.compare(otherData.clock);
        if (cmp === -1) {
          // Other is strictly newer
          this.state.set(key, otherData);
        } else if (cmp === 0) {
          // Concurrent, resolve via Wall Clock timestamp fallback
          if (otherData.timestamp > localData.timestamp) {
            this.state.set(key, otherData);
          } else if (otherData.timestamp === localData.timestamp && otherData.clock.clientId > localData.clock.clientId) {
            // Ultimate fallback (node ID string comparison)
            this.state.set(key, otherData);
          }
        }
      }
    });
  }

  public serialize() {
    const exportData: any = {};
    this.state.forEach((data, key) => {
      exportData[key] = {
        value: data.value,
        timestamp: data.timestamp,
        clock: data.clock.toJSON()
      };
    });
    return JSON.stringify(exportData);
  }
}
