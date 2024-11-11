const express = require('express');
const router = express.Router();
const raceResultsController = require('../controllers/raceResultsController');

// Ruta para obtener los resultados de una carrera específica
router.get('/:round', raceResultsController.getRaceResults);

module.exports = router;
