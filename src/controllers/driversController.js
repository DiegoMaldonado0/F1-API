const axios = require('axios');

const nationalityToCountryCode = {
    "Argentinian": "ar",
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
async function getDriverImage(wikipediaUrl) {
    try {
        // Extraemos el nombre del piloto de la URL de Wikipedia
        const driverName = wikipediaUrl.split('/wiki/')[1];
        
        // Consultamos la Wikipedia del piloto
        const wikiResponse = await axios.get(`https://es.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&titles=${driverName}&pithumbsize=400`);
        const page = wikiResponse.data.query.pages;
        const pageId = Object.keys(page)[0];

        // Verificamos si se ha encontrado la imagen en la respuesta
        if (page[pageId] && page[pageId].hasOwnProperty('thumbnail')) {
            return page[pageId].thumbnail.source; // Esta es la URL de la imagen de mayor tamaño
        } else {
            return 'https://brandemia.org/sites/default/files/inline/images/br_9rv4_400x400.jpg'; // Imagen predeterminada si no se encuentra una
        }
    } catch (error) {
        console.error('Error al obtener la imagen del piloto:', error);
        return 'https://brandemia.org/sites/default/files/inline/images/br_9rv4_400x400.jpg'; // Imagen predeterminada en caso de error
    }
}

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
    const response = await axios.get('https://ergast.com/api/f1/current/drivers.json');
    const drivers = response.data.MRData.DriverTable.Drivers;

    // Añadir imagen y bandera de cada piloto
    for (let driver of drivers) {
      // Usamos la URL de Wikipedia del piloto para obtener la imagen
      driver.image = await getDriverImage(driver.url); // Obtenemos la imagen usando la URL proporcionada
      driver.flagUrl = getFlagUrl(driver.nationality); // Bandera usando el código de país
    }

    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos de los pilotos', error: error.message });
  }
};
