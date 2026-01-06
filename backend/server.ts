import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Autorise tout le monde (dev)
app.use(express.json()); // Pour lire le JSON dans les requêtes

// Route de test
app.get('/', (req, res) => {
    res.send('Chrono-Command Backend is running.');
});

// Démarrage
app.listen(port, () => {
    console.log('Server is running on localhost, port'+port)
});