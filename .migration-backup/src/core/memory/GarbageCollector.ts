// ============================================================================
// GARBAGE COLLECTOR / MEMORY MANAGER
// Real-time peer-to-peer applications leak memory. We manually track WebRTC 
// streams, audio buffers, and detached DOM nodes to force aggressive cleanup.
// ============================================================================

export class MemoryManager {
  private static instance: MemoryManager;
  private trackedNodes: WeakRef<any>[] = [];
  private collectionInterval: NodeJS.Timeout | null = null;
  private readonly MAX_HEAP_THRESHOLD = 50 * 1024 * 1024; // 50MB

  private constructor() {
    if (typeof window !== 'undefined') {
      this.startCollectionCycle();
    }
  }

  public static getInstance(): MemoryManager {
    if (!MemoryManager.instance) {
      MemoryManager.instance = new MemoryManager();
    }
    return MemoryManager.instance;
  }

  public track(object: any): void {
    if (typeof WeakRef !== 'undefined') {
      this.trackedNodes.push(new WeakRef(object));
    }
  }

  private startCollectionCycle() {
    this.collectionInterval = setInterval(() => {
      this.evaluateHeapState();
    }, 10000); // Check every 10s
  }

  private evaluateHeapState() {
    // @ts-ignore
    const performance = window.performance as any;
    if (performance && performance.memory) {
      const { usedJSHeapSize } = performance.memory;
      if (usedJSHeapSize > this.MAX_HEAP_THRESHOLD) {
        console.warn(`[SYS_MEM] Heap size critical (${Math.round(usedJSHeapSize / 1024 / 1024)}MB). Forcing aggressive sweep.`);
        this.forceSweep();
      }
    }
  }

  private forceSweep() {
    const activeRefs: WeakRef<any>[] = [];
    let collectedCount = 0;

    for (const ref of this.trackedNodes) {
      const obj = ref.deref();
      if (obj === undefined) {
        // Node was naturally garbage collected
        collectedCount++;
      } else {
        // Force teardown on heavy objects if they implement destroy()
        if (typeof obj.destroy === 'function' && obj.isStale) {
          obj.destroy();
          collectedCount++;
        } else {
          activeRefs.push(ref);
        }
      }
    }

    this.trackedNodes = activeRefs;
    if (collectedCount > 0) {
      console.log(`[SYS_MEM] Purged ${collectedCount} stale references from heap.`);
    }
  }

  public shutdown() {
    if (this.collectionInterval) {
      clearInterval(this.collectionInterval);
    }
  }
}
