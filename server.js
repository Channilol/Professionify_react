require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/format', async (req, res) => {
    try {
        console.log('Richiesta ricevuta:', req.body); // Log della richiesta

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        console.log('Risposta da Anthropic:', data); // Log della risposta
        res.json(data);
    } catch (error) {
        console.log('Errore nel backend:', error); // Log errori
        res.status(500).json({ error: error.message });
    }
});

// Funzione per killare processi sulla porta
const killPort = (port) => {
    return new Promise((resolve) => {
        exec(`lsof -ti:${port} | xargs kill -9`, (error) => {
            resolve(); // Risolvi sempre, anche se c'è errore
        });
    });
};

// Avvia server con kill automatico
const startServer = async () => {
    try {
        await killPort(PORT);
        app.listen(PORT, () => {
            console.log(`🚀 Server avviato sulla porta ${PORT}`);
        });
    } catch (error) {
        console.error('Errore nell\'avvio del server:', error);
    }
};

startServer();