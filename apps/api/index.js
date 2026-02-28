import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'wave-match-api' });
});

app.get('/api/matches', (req, res) => {
    // Placeholder response
    res.json([
        { id: 1, name: 'David S.', role: 'Investor', matchPercent: 96 }
    ]);
});

app.listen(port, () => {
    console.log(`API Service listening at http://localhost:${port}`);
});
