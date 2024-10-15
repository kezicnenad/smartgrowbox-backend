const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let dataStore = []; // Primjer skladišta podataka

// Početna ruta
app.get('/', (req, res) => {
    res.send('Hello from Node.js server!');
});

// GET metoda - vraća sve podatke
app.get('/data', (req, res) => {
    res.json(dataStore);
});

// POST metoda - prima podatke od ESP32
app.post('/data', (req, res) => {
    console.log('Data received:', req.body);
    dataStore.push(req.body); // Pohrani podatke
    res.json({ status: 'success', message: 'Data received' });
});

// DELETE metoda - briše podatke prema ID-u
app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    const index = dataStore.findIndex(item => item.id === parseInt(id));

    if (index !== -1) {
        dataStore.splice(index, 1); // Obriši podatak
        res.json({ status: 'success', message: `Data with ID ${id} deleted` });
    } else {
        res.status(404).json({ status: 'error', message: `Data with ID ${id} not found` });
    }
});

// Pokreni server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
