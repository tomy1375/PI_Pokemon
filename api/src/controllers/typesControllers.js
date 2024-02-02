// En tu controlador de tipos (controllers/typesControllers.js)
const { Types } = require("../db");
const axios = require('axios');

const getAndSaveTypes = async () => {
    try {
        const apiURL = "https://pokeapi.co/api/v2/type";
        const response = await axios.get(apiURL);
        const typesInfo = response.data;

    

        await Types.destroy({ where: {} });

        const types = typesInfo.results.map((type) => ({ type: type.name }));

        await Types.bulkCreate(types);

    

        return 'Tipos obtenidos y guardados exitosamente en la base de datos.';
    } catch (error) {
        console.error(`Error en el controlador types (getAndSaveTypes): ${error.message}`);
        throw new Error('Error al procesar los tipos.');
    }
};


const getTypes = async () => {
    try {
        const types = await Types.findAll({
            attributes: ['type'],
        });

        return types.map((record) => record.type);
    } catch (error) {
        console.error(`Error en el controlador de tipos (getTypes): ${error.message}`);
        throw new Error('Error al procesar los tipos.');
    }
};

module.exports = {
    getAndSaveTypes,
    getTypes
};
