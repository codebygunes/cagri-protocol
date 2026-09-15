class SecureDecentralizedLoader {
    constructor(manifest) {
        // manifest: Contains the list of original SHA-256 hashes for each chunk of the file
        this.manifest = manifest; 
        this.receivedChunks = [];
        this.currentChunkIndex = 0;
        window.fileLoader = this;
    }

    // Verify each incoming chunk instantly (on the fly)
    async verifyAndPushChunk(chunkBuffer, index) {
        try {
            // Step 1: Calculate the cryptographic hash of the incoming chunk
            const hashBuffer = await crypto.subtle.digest('SHA-256', chunkBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // Step 2: Compare with the expected hash from the manifest
            if (calculatedHash !== this.manifest.chunkHashes[index]) {
                console.error(`SECURITY VIOLATION: Chunk ${index} is manipulated or fake! Rejecting.`);
                return false; 
            }

            // Step 3: If the chunk is valid, safely add it to the queue
            this.receivedChunks[index] = chunkBuffer;
            console.log(`Chunk ${index} verified and accepted.`);
            return true;
        } catch (error) {
            console.error('Instant chunk verification error:', error);
            return false;
        }
    }

    // Assemble the file once all chunks are received
    assembleVerifiedFile() {
        if (this.receivedChunks.length === this.manifest.totalChunks) {
            console.log('All chunks successfully verified, assembling file...');
            const completeBlob = new Blob(this.receivedChunks, { type: this.manifest.mimeType });
            this.renderContent(completeBlob);
        }
    }

    renderContent(fileBlob) {
        const url = URL.createObjectURL(fileBlob);
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.width = '100vw';
        iframe.style.height = '100vh';
        iframe.style.border = 'none';
        document.body.innerHTML = '';
        document.body.appendChild(iframe);
    }
}