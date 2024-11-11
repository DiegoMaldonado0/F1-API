const express = require('express');
const router = express.Router();
const racesController = require('../controllers/racesController');

// Ruta para obtener el calendario de la temporada
router.get('/', racesController.getRaces);

// Ruta para obtener los detalles de un circuito específico
router.get('/circuit/:circuitId', racesController.getCircuitDetails);

module.exports = router;
