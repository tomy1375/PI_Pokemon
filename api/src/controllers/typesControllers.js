// En tu controlador de tipos (controllers/typesControllers.js)
const { Types } = require("../db");
const axios = require('axios');


const getAndSaveTypes = async () => {
    try {
        const apiURL = "https://pokeapi.co/api/v2/type";
        const response = await axios.get(apiURL);
        const typesInfo = response.data;

        // Consultar si hay tipos en la base de datos
        const existingTypes = await Types.findAll();

        // Si no hay tipos en la base de datos, guardar los obtenidos de la API
        if (existingTypes.length === 0) {
            // Elimina los registros existentes antes de insertar los nuevos
            await Types.destroy({ where: {} });

            // Mapea los tipos desde la API y crea un array de objetos con la propiedad "type"
            const types = typesInfo.results.map((type) => ({ type: type.name }));
            console.log(types);

            // Inserta los nuevos tipos en la base de datos
            await Types.bulkCreate(types);

            return 'Tipos obtenidos y guardados exitosamente en la base de datos.';
        } else {
            return 'La base de datos ya contiene tipos, no se realizaron cambios.';
        }
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
