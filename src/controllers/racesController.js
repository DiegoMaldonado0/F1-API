const axios = require('axios');

// Función para obtener el calendario de carreras
exports.getRaces = async (req, res) => {
  try {
    const response = await axios.get('https://api.jolpi.ca/ergast/f1/2025/races/?format=json');
    const races = response.data.MRData.RaceTable.Races;
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el calendario de carreras', error: error.message });
  }
};

// Función para obtener detalles de un circuito específicoo
exports.getCircuitDetails = async (req, res) => {
const { circuitId } = req.params; // Obtener el ID del circuito desde los parámetros de la URL
    try {
        // Consultar la API de Ergast para obtener detalles de un circuito específico
        const response = await axios.get(`https://ergast.com/api/f1/circuits/${circuitId}.json`);
        const circuitDetails = response.data.MRData.CircuitTable.Circuits[0]; // Extraer los detalles del circuito
        res.json(circuitDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles del circuito', error: error.message });
    }
    };