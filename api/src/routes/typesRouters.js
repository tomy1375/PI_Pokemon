const { Router } = require('express');
const getTypesHandlers = require('../handlers/typesHandlers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const typesRouters = Router();

typesRouters.use("/", getTypesHandlers)

module.exports = typesRouters
 