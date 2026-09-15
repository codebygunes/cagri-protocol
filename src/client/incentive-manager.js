class IncentiveManager {
    constructor() {
        this.storageKey = "hyper_decentralized_reputation_v1";
        window.incentiveManager = this;
    }

    // Reward reputation points and badges based on the user's contribution to the network
    async rewardContribution(peerId, bytesShared, uptimeSeconds) {
        try {
            if (bytesShared <= 0 || uptimeSeconds <= 0) {
                return { success: false, error: "Invalid contribution metrics" };
            }

            // Points calculation formula: Fair reward based on shared data and uptime
            const earnedPoints = Math.floor((bytesShared / 1024) + (uptimeSeconds * 2));
            
            let currentData = this.getReputationData(peerId);
            currentData.totalPoints += earnedPoints;
            currentData.totalBytesShared += bytesShared;
            currentData.contributionsCount += 1;

            // Badge tiers (Milestones)
            if (currentData.totalPoints >= 1000 && !currentData.badges.includes("Elite-Seeder")) {
                currentData.badges.push("Elite-Seeder");
                console.log("🏅 [Incentive] Congratulations! You've earned the 'Elite-Seeder' badge.");
            } else if (currentData.totalPoints >= 100 && !currentData.badges.includes("Active-Node")) {
                currentData.badges.push("Active-Node");
                console.log("🥈 [Incentive] Congratulations! You've earned the 'Active-Node' badge.");
            }

            localStorage.setItem(this.storageKey + "_" + peerId, JSON.stringify(currentData));

            return {
                success: true,
                earnedPoints: earnedPoints,
                totalPoints: currentData.totalPoints,
                badges: currentData.badges
            };
        } catch (error) {
            console.error("[Incentive Manager] Reward error:", error);
            return { success: false, error: error.message };
        }
    }

    // Retrieve the user's current reputation and badge data
    getReputationData(peerId) {
        try {
            const rawData = localStorage.getItem(this.storageKey + "_" + peerId);
            if (!rawData) {
                return { totalPoints: 0, totalBytesShared: 0, contributionsCount: 0, badges: ["Newcomer"] };
            }
            return JSON.parse(rawData);
        } catch (error) {
            return { totalPoints: 0, totalBytesShared: 0, contributionsCount: 0, badges: ["Newcomer"] };
        }
    }
}

// Initialize the Incentive Manager instance
const incentiveManager = new IncentiveManager();