const { Pokemon, Types } = require("../db");

const createdPokemonDb = async (name, image, life, attack, defense, speed, height, weight, types) => {
    try {
        const [createdPokemon, created] = await Pokemon.findOrCreate({
            where: { name },
            defaults: { name, life, image, attack, defense, speed, height, weight },
        });

        if (!created) {
            throw new Error("The Pokemon already exists.");
        }

        const foundTypes = await Types.findAll({
            where: {
                type: types,
            },
        });

        // Extraer solo el nombre del tipo ('type') de cada tipo encontrado
        const typeNames = foundTypes.map(type => type.type);

        // Asociar los tipos al Pokemon
        await createdPokemon.addTypes(foundTypes);

        // Construir el objeto de respuesta con el nombre del tipo
        const updatedPokemon = {
            id: createdPokemon.id,
            name: createdPokemon.name,
            image: createdPokemon.image,
            life: createdPokemon.life,
            attack: createdPokemon.attack,
            defense: createdPokemon.defense,
            speed: createdPokemon.speed,
            height: createdPokemon.height,
            weight: createdPokemon.weight,
            created: createdPokemon.created,
            types: typeNames, // Usar solo los nombres de los tipos
        };

        return updatedPokemon;
    } catch (error) {
        throw new Error(`Error creating Pokemon: ${error.message}`);
    }
};

module.exports = {
    createdPokemonDb
};
