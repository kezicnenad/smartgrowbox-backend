const Device = require('../models/deviceModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// GET metoda koja vraća formu za unos username i password ako macAddress ne postoji
exports.registerDeviceForm = async (req, res) => {
  const { macAddress } = req.query;

  if (!macAddress) {
    return res.status(400).json({ message: 'macAddress je obavezna u query parametru' });
  }

  const device = await Device.findOne({ macAddress });

  if (device) {
    // Ako uređaj postoji, preusmjeri na login
    return res.redirect('/api/auth/login');
  }

  // Ako uređaj ne postoji, vrati HTML formu za unos username i password
  const html = `
    <html>
      <head>
        <title>Registracija uređaja</title>
      </head>
      <body>
        <h1>Registracija uređaja s macAddress: ${macAddress}</h1>
        <form action="/api/auth/register" method="POST">
          <input type="hidden" name="macAddress" value="${macAddress}" />
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required /><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required /><br>
          <button type="submit">Spremi</button>
        </form>
      </body>
    </html>
  `;
  
  res.send(html);
};

// POST metoda koja sprema unesene podatke za uređaj
exports.registerDevice = async (req, res) => {
  const { macAddress, username, password } = req.body;

  if (!macAddress || !username || !password) {
    return res.status(400).json({ message: 'macAddress, username i password su obavezni' });
  }

  let device = await Device.findOne({ macAddress });

  if (device) {
    return res.status(409).json({ message: 'Uređaj s ovom macAddress već postoji' });
  }

  // Ako uređaj ne postoji, sprema nove podatke
  const hashedPassword = await bcrypt.hash(password, 10);
  device = new Device({ macAddress, username, password: hashedPassword });
  await device.save();

  res.status(201).json({ message: 'Uređaj registriran', device });
};

// POST metoda za login
exports.loginDevice = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username i password su obavezni' });
  }

  const device = await Device.findOne({ username });
  if (!device) {
    return res.status(401).json({ message: 'Neispravni podaci za prijavu' });
  }

  const isMatch = await bcrypt.compare(password, device.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Neispravni podaci za prijavu' });
  }

  const token = jwt.sign({ macAddress: device.macAddress }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
};

// GET metoda za dohvaćanje postavki uređaja i prikaz u HTML formatu
exports.getDeviceSettings = async (req, res) => {
  try {
    const device = await Device.findOne({ macAddress: req.user.macAddress });

    if (!device) {
      return res.status(404).json({ message: 'Uređaj nije pronađen' });
    }

    // Generiranje HTML-a
    const html = `
      <html>
        <head>
          <title>Postavke uređaja</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 10px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <h1>Postavke uređaja</h1>
          <table>
            <tr>
              <th>Mac Adresa</th>
              <td>${device.macAddress}</td>
            </tr>
            <tr>
              <th>Vrijeme paljenja svjetla (light_on)</th>
              <td>${device.light_on}:00</td>
            </tr>
            <tr>
              <th>Vrijeme gašenja svjetla (light_off)</th>
              <td>${device.light_off}:00</td>
            </tr>
            <tr>
              <th>Vrijeme paljenja ventilacije prema van (ventilation_out)</th>
              <td>${device.ventilation_out}:00</td>
            </tr>
            <tr>
              <th>Vrijeme paljenja ventilacije prema unutra (ventilation_in)</th>
              <td>${device.ventilation_in}:00</td>
            </tr>
            <tr>
              <th>Vrijeme paljenja pumpe za vodu (water_pump)</th>
              <td>${device.water_pump}:00</td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Vraćanje generiranog HTML-a
    res.send(html);
  } catch (error) {
    console.error('Greška pri dohvaćanju podataka uređaja:', error.message);
    res.status(500).json({ message: 'Greška na serveru' });
  }
};
