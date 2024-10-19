const express = require('express');
const {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
} = require('../controllers/deviceController');

const router = express.Router();

// Define routes
router.get('/', getDevices);
router.get('/:id', getDeviceById);
router.post('/', createDevice);
router.put('/:id', updateDevice);
router.delete('/:id', deleteDevice);

module.exports = router;
