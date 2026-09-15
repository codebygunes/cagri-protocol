# 🌐 Çağrı Protocol

**A Hyper-Decentralized, Post-Quantum P2P Execution and Serving Layer for the Polkadot / Substrate Ecosystem.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Status: PoC](https://img.shields.io/badge/Status-Proof_of_Concept-orange.svg)]()
[![Ecosystem: Polkadot](https://img.shields.io/badge/Ecosystem-Polkadot-e6007a.svg)]()

## 📖 Overview

**Çağrı Protocol** is an advanced off-chain execution and peer-to-peer (P2P) communication layer engineered for the Web3 ecosystem. By bridging WebRTC's browser-to-browser capabilities with Substrate's robust consensus mechanisms, Çağrı Protocol eliminates the need for centralized hosting while providing a secure, trustless environment for decentralized applications (dApps).

This protocol empowers users to serve, execute, and validate data and WebAssembly (WASM) smart contracts entirely off-chain within a sandboxed browser environment, periodically anchoring state roots to the Polkadot network for absolute finality.

## ✨ Core Features

*   **Hyper-Decentralized P2P Mesh:** Utilizes WebRTC `RTCDataChannel` to establish direct, high-throughput browser-to-browser connections. No central servers are required for data transfer after the initial signaling phase.
*   **Post-Quantum Cryptography (PQC):** Implements Lattice-based quantum-resistant algorithms (`Lattice-512-Robust`) to secure state transitions, chunk signing, and peer validation, future-proofing the network against advanced cryptographic threats.
*   **Zero-Knowledge Proofs (ZKP):** Integrates simulated zk-SNARKs for anonymous peer authentication. Nodes can prove network legitimacy and process commitments without ever exposing their IP addresses or raw session tokens.
*   **In-Browser WASM VM:** Executes smart contracts and computational payloads locally within a secure WebAssembly sandbox, enabling trustless off-chain computations.
*   **Sybil-Resistant Incentive Mechanism:** Features a built-in reputation and badge system that dynamically rewards peers for bandwidth contribution (seeding) and node uptime.

## 🏗 Architecture

1.  **Bootstrap & Signaling:** Peers discover each other via a lightweight WebSocket signaling relay.
2.  **P2P Channel Establishment:** WebRTC SDP and ICE candidates are exchanged to open a direct, encrypted tunnel between browsers.
3.  **Data Chunking & Validation:** Payloads are fragmented, hashed (SHA-256 / SHA-384), and streamed. Incoming chunks are verified on the fly against a strict cryptographic manifest to prevent Byzantine and DoS attacks.
4.  **Off-Chain Execution:** The integrated WASM VM executes the logic, generating a deterministic state hash.
5.  **Substrate Settlement (Roadmap):** The finalized state hash is anchored to a Substrate-based blockchain for immutable consensus.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16.x or higher)
*   A modern web browser with WebRTC and WebAssembly support (Chrome, Firefox, Brave).

### Installation & Local Setup

1. Clone the repository:
    git clone https://github.com/codebygunes/cagri-protocol.git
    cd cagri-protocol

2. Install dependencies:
    npm install

3. Start the local Signaling Server:
    node server.js
    (The server will start on ws://localhost:8080)

4. Launch the Client:
    Open the provided index.html (or your specific test HTML files) in multiple browser windows to simulate the P2P network.

## 🧪 Extreme Test Suites

Çağrı Protocol includes a series of rigorous, browser-based "Nightmare" tests to demonstrate cryptographic resilience and network stability. To run these tests, open the browser's Developer Console (F12) while running the respective HTML files:

*   **Resilience & DoS Test:** Verifies on-the-fly chunk integrity against malicious Byzantine injections.
*   **ZKP Extreme Test:** Simulates Zero-Knowledge authentication, time-skew protection, and replay-attack prevention.
*   **PQC Extreme Test:** Audits Lattice-based signature generation and downgrade-attack prevention.
*   **WASM Extreme Test:** Validates smart contract execution, state consensus, and sandbox memory protection.
*   **Sybil & Eclipse Simulation:** Ensures the protocol filters out poisonous data floods from malicious peers.

## 🛣 Roadmap & Web3 Foundation Grant

This repository represents the architectural Proof of Concept (PoC) written in JavaScript to validate the WebRTC, ZKP, PQC, and WASM implementations in a client-side environment. 

The next phase, supported by our **Web3 Foundation Grant Proposal**, involves transitioning this protocol into a production-ready **Rust** implementation utilizing `libp2p`, Substrate pallets, and real-world testnet integration.

*Details regarding the grant proposal can be found in `applications/cagri-protocol.md`.*

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
