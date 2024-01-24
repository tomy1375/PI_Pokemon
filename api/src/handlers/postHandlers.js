const { createdPokemonDb } = require("../controllers/postControllers")

const createdUserHandlers = async (req,res)=>{
    const {name,image, life, attack, defense, speed, height, weight, types } = req.body
    try {
        const response =  await createdPokemonDb(name,image, life, attack, defense, speed, height, weight, types)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    // res.status(200).send(`pokemon de nombre ${name},su vida es de ${life}y ataque de ${attack}`)
}

module.exports = createdUserHandlers