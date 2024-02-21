
const { buildPokemonResponse, findOrCreatePokemon, findTypes } = require("../utils");


const associateTypesWithPokemon = async (pokemon, types) => {
    await pokemon.addTypes(types);
};


const createdPokemonDb = async (name, image, life, attack, defense, speed, height, weight, types) => {
    try {
        const pokemon = await findOrCreatePokemon(name, life, image, attack, defense, speed, height, weight);
        const foundTypes = await findTypes(types);
        await associateTypesWithPokemon(pokemon, foundTypes);

        const typeNames = foundTypes.map(type => type.type);
        const updatedPokemon = buildPokemonResponse(pokemon, typeNames);

        return updatedPokemon;
    } catch (error) {
        throw new Error(`Error creating Pokemon: ${error.message}`);
    }
};

module.exports = {
    createdPokemonDb
};
