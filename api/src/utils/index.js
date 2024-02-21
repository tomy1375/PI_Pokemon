const axios = require('axios')
const {Pokemon,Types} = require("../db");
const infoCleaner = (data) => {
    return data.results.map((element) => ({
        name: element.name,
        url: element.url,
        created: false
    }));
};

const getDetailedInfoFromUrl = async (url) => {
    if (!url) return null;

    const detailedInfo = (await axios.get(url)).data;
    const hpStat = detailedInfo.stats.find(stat => stat.stat.name === "hp");

    return {
        name: detailedInfo.name,
        height: detailedInfo.height,
        weight: detailedInfo.weight,
        types: detailedInfo.types.map(type => type.type.name),
        hp: hpStat ? hpStat.base_stat : 0,
        attack: detailedInfo.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0,
        defense: detailedInfo.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0,
        speed: detailedInfo.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0,
    };
};

const buildPokemonResponse = (pokemon, typeNames) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        life: pokemon.life,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        created: pokemon.created,
        types: typeNames,
    };
};

const findOrCreatePokemon = async (name, life, image, attack, defense, speed, height, weight) => {
    const [createdPokemon, created] = await Pokemon.findOrCreate({
        where: { name },
        defaults: { name, life, image, attack, defense, speed, height, weight },
    });

    if (!created) {
        throw new Error("The Pokemon already exists.");
    }

    return createdPokemon;
};

const findTypes = async (types) => {
    const foundTypes = await Types.findAll({
        where: {
            type: types,
        },
    });

    return foundTypes;
};


module.exports={
    infoCleaner,
    getDetailedInfoFromUrl,
    buildPokemonResponse,
    findOrCreatePokemon,
    findTypes
}