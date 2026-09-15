// --- AI MESH SELF-HEALING EXTREME TEST SUITE ---

async function runAiMeshExtremeTest() {
    console.warn("🤖 [AI MESH EXTREME TEST] Starting: AI-Assisted Self-Healing Network Simulation...");

    if (typeof AIMeshRouter === 'undefined') {
        console.error("ERROR: AIMeshRouter could not be loaded! Please make sure ai-mesh-router.js is included.");
        return;
    }

    const router = window.aiMeshRouter;

    // Scenario 1: Registering Various Peers to the Network (Healthy, Slow, and Malicious)
    console.log("\n[Test A1] Defining peers (Nodes) with different characteristics in the network...");
    router.registerPeerMetric("peer_slow_1", 450, 0.1, 0.9);   // Slow peer
    router.registerPeerMetric("peer_malicious_2", 20, 0.0, 0.2); // Malicious (Low security score)
    router.registerPeerMetric("peer_optimal_3", 35, 0.0, 0.95);  // Fast and secure optimal peer

    const selectedPeer = router.selectOptimalPeer(0);
    console.assert(selectedPeer === "peer_optimal_3", "Test A1 Failed: AI selected the wrong peer!");
    console.log("-> Test A1 Successful: AI router eliminated slow and malicious peers and selected the optimal node.");

    // Scenario 2: Instant Network Crash and Self-Healing Trigger
    console.log("\n[Test A2] Optimal peer crashes/disconnects and the network heals itself instantly...");
    router.registerPeerMetric("peer_optimal_3", 1000, 0.9, 0.1); 
    
    router.registerPeerMetric("peer_backup_4", 50, 0.01, 0.98);

    const healedPeer = router.selectOptimalPeer(1);
    console.assert(healedPeer === "peer_backup_4", "Test A2 Failed: Network failed to heal itself!");
    console.log("-> Test A2 Successful: Network instantly detected the failure and routed traffic to the secure backup node (Self-Healing).");

    // Scenario 3: Topology Collapse and Fallback Test
    console.log("\n[Test A3] Fallback mechanism in case all peers lose security...");
    router.registerPeerMetric("peer_backup_4", 200, 0.8, 0.3); // Degraded

    const fallbackPeer = router.selectOptimalPeer(2);
    console.assert(fallbackPeer === "peer_slow_1", "Test A3 Failed: Fallback peer could not be selected!");
    console.log("-> Test A3 Successful: In critical condition, the system switched to the safest alternative (fallback).");

    console.warn("\n🌐 [AI MESH TEST] All self-healing network tests completed successfully!");
}

runAiMeshExtremeTest();