
const getDetailHandler = (req, res)=>{            //params
    const {id} = req.params
    res.status(200).send(`detalle del pokemon ${id}`)
}

const getUserHandler = (req, res)=>{            //query
   const {name} = req.query
   if(name)res.status(200).send(`aqui esta el pokemon ${name}`)
    res.status(200).send("todos los pokemons")
}

module.exports = {
    getDetailHandler,
    getUserHandler
}