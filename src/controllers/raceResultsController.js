const axios = require('axios');

// Función para obtener los resultados de una carrera específica
exports.getRaceResults = async (req, res) => {
  const { round } = req.params; // Tomamos el parámetro de la ruta
  try {
    const response = await axios.get(`https://ergast.com/api/f1/current/${round}/results.json`);
    const raceResults = response.data.MRData.RaceTable.Races[0].Results;
    res.json(raceResults);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los resultados de la carrera', error: error.message });
  }
};
