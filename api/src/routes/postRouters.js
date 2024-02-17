const { Router } = require('express');
const createdUserHandlers = require('../handlers/postHandlers');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const postRouters = Router();

postRouters.post("/",createdUserHandlers)

module.exports = postRouters