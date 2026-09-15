class P2PHostClient {
    constructor(signalingUrl) {
        this.signalingUrl = signalingUrl;
        this.peerConnection = null;
        this.dataChannel = null;
        this.ws = null;
        this.receivedChunks = [];
        this.incomingFileMeta = null;

        // STUN server configuration (For NAT traversal)
        this.rtcConfig = {
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        };
    }

    // Connect to the signaling server and initiate WebRTC signaling
    connectSignaling() {
        this.ws = new WebSocket(this.signalingUrl);

        this.ws.onopen = () => {
            console.log('Connected to the signaling server.');
        };

        this.ws.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            
            if (!this.peerConnection) {
                this.createPeerConnection(false);
            }

            if (message.sdp) {
                await this.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
                if (message.sdp.type === 'offer') {
                    const answer = await this.peerConnection.createAnswer();
                    await this.peerConnection.setLocalDescription(answer);
                    this.ws.send(JSON.stringify({ sdp: this.peerConnection.localDescription }));
                }
            } else if (message.ice) {
                try {
                    await this.peerConnection.addIceCandidate(new RTCIceCandidate(message.ice));
                } catch (e) {
                    console.error('Error adding ICE candidate:', e);
                }
            }
        };
    }

    // Create PeerConnection object and bind events
    createPeerConnection(isInitiator) {
        this.peerConnection = new RTCPeerConnection(this.rtcConfig);

        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.ws.send(JSON.stringify({ ice: event.candidate }));
            }
        };

        if (isInitiator) {
            // The side initiating the data channel (Host/Seed)
            this.dataChannel = this.peerConnection.createDataChannel('file-transfer');
            this.setupDataChannelEvents();
        } else {
            // The side expecting the data channel from the peer (Client)
            this.peerConnection.ondatachannel = (event) => {
                this.dataChannel = event.channel;
                this.setupDataChannelEvents();
            };
        }
    }

    // Manage Data Channel (RTCDataChannel) events and assembly logic
    setupDataChannelEvents() {
        this.dataChannel.onopen = () => {
            console.log('WebRTC DataChannel opened. Data transfer can proceed.');
        };

        this.dataChannel.onmessage = (event) => {
            // Incoming data can be text (metadata) or binary (chunk)
            if (typeof event.data === 'string') {
                const packet = JSON.parse(event.data);
                if (packet.type === 'meta') {
                    this.incomingFileMeta = packet;
                    this.receivedChunks = [];
                    console.log(`File transfer starting: ${packet.name} (${packet.size} bytes)`);
                }
            } else {
                // Binary data piece (Chunk)
                this.receivedChunks.push(event.data);
                console.log(`Chunk received. Total chunks: ${this.receivedChunks.length}`);

                // If all chunks have arrived, assemble the file
                if (this.incomingFileMeta && this.receivedChunks.length === this.incomingFileMeta.totalChunks) {
                    this.assembleAndVerifyFile();
                }
            }
        };
    }

    // Assemble incoming data chunks in browser memory (Blob)
    assembleAndVerifyFile() {
        console.log('All chunks received, assembling file...');
        const completeBlob = new Blob(this.receivedChunks, { type: this.incomingFileMeta.mimeType });
        
        // Route to the Loader class for Phase 4 integration
        if (window.fileLoader) {
            window.fileLoader.verifyAndRender(completeBlob, this.incomingFileMeta.expectedHash);
        }
    }

    // Host side: Function to initiate the connection and send file chunks
    async startHostingAsInitiator(fileData, metaInfo) {
        this.createPeerConnection(true);

        this.dataChannel.onopen = async () => {
            console.log('Host connected, sending file metadata and chunks...');
            
            // Send metadata first
            this.dataChannel.send(JSON.stringify({ type: 'meta', ...metaInfo }));

            // Send the file in chunks (e.g., 16KB per chunk)
            const chunkSize = 16384;
            for (let i = 0; i < fileData.byteLength; i += chunkSize) {
                const chunk = fileData.slice(i, i + chunkSize);
                this.dataChannel.send(chunk);
            }
            console.log('All file chunks transferred to the peer.');
        };

        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        
        // Wait for the signaling server connection to open
        setTimeout(() => {
            this.ws.send(JSON.stringify({ sdp: this.peerConnection.localDescription }));
        }, 1000);
    }
}