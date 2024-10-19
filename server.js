const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectToDb } = require('./config/db');

const app = express();

dotenv.config();

// Konektiranje na MongoDB
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());

// // Import routes
// const deviceRoutes = require('./routes/deviceRoutes');
// app.use('/api/devices', deviceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
