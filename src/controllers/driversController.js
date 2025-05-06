const axios = require('axios');

const nationalityToCountryCode = {
    "Argentinian ": "ar",
    "Brazilian": "br",
    "British": "gb",
    "Chinese" : "cn",
    "Thai" : "th",
    "German": "de",
    "French": "fr",
    "Spanish": "es",
    "Italian": "it",
    "Dutch": "nl",
    "Australian": "au",
    "Canadian": "ca",
    "American": "us",
    "Mexican": "mx",
    "Monegasque": "mc",
    "Belgian": "be",
    "Swedish": "se",
    "Finnish": "fi",
    "Danish": "dk",
    "Austrian": "at",
    "Swiss": "ch",
    "Japanese": "jp",
    "Polish": "pl",
    "Russian": "ru",
    "New Zealander": "nz",
    "South African": "za",
    "Portuguese": "pt",
    "Indian": "in",
    "Hungarian": "hu",
    "Irish": "ie",
};

// Función para obtener la URL de la bandera desde flagcdn.com
const getFlagUrl = (nationality) => {
    const countryCode = nationalityToCountryCode[nationality];
    if (countryCode) {
        return `https://flagcdn.com/w320/${countryCode}.png`;  // Bandera en tamaño de 320px
    } else {
        return "https://brandemia.org/sites/default/files/inline/images/br_9rv4_400x400.jpg";  // Bandera por defecto (desconocido)
    }
};

// Función para obtener los detalles de los pilotos
exports.getDrivers = async (req, res) => {
  try {
    const response = await axios.get('https://api.jolpi.ca/ergast/f1/current/drivers/?format=json');
    const drivers = response.data.MRData.DriverTable.Drivers;

    // Añadir imagen y bandera de cada piloto
    for (let driver of drivers) {
      driver.flagUrl = getFlagUrl(driver.nationality); // Bandera usando el código de país
    }

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos de los pilotos', error: error.message });
  }
};
