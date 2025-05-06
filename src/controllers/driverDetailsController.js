const axios = require('axios');

// Mapa de nacionalidades a códigos de país para las banderas
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

// Función para obtener la URL de la imagen del piloto desde Wikipedia
async function getDriverImage(driverName) {
  try {
    // Saneamos el nombre para asegurarnos de que no haya caracteres no válidos en la URL
    const formattedName = driverName.replace(/ /g, "_"); // Reemplazamos espacios por "_"
    const wikiResponse = await axios.get(`https://es.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&titles=${formattedName}&pithumbsize=400`);
    
    const page = wikiResponse.data.query.pages;
    const pageId = Object.keys(page)[0];
    if (page[pageId] && page[pageId].hasOwnProperty('thumbnail')) {
      return page[pageId].thumbnail.source; // URL de la imagen más grande
    } else {
      return 'https://brandemia.org/sites/default/files/inline/images/br_9rv4_400x400.jpg'; // Imagen predeterminada si no se encuentra
    }
  } catch (error) {
    console.error('Error al obtener la imagen del piloto:', error);
    return 'https://brandemia.org/sites/default/files/inline/images/br_9rv4_400x400.jpg'; // Imagen predeterminada en caso de error
  }
}

// Función para obtener los detalles de un piloto específico
exports.getDriverDetails = async (req, res) => {
  const { driverId } = req.params; // Tomamos el parámetro de la ruta
  try {
    const response = await axios.get(`https://api.jolpi.ca/ergast/f1/current/drivers/${driverId}/?format=json`);
    const driverDetails = response.data.MRData.DriverTable.Drivers[0];
    
    // Validamos si existen los datos que necesitamos
    if (!driverDetails) {
      return res.status(404).json({ message: 'Piloto no encontrado' });
    }

    // Obtenemos la imagen del piloto
    driverDetails.image = await getDriverImage(driverDetails.givenName + "_" + driverDetails.familyName);

    // Obtenemos la bandera usando el código de nacionalidad
    const countryCode = nationalityToCountryCode[driverDetails.nationality] || 'us'; // Si no hay código de país, usamos 'us' por defecto
    driverDetails.flagUrl = `https://flagcdn.com/w320/${countryCode}.png`; // URL de la bandera

    // Devolvemos los detalles del piloto en formato JSON
    res.json(driverDetails);
  } catch (error) {
    console.error('Error al obtener los datos del piloto:', error);
    res.status(500).json({ message: 'Error al obtener los datos del piloto', error: error.message });
  }
};
