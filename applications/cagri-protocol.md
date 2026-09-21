# W3F Grant Proposal: Çağrı Protocol (Phase 1: Core P2P Mesh & Reputation)

* **Project Name:** Çağrı Protocol
* **Team Name:** Autonomous Systems & Security Research
* **Payment Address:** TBD (To be provided privately upon grant approval)
* **[Level](https://github.com/w3f/Grants-Program#levels):** 2

## Project Overview :page_facing_up:

### Overview
Çağrı Protocol is a decentralized peer-to-peer (P2P) mesh communications layer engineered for the Polkadot / Substrate ecosystem. The overarching vision of the protocol is to create a fully sandboxed, post-quantum resilient off-chain execution environment. 

In this **Phase 1** grant proposal, we focus on establishing the foundational infrastructure: solving Byzantine topology degradation and enabling trustless, serverless WebRTC data channels anchored to Substrate. 

This phase addresses two critical challenges in decentralized edge networking:
1. **Resilient Data Chunking & Transfer:** Seamlessly transmitting payload arrays across a browser-to-browser P2P mesh without centralized signaling dependency after the initial handshake.
2. **Byzantine & Topology Degradation:** A heuristic AI-driven mesh router monitors peer health scores (latency, packet loss) to autonomously isolate malicious/slow nodes. Good behavior (uptime, bandwidth contribution) is recorded on-chain via a custom Substrate Pallet.

### Project Details

#### Architecture Overview

```text
+-------------------------------------------------------------------+
|                  Çağrı Protocol Stack (Phase 1)                   |
+-------------------------------------------------------------------+
|  Application Layer: Browser Client / DApps / Node Runners         |
|  Routing Layer:     Self-Healing Heuristic Mesh Router            |
|  Transport Layer:   libp2p (WebSockets / WebRTC DataChannels)     |
|  Consensus / State: Substrate Reputation & Slashing Pallet        |
+-------------------------------------------------------------------+
```

#### Core Components (Phase 1)
* **`cagri-core` (Rust):** High-performance networking core built on `libp2p`, implementing chunking, SHA-256 Merkle-tree validation, and asynchronous stream orchestration.
* **`cagri-router`:** Dynamic peer selection engine calculating peer health metrics to automatically isolate malicious nodes and trigger self-healing routes.
* **`pallet-cagri-reputation`:** Substrate runtime pallet tracking node uptime, verified bandwidth contributions, and slash/quarantine states on-chain.

### Ecosystem Fit
* **Where does it fit?** Network and Layer-2 infrastructure tooling for Substrate parachains and independent node runners.
* **Target Audience:** Substrate core developers and decentralized infrastructure operators requiring resilient P2P communication.
* **Use-Case Scenario:** Çağrı Protocol can be directly integrated as a serverless off-chain execution layer for decentralized exchange (DEX) dark pool order books or AI-intensive dApps on Polkadot.
* **Similar Projects:** libp2p, Waku. Çağrı differentiates itself by integrating an AI heuristic self-healing mesh and an on-chain Substrate reputation module out of the box.

---

## Team :busts_in_silhouette:

### Team members
* **Lead Engineer:** Elif Nur / Independent Systems & Security Engineer (`codebygunes`)

### Contact
* **Contact Name:** Elif Nur
* **Contact Email:** TBD (To be provided privately)
* **Website / GitHub:** [https://github.com/codebygunes](https://github.com/codebygunes)

### Legal Structure
* **Individual Application** (No legal entity required for Level 2 independent research).

### Team's experience
* Extensive track record in systems programming, low-level architecture, Rust, C++, LLVM toolchains, and formal verification methods (SMT solvers).
* Previous development includes custom hybrid language interpreters, peer-to-peer transport engines, and cryptographic verification suites.

---

## Development Status :nut_and_bolt:

A comprehensive behavioral **Proof-of-Concept (PoC)** has been designed and benchmarked in JavaScript/Node.js to validate core protocol invariants:
* Resilient data chunking and stream verification pipelines.
* AI heuristic mesh self-healing and automated quarantine under 80%+ simulated packet loss.
* Simulated tests for Sybil attacks, Eclipse topology poisoning, and recursive event-loop starvation.
* *Note: The PoC also includes simulated mockups for ZKP, PQC, and WASM environments, which are scheduled for Phase 2 implementation.*

**Grant Objective:** This grant will translate the validated Phase 1 architectural PoC into an industrial-grade, fully production-ready Rust framework integrated directly with Substrate and `libp2p`.

---

## Development Roadmap :nut_and_bolt:

### Overview
* **Total Estimated Duration:** 4 Months
* **Full-Time Equivalent (FTE):** 0.5 FTE
* **Total Costs:** $30,000 (Calculated at 300 Engineering Hours @ $100/hr)

---

### Milestone 1 — Core P2P Mesh Transport Layer

* **Estimated Duration:** 2 Months
* **FTE:** 0.5
* **Costs:** $15,000 (150 hours @ $100/hr)

| Number | Deliverable | Specification |
| -----: | ----------- | ------------- |
| **0a.** | License | Apache 2.0 / MIT dual license. |
| **0b.** | Documentation | Inline Rustdoc comments and an architectural specification guide for node integration. |
| **0c.** | Testing Guide | Complete unit and integration test suite with min. 85% code coverage for core transport. |
| **0d.** | Docker | Dockerfile containerizing a standalone Çağrı P2P bootstrap node. |
| **01.** | Rust P2P Core (`cagri-core`) | Native `libp2p` transport module implementing STUN/WebRTC data channel orchestration, deterministic packet chunking (16KB frames), and Merkle-tree validation pipelines. |
| **02.** | Anti-Replay Guard | Cryptographic timestamp verification mechanism mitigating basic clock-skew and stale injection attacks on the mesh. |

---

### Milestone 2 — Heuristic Mesh Router & Substrate Reputation Pallet

* **Estimated Duration:** 2 Months
* **FTE:** 0.5
* **Costs:** $15,000 (150 hours @ $100/hr)

| Number | Deliverable | Specification |
| -----: | ----------- | ------------- |
| **0a.** | License | Apache 2.0 / MIT dual license. |
| **0b.** | Documentation | Technical documentation detailing routing score algorithms and pallet dispatchables. |
| **0c.** | Testing Guide | Benchmarking scripts and automated CI test harness simulating dynamic node failures and 50-node Sybil packet floods. |
| **0d.** | Docker | Docker-compose setup running a Substrate test node alongside multiple simulated P2P mesh peers. |
| **01.** | AI Mesh Router (`cagri-router`) | Dynamic peer selection engine calculating peer health metrics (latency, packet loss) to automatically isolate malicious nodes and trigger self-healing routing paths. |
| **02.** | Substrate Pallet (`pallet-cagri-reputation`) | Custom Substrate runtime pallet recording verified bandwidth delivery, node uptime, reputation tiers (e.g., Active Node, Elite Seeder), and on-chain quarantine slashing. |

---

## Future Plans (Phase 2 & Beyond) :crystal_ball:

Once the core mesh networking and reputation layers are finalized, future grant proposals (Phase 2) will introduce the following advanced components to complete the ultimate Çağrı Protocol vision:
* **Zero-Knowledge Identity (`cagri-zkp`):** Production zk-SNARK membership verification circuits using `arkworks-rs` for completely anonymous node authentication without IP leakage.
* **Post-Quantum Cryptography (`cagri-pqc`):** Integrating lattice-based cryptographic signatures (ML-DSA / Dilithium) via `pqcrypto` bindings for ultimate payload tamper resistance.
* **WASM Execution Sandbox (`cagri-wasm`):** Embedded deterministic WebAssembly execution environment (based on `wasmi`/`wasmtime`) for verifiable off-chain contract computation and state consensus.
* **Live Testnet Deployment:** Functional deployment on a Polkadot/Kusama public testnet (e.g., Westend / Rococo).

---

## Additional Information :heavy_plus_sign:

* **How did you hear about the Grants Program?** Web3 Foundation GitHub Repository / Official Website.
* **Work done so far:** Complete behavioral architectural prototype in JavaScript, dynamic mesh heuristic models, extreme attack testing harnesses, and protocol specifications.