// Real-time Peer-to-Peer Mesh Network Topology for "Resonance Circles"
// Centralized servers for chat are for amateurs. We decentralize the connections.

export class PeerTopologyMesh {
  private peers: Map<string, RTCPeerConnection> = new Map();
  private dataChannels: Map<string, RTCDataChannel> = new Map();
  private localStream: MediaStream | null = null;
  private config: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  constructor(private userId: string) {
    if (typeof window === 'undefined') return;
  }

  public async initializeLocalStream() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    } catch (e) {
      console.error("Microphone access denied. Fallback to text-only node.");
    }
  }

  public createNode(targetPeerId: string): RTCPeerConnection {
    const pc = new RTCPeerConnection(this.config);
    this.peers.set(targetPeerId, pc);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.emitSignal('ice-candidate', targetPeerId, event.candidate);
      }
    };

    pc.ontrack = (event) => {
      // In a real app, bind this stream to an <audio> element.
      this.handleIncomingStream(targetPeerId, event.streams[0]);
    };

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream!);
      });
    }

    const dc = pc.createDataChannel('resonance-state');
    this.setupDataChannel(targetPeerId, dc);

    return pc;
  }

  private setupDataChannel(peerId: string, dc: RTCDataChannel) {
    dc.onopen = () => console.log(`Data channel open with ${peerId}`);
    dc.onmessage = (e) => this.processPeerMessage(peerId, e.data);
    this.dataChannels.set(peerId, dc);
  }

  private handleIncomingStream(peerId: string, stream: MediaStream) {
    console.log(`[Mesh] Receiving audio stream from ${peerId}`);
  }

  private processPeerMessage(peerId: string, data: string) {
    console.log(`[Mesh] Message from ${peerId}: ${data}`);
  }

  private emitSignal(type: string, target: string, payload: any) {
    // This is where we'd emit to a signaling server (e.g. Socket.io / Supabase)
    // console.log(`Emit ${type} to ${target}`);
  }

  public broadcast(message: string) {
    this.dataChannels.forEach(dc => {
      if (dc.readyState === 'open') {
        dc.send(JSON.stringify({ sender: this.userId, msg: message, timestamp: Date.now() }));
      }
    });
  }

  public killNode(peerId: string) {
    this.peers.get(peerId)?.close();
    this.peers.delete(peerId);
    this.dataChannels.delete(peerId);
  }

  public destroyMesh() {
    this.peers.forEach(pc => pc.close());
    this.peers.clear();
    this.dataChannels.clear();
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
    }
  }
}
