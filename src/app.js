const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para permitir CORS (para que el frontend pueda acceder a la API)
app.use(cors());
app.use(express.json());

// Rutas
const driversRoutes = require('./routes/drivers');
const racesRoutes = require('./routes/races');
const standingsRoutes = require('./routes/standings');
const raceResultsRoutes = require('./routes/raceResults');
const driverDetailsRoutes = require('./routes/driverDetails');

app.use('/api/drivers', driversRoutes);
app.use('/api/races', racesRoutes);
app.use('/api/standings', standingsRoutes);
app.use('/api/raceResults', raceResultsRoutes);
app.use('/api/driverDetails', driverDetailsRoutes);

module.exports = app;
