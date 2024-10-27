const express = require('express');
const { registerDeviceForm, registerDevice, loginDevice, getDeviceSettings } = require('../controllers/authController');
const authenticateJWT = require('../middlewares/authMiddleware');
const router = express.Router();

// GET metoda za formu registracije (ako uređaj ne postoji)
router.get('/register', registerDeviceForm);

// POST metoda za spremanje novih podataka za uređaj
router.post('/register', registerDevice);

// Ruta za prijavu
router.post('/login', loginDevice);

// Zaštićena ruta - HTML prikaz postavki uređaja
router.get('/protected', authenticateJWT, getDeviceSettings);

module.exports = router;
