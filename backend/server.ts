import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Autorise tout le monde (dev)
app.use(express.json()); // Pour lire le JSON dans les requêtes

// Démarrage
app.listen(port, () => {
    console.log('Server is running on localhost, port'+port)
});

// Route de test
app.get('/', (req, res) => {
    res.send('Chrono-Command Backend is running.');
});

app.get('/api/clocks', async (req, res, next) => {
    try {
        const clocks = await prisma.clock.findMany();
        res.json(clocks);
    } catch (e) {
        next(e)
    }
});

