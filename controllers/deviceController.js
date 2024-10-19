const Device = require('../models/deviceModel');

// GET all devices
const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// GET a single device by ID
const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.status(200).json(device);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// POST a new device
const createDevice = async (req, res) => {
    const { mac, user, password } = req.body;
    try {
        const newDevice = new Device({ mac, user, password });
        await newDevice.save();
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT update a device
const updateDevice = async (req, res) => {
    const { mac, user, password } = req.body;
    try {
        const updatedDevice = await Device.findByIdAndUpdate(
            req.params.id,
            { mac, user, password },
            { new: true }
        );
        if (!updatedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE a device
const deleteDevice = async (req, res) => {
    try {
        const deletedDevice = await Device.findByIdAndDelete(req.params.id);
        if (!deletedDevice) {
            return res.status(404).json({ message: 'Device not found' });
        }
        res.status(200).json({ message: 'Device deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
};
