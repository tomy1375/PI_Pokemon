const { getTypes } = require("../controllers/typesControllers");

const getTypesHandlers = async (req, res) => {
    try {
      const types = await getTypes();
      res.status(200).json({ types }); // Cambié el nombre de la propiedad de 'type' a 'types'
    } catch (error) {
      res.status(500).send('Error interno del servidor: ' + error.message);
    }
};

module.exports = getTypesHandlers;