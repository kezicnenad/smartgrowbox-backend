require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

// Pokretanje aplikacije
const app = express();

// Konekcija na bazu podataka
connectDB();

// Middleware za parsiranje JSON tijela
app.use(express.json());

// Rute
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('hello')
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
