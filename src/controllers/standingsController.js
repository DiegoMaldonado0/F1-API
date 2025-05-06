const axios = require('axios');

// Función para obtener la clasificación de pilotos
exports.getDriverStandings = async (req, res) => {
  try {
    const response = await axios.get('https://api.jolpi.ca/ergast/f1/current/driverstandings/?format=json');
    const standings = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    res.json(standings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la clasificación de pilotos', error: error.message });
  }
};

// Función para obtener la clasificación de constructores
exports.getConstructorStandings = async (req, res) => {
  try {
    const response = await axios.get('https://api.jolpi.ca/ergast/f1/current/constructorstandings/?format=json');
    const standings = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    res.json(standings);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la clasificación de constructores', error: error.message });
  }
};
