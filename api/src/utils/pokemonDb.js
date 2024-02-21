const { Pokemon, Types } = require("../db");
const { Sequelize } = require('sequelize');

const getUserByNameFromDb = async (name) => {
    const lowerCaseName = name.toLowerCase();

    const usersDB = await Pokemon.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: lowerCaseName
            }
        },
        include: [
            {
                model: Types,
                attributes: ['type'], // Aquí seleccionamos solo el atributo 'type'
                through: { attributes: [] }, // Esto evita que se incluyan las propiedades adicionales de la relación Many-to-Many
            },
        ],
    });

    const modifiedResults = usersDB.map((pokemon) => {
        // Extrae los nombres de los types como un arreglo de strings
        const typeNamesArray = pokemon.types.map((typeObj) => typeObj.type);

        // Crea un nuevo objeto con la misma información, pero con "types" como un arreglo de strings
        return {
            ...pokemon.toJSON(),
            types: typeNamesArray,
        };
    });

    return modifiedResults;
};

module.exports = {
    getUserByNameFromDb
};
