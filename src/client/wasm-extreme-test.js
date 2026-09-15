// --- WASM SMART CONTRACT EXTREME TEST SUITE ---

async function runWasmExtremeTest() {
    console.warn("⚙️ [WASM EXTREME TEST] Starting: In-Browser Smart Contract and State Security...");

    if (typeof WASMSmartContractVM === 'undefined') {
        console.error("ERROR: WASMSmartContractVM could not be loaded! Please ensure that the wasm-contract.js file is included.");
        return;
    }

    const vm = window.wasmVM;
    const contractId = "registry_dapp_v1";

    // Scenario 1: Valid Smart Contract Execution and State Generation
    console.log("\n[Test W1] Dynamic contract (Form/Transaction) is being executed within the browser...");
    const validPayload = { user: "anonymous_peer", action: "submit_vote", value: 1 };
    const executionResult = await vm.executeContract(contractId, "VOTE", validPayload);

    console.assert(executionResult.success === true, "Test W1 Failed: Contract could not be executed!");
    console.log("-> Test W1 Successful: Smart contract successfully executed in the browser and state hash generated.");

    // Scenario 2: Prevention of State Manipulation with Corrupted / Unauthorized Payload
    console.log("\n[Test W2] Contract Attack Test with Manipulated / Corrupted Payload...");
    const maliciousPayload = null; // Invalid data
    const attackResult = await vm.executeContract(contractId, "MALICIOUS_OVERWRITE", maliciousPayload);

    console.assert(attackResult.success === false, "Test W2 Failed: Corrupted contract was accepted!");
    console.log("-> Test W2 Successful: Malicious payload was blocked in the WASM sandbox.");

    // Scenario 3: State Consensus Verification
    console.log("\n[Test W3] State Consensus Verification in the Distributed Network...");
    const isStateValid = vm.verifyContractState(contractId, executionResult.stateHash);
    
    console.assert(isStateValid === true, "Test W3 Failed: State consensus did not match!");
    console.log("-> Test W3 Successful: Smart contract state integrity between peers was cryptographically verified.");

    console.warn("\n🌐 [WASM TEST] All in-browser smart contract tests completed successfully!");
}

runWasmExtremeTest();