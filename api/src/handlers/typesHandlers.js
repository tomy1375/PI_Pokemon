const getTypesHandlers = (req,res)=>{
    res.status(200).send("Obtiene un arreglo con todos los tipos de pokemones")
}

module.exports = getTypesHandlers