const express = require('express');
const { RubberPrice, Order, sequelize } = require('./models');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Function to broadcast price updates to all connected clients
const broadcastPriceUpdate = (priceUpdate) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(priceUpdate));
        }
    });
};

// API endpoint for creating a rubber price
app.post('/api/rubber-prices', async (req, res) => {
    const { type, price, date } = req.body;
    try {
        const rubberPrice = await RubberPrice.create({ type, price, date });
        broadcastPriceUpdate(rubberPrice);
        res.status(201).json(rubberPrice);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// API endpoint for creating an order
app.post('/api/orders', async (req, res) => {
    const { type, quantity, userId } = req.body;
    try {
        const order = await Order.create({ type, quantity, userId });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sync and start the server
const startServer = async () => {
    await sequelize.sync();
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
