// ============================================================================
// DATADOG/TELEMETRY MOCK 
// We track system metrics, not user identities.
// Strictly anonymized telemetry logging.
// ============================================================================

export class AnonymizedMetrics {
  private static buffer: any[] = [];
  private static BATCH_SIZE = 50;

  static logEvent(eventName: string, metadata?: Record<string, number | boolean>) {
    // Strip string values to ensure no PII leaks into telemetry
    const sanitizedMetadata: Record<string, any> = {};
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        if (typeof value !== 'string') {
          sanitizedMetadata[key] = value;
        }
      });
    }

    this.buffer.push({
      event: eventName,
      timestamp: Date.now(),
      metrics: sanitizedMetadata
    });

    if (this.buffer.length >= this.BATCH_SIZE) {
      this.flush();
    }
  }

  static async flush() {
    if (this.buffer.length === 0) return;
    
    const payload = [...this.buffer];
    this.buffer = [];

    // In production, this posts to a highly secure ingress endpoint
    // console.log(`[SYS_TELEMETRY] Flushing ${payload.length} anonymized events.`);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 100));
  }
}
