import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const port = 3000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
    }
});

// Middleware
app.use(cors()); // Autorise tout le monde (dev)
app.use(express.json()); // Pour lire le JSON dans les requêtes

// Démarrage
httpServer.listen(port, () => {
    console.log('Server is running on localhost, port'+port);
});

io.on('connection', (socket) => {
    console.log(`un client est connecté ${socket.id}`);
})

// Route de test
app.get('/', (req, res) => {
    res.send('Chrono-Command Backend is running.');
});

// Récupère les données via prisma et renvoie un JSON
app.get('/api/clocks', async (req, res, next) => {
    try {
        const clocks = await prisma.clock.findMany();
        res.json(clocks);
    } catch (e) {
        next(e);
    }
});

app.post('/api/clocks', async (req, res, next) => {
    try {
        const { name, room, timeShift, status} = req.body;
        const result = await prisma.clock.create({ data: { name, room, timeShift, status } });
        res.status(201).json({ message: 'Clock created', clock: result});
    } catch (e) {
        next(e);
    }
    
});

app.delete('/api/clocks/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.clock.delete({ where: { id: Number(id) } });
        res.json(result);
    } catch (e) {
        next(e);
    }
});

app.put('/api/clocks/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await prisma.clock.update({ where: { id: Number(id) }, data: req.body });
        io.emit('clock-updated', result);
    } catch (e) {
        next(e);
    }
});