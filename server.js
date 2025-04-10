const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Enable CORS for your front-end
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // for dev only
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/lookup', async (req, res) => {
    try {
        const upc = req.query.upc;
        const result = await axios.get('https://api.upcitemdb.com/prod/trial/lookup', {
            params: { upc }
        });
        res.json(result.data);
    } catch (error) {
        console.error('API error:', error);
        res.status(500).send({ error: 'API request failed' });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});

//BestBuy API Key n jm,/>>