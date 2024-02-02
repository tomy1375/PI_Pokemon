const axios = require('axios')
const {Pokemon} = require("../db")

const infoCleaner = (data) => {
    // if (!data || !data.results || !Array.isArray(data.results)) {
    //     return [];
    // }

    return data.results.map((element) => {
        return {
            name: element.name,
            url: element.url,
            created: false
        };
    });
}


const getUserFromDatabase = async (name) => {
    try {
      // Buscar el usuario en la base de datos utilizando Sequelize
      const user = await User.findOne({
        where: {
          name: {
            [Sequelize.Op.iLike]: name // Utiliza iLike para hacer la comparación insensible a mayúsculas y minúsculas
          }
        }
      });
  
      // Devolver el usuario si se encuentra, o null si no se encuentra
      return user || null;
    } catch (error) {
      // Manejar errores de consulta a la base de datos
      console.error(`Error fetching user from database: ${error.message}`);
      throw error;
    }
  };
  


const getUserById = async (id, source) => {
    let user;
    if (source === "api") {
        const userData = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
        // const hpStat = userData.stats.find(stat => stat.stat.name === "hp")
        user = {
            name: userData.name,
            hp: userData.stats.find(stat => stat.stat.name === "hp")?.base_stat || 0,
            height: userData.height,
            weight: userData.weight,
            types: userData.types.map(type => type.type.name),
            attack: userData.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0,
            defense: userData.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0,
            speed: userData.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0,
        };
    } else {
        user = await Pokemon.findByPk(id);
    }
    return user;
}


const getAllUser = async () => {
    try {
        const userDB = await Pokemon.findAll();
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data;
        const userApi = infoCleaner(infoApi);

        // Hacer solicitudes adicionales para obtener información dentro de las URLs
        const userDetailedInfoPromises = userApi.map(async (user) => {
            if (user.url) {
                const detailedInfo = (await axios.get(user.url)).data;
                const hpStat = detailedInfo.stats.find(stat => stat.stat.name === "hp");

                return {
                    name: user.name,
                    height: detailedInfo.height,
                    weight: detailedInfo.weight,
                    types: detailedInfo.types.map(type => type.type.name),
                    hp: hpStat ? hpStat.base_stat : 0,
                    attack: detailedInfo.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0,
                    defense: detailedInfo.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0,
                    speed: detailedInfo.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0,
                    created: user.created
                };
            }
            return null;
        });

        const userDetailedInfo = await Promise.all(userDetailedInfoPromises);

        return [...userDB, ...userDetailedInfo.filter(Boolean)];
    } catch (error) {
        throw new Error(`Error fetching all users: ${error.message}`);
    }
};

const getUserByName = async (name) => {
    try {
      const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: { limit: 1000 }
      })).data;
    //   console.log(infoApi)
      const userApi = infoCleaner(infoApi);
  
      // Convertir el nombre de búsqueda a minúsculas para comparaciones insensibles a mayúsculas y minúsculas
      const lowerCaseName = name.toLowerCase();
  
      const userFiltered = userApi.filter((user) => user.name.toLowerCase() === lowerCaseName);
    
  
      const userDetailedInfoPromises = userFiltered.map(async (user) => {
        if (user.url) {
          const detailedInfo = (await axios.get(user.url)).data;
  
          return {
            name: user.name,
            height: detailedInfo.height,
            weight: detailedInfo.weight,
            types: detailedInfo.types.map(type => type.type.name),
            hp: detailedInfo.stats.find(stat => stat.stat.name === "hp")?.base_stat || 0,
            attack: detailedInfo.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0,
            defense: detailedInfo.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0,
            speed: detailedInfo.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0,
            created: user.created
          };
        }
        return null;
      });
  
      const userDetailedInfo = await Promise.all(userDetailedInfoPromises);
  
      return userDetailedInfo.filter(Boolean);
    } catch (error) {
      throw new Error(`Error fetching user by name: ${error.message}`);
    }
  };
  



module.exports= {
    getUserById,
    getAllUser,
    getUserByName
}