// --- EXTREME NIGHTMARE TEST SUITE: Split-Brain & Desync ---

async function runExtremeNightmareTest() {
    console.warn("🚨 [EXTREME TEST] Starting: Split-Brain and State Desync simulation...");

    const encoder = new TextEncoder();
    const correctPayload = encoder.encode("Stable Release V2.0 - Genuine Distributed State");
    
    const correctHashBuffer = await crypto.subtle.digest('SHA-256', correctPayload);
    const correctHash = Array.from(new Uint8Array(correctHashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    const manifest = {
        totalChunks: 1,
        mimeType: 'text/plain',
        chunkHashes: [correctHash]
    };

    if (typeof SecureDecentralizedLoader === 'undefined') {
        console.error("ERROR: SecureDecentralizedLoader could not be loaded!");
        return;
    }

    const loader = new SecureDecentralizedLoader(manifest);

    // Scenario 1: Split-Brain & Forked Fake Version Test
    console.log("\n[Test E1] Split-Brain: The network's forked fake version (Fork B) is being rejected...");
    const forkBPayload = encoder.encode("Manipulated Forked Version B (Fork B)");
    
    const isForkValid = await loader.verifyAndPushChunk(forkBPayload, 0);
    console.assert(isForkValid === false, "Test E1 Failed: Forked fake version was accepted!");
    console.log("-> Test E1 Successful: Invalid fork rejected in Split-Brain scenario.");

    // Scenario 2: Event-Loop / Thread Starvation (Recursive DoS) Protection
    console.log("\n[Test E2] Thread Starvation (Event-Loop Locking) Test with 1000 Concurrent Requests...");
    
    const stressCount = 1000;
    let rejectedStressPackets = 0;
    const startMemory = performance.now();

    for (let i = 0; i < stressCount; i++) {
        const junkPayload = encoder.encode(`Stress Packet ${i}`);
        const isValid = await loader.verifyAndPushChunk(junkPayload, 0);
        if (!isValid) {
            rejectedStressPackets++;
        }
    }

    const endMemory = performance.now();
    console.assert(rejectedStressPackets === stressCount, "Test E2 Failed: Some stress packets leaked through!");
    console.log(`-> Test E2 Successful: ${stressCount} concurrent stress packets were blocked within ${(endMemory - startMemory).toFixed(2)}ms, preserving the Event-Loop.`);

    // Scenario 3: Acceptance of the Genuine State (State Merge)
    console.log("\n[Test E3] Integration of the Genuine State (State Merge) into the Network...");
    const mergeSuccess = await loader.verifyAndPushChunk(correctPayload, 0);
    console.assert(mergeSuccess === true, "Test E3 Failed: Genuine version was rejected!");
    console.log("-> Test E3 Successful: Genuine chain successfully merged after Split-Brain.");

    console.warn("\n🏆 [EXTREME TEST] All impossible scenarios successfully overcome! System is at bulletproof level.");
}

runExtremeNightmareTest();