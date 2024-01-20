const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const postRouters = Router();

postRouters.post("/pokemons",(req,res)=>{
    res.status(200).send("Crear pokemon")
})

module.exports = postRouters