class AIMeshRouter {
    constructor() {
        this.peerRegistry = new Map();
        window.aiMeshRouter = this;
    }

    registerPeerMetric(peerId, latencyMs, packetLossRate, securityScore) {
        this.peerRegistry.set(peerId, {
            latency: latencyMs,
            packetLoss: packetLossRate,
            security: securityScore,
            healthScore: (1000 / (latencyMs + 1)) * (1 - packetLossRate) * securityScore,
            lastUpdated: Date.now()
        });
    }

    selectOptimalPeer(chunkIndex) {
        if (this.peerRegistry.size === 0) {
            console.warn("[AI Mesh] No active peers found!");
            return null;
        }

        let bestPeer = null;
        let maxScore = -1;

        for (const [peerId, metrics] of this.peerRegistry.entries()) {
            // Strictly filter out peers with a security threshold below 0.7 or high packet loss
            if (metrics.security < 0.7 || metrics.packetLoss > 0.5) {
                console.warn(`[AI Mesh Quarantine] Risky peer isolated -> ID: ${peerId}`);
                continue;
            }

            if (metrics.healthScore > maxScore) {
                maxScore = metrics.healthScore;
                bestPeer = peerId;
            }
        }

        // If no peers pass the security filter, return null (Critical Security Protection)
        if (!bestPeer) {
            console.error("[AI Mesh] No secure and healthy peers left in the network! Data flow halted.");
            return null;
        }

        console.log(`[AI Mesh Optimization] Optimal and secure peer selected for chunk ${chunkIndex} -> ${bestPeer} (Score: ${maxScore.toFixed(2)})`);
        return bestPeer;
    }
}

const aiMeshRouter = new AIMeshRouter();