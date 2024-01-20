const { Router } = require('express');
const userRouters = require('./usersRouters');
const typesRouters = require('./typesRouters');
const postRouters = require('./postRouters');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.use("/pokemons", userRouters)

router.use("/types", typesRouters)

router.post("/pokemons", postRouters)

// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
