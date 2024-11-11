const express = require('express');
const router = express.Router();
const driverDetailsController = require('../controllers/driverDetailsController');

// Ruta para obtener detalles de un piloto específico
router.get('/:driverId', driverDetailsController.getDriverDetails);

module.exports = router;
