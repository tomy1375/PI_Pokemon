const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const typesRouters = Router();

typesRouters.use("/", (req,res)=>{
    res.status(200).send("Obtiene un arreglo con todos los tipos de pokemones")
})

module.exports = typesRouters
 