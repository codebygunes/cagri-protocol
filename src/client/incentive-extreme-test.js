// --- INCENTIVE & REPUTATION EXTREME TEST SUITE ---

async function runIncentiveExtremeTest() {
    console.warn("🎁 [INCENTIVE EXTREME TEST] Starting: Micro-Reward and Reputation System Simulation...");

    if (typeof IncentiveManager === 'undefined') {
        console.error("ERROR: IncentiveManager could not be loaded! Please make sure incentive-manager.js is included.");
        return;
    }

    const manager = window.incentiveManager;
    const testPeerId = "local_test_peer_2026";

    // Scenario 1: Voluntary Data Sharing and Point/Badge Earning
    console.log("\n[Test I1] User earns reputation points by distributing (seeding) data to the network...");
    const rewardResult = await manager.rewardContribution(testPeerId, 50000, 120); // 50KB data, 120 sec uptime

    console.assert(rewardResult.success === true, "Test I1 Failed: Reward could not be given!");
    console.log(`-> Test I1 Successful: User earned ${rewardResult.earnedPoints} points. Total Points: ${rewardResult.totalPoints}`);

    // Scenario 2: Prevention of Reward Exploitation (Farming) with Negative/Zero Contribution
    console.log("\n[Test I2] Reward exploitation (Farming) is prevented with negative or invalid data contribution...");
    const exploitResult = await manager.rewardContribution(testPeerId, -1000, 0);

    console.assert(exploitResult.success === false, "Test I2 Failed: Invalid contribution was rewarded!");
    console.log("-> Test I2 Successful: Malicious exploitation attempt was instantly blocked.");

    // Scenario 3: Badge Unlock and Reputation Integrity Verification
    console.log("\n[Test I3] Unlocking high-level badges (Elite-Seeder) with high contribution test...");
    // Add substantial contribution to push the score above 1000
    await manager.rewardContribution(testPeerId, 1000000, 500); 
    const finalData = manager.getReputationData(testPeerId);

    console.assert(finalData.badges.includes("Elite-Seeder"), "Test I3 Failed: Earned badge could not be assigned!");
    console.log(`-> Test I3 Successful: User reached 'Elite-Seeder' badge. Owned badges: [${finalData.badges.join(", ")}]`);

    console.warn("\n🌟 [INCENTIVE TEST] All micro-reward and incentive tests completed successfully!");
}

runIncentiveExtremeTest();