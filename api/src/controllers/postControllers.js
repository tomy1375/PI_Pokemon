const {Pokemon} = require("../db")

const createdPokemonDb = async(name,image, life, attack, defense, speed, height, weight, types)=>{
    return await Pokemon.create({name, life,image, attack, defense, speed,height,weight, types})
}

module.exports={
    createdPokemonDb
}