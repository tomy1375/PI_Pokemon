const { Router } = require('express');
const { getDetailHandler, getUserHandler } = require('../handlers/usersHandlers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const userRouters = Router();

userRouters.use("/:id", getDetailHandler)

userRouters.use('/',getUserHandler)


module.exports = userRouters