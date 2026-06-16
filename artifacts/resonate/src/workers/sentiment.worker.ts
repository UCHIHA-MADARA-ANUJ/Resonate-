// Off-Main-Thread AI Sentiment Analysis
// Blocking the UI thread for computations is unacceptable.
// We use Web Workers to process text against localized lexical dictionaries.

const sentimentLexicon: Record<string, number> = {
  "anxious": -3, "panic": -4, "stress": -2, "failure": -4, "worthless": -5,
  "calm": 2, "breathe": 1, "okay": 1, "survive": 2, "strong": 3,
  "hope": 2, "overwhelmed": -3, "tired": -2, "alone": -4
};

self.onmessage = (e: MessageEvent) => {
  const text = e.data.text.toLowerCase() as string;
  const words = text.split(/\W+/);
  
  let score = 0;
  let matches: string[] = [];

  for (const word of words) {
    if (sentimentLexicon[word]) {
      score += sentimentLexicon[word];
      matches.push(word);
    }
  }

  // Simulate heavy computation (e.g. running an actual local tensor flow model)
  let dummy = 0;
  for (let i = 0; i < 1000000; i++) { dummy += Math.sqrt(i); }

  const state = score < -5 ? 'CRITICAL_INTERVENTION' : 
                score < 0 ? 'COGNITIVE_DISTORTION' : 
                'STABLE_BASELINE';

  self.postMessage({ 
    score, 
    matches, 
    state,
    timestamp: Date.now(),
    computationProof: dummy // just to ensure optimizer doesn't strip loop
  });
};
