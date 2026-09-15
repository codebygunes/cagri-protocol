const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

console.log('Signaling server is running on ws://localhost:8080...');

wss.on('connection', (ws) => {
    console.log('A new client connected.');

    ws.on('message', (message) => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.error('Invalid JSON format:', message);
            return;
        }

        // Forward the incoming message to all other clients in the room or on the server (Broadcast / Relay)
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    ws.on('close', () => {
        console.log('Client connection closed.');
    });
});