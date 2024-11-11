const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');

// Ruta para obtener la lista de pilotos
router.get('/', driversController.getDrivers);

module.exports = router;
