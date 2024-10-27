const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  macAddress: { type: String, required: true, unique: true },
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  light_on: { type: Number, default: 0 },       // Vrijeme kada se pali svjetlo
  light_off: { type: Number, default: 0 },     // Vrijeme kada se gasi svjetlo
  ventilation_out: { type: Number, default: 0 },// Vrijeme kada se pali ventilacija prema van
  ventilation_in: { type: Number, default: 0 }, // Vrijeme kada se pali ventilacija prema unutra
  water_pump: { type: Number, default: 0 }      // Vrijeme kada se pali pumpa za vodu
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
