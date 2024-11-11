const express = require('express');
const router = express.Router();
const standingsController = require('../controllers/standingsController');

// Ruta para obtener la clasificación de pilotos
router.get('/drivers', standingsController.getDriverStandings);

// Ruta para obtener la clasificación de constructores
router.get('/constructors', standingsController.getConstructorStandings);

module.exports = router;
