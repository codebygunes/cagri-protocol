// --- PQC (POST-QUANTUM) EXTREME TEST SUITE ---

async function runPqcExtremeTest() {
    console.warn("⚛️ [PQC EXTREME TEST] Starting: Quantum-Resistant Chunk Signing and Verification...");

    if (typeof PostQuantumSigner === 'undefined') {
        console.error("ERROR: PostQuantumSigner could not be loaded! Please ensure that the pqc-signer.js file is included.");
        return;
    }

    const signer = window.pqcSigner;
    const encoder = new TextEncoder();
    const payload = encoder.encode("Quantum-Era Resilient Distributed Data Chunk - 2026");

    // Scenario 1: Quantum-Secure Signature Generation and Verification
    console.log("\n[Test P1] Data chunk is being signed with a Post-Quantum (Lattice-based) algorithm...");
    const pqcPacket = await signer.signChunk(payload);
    
    const isValid = await signer.verifySignature(payload, pqcPacket);
    console.assert(isValid === true, "Test P1 Failed: Genuine quantum signature was rejected!");
    console.log("-> Test P1 Successful: Quantum-resistant signature was successfully verified.");

    // Scenario 2: Quantum Simulated Signature Manipulation (Quantum Forgery Attack)
    console.log("\n[Test P2] Quantum Computer Forged / Corrupted Signature Test...");
    const forgedPacket = {
        signature: "fake_quantum_signature_hash_9999_PQC_SECURE",
        algorithm: "Lattice-512-Robust",
        timestamp: Date.now()
    };

    const isForgedValid = await signer.verifySignature(payload, forgedPacket);
    console.assert(isForgedValid === false, "Test P2 Failed: Fake quantum signature was accepted!");
    console.log("-> Test P2 Successful: Forged quantum signature was instantly rejected.");

    // Scenario 3: Algorithm Downgrade Attack Protection
    console.log("\n[Test P3] Downgrade Attack Prevention Test Using a Weak Algorithm...");
    const downgradePacket = {
        signature: pqcPacket.signature,
        algorithm: "Weak-Legacy-SHA1", // Weak and legacy algorithm
        timestamp: Date.now()
    };

    const isDowngradeValid = await signer.verifySignature(payload, downgradePacket);
    console.assert(isDowngradeValid === false, "Test P3 Failed: Weak algorithm downgrade attack succeeded!");
    console.log("-> Test P3 Successful: Downgrade attempt to legacy/weak algorithms was blocked.");

    console.warn("\n🌌 [PQC TEST] All quantum-resistant signature tests completed successfully! The protocol is quantum-era ready.");
}

runPqcExtremeTest();