
const getDetailHandler = (req, res)=>{            //params
    res.status(200).send("detalle del pokemon")
}

const getUserHandler = (req, res)=>{            //params
    res.status(200).send("todos los pokemons")
}

module.exports = {
    getDetailHandler,
    getUserHandler
}