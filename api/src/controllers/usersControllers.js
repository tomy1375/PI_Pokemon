const axios = require('axios')
const {Pokemon, Types} = require("../db")
const { Sequelize } = require('sequelize');

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


// const getUserFromDatabase = async (name) => {
//     try {
//       // Buscar el usuario en la base de datos utilizando Sequelize
//       const user = await User.findOne({
//         where: {
//           name: {
//             [Sequelize.Op.iLike]: name // Utiliza iLike para hacer la comparación insensible a mayúsculas y minúsculas
//           }
//         }
//       });
  
//       // Devolver el usuario si se encuentra, o null si no se encuentra
//       return user || null;
//     } catch (error) {
//       // Manejar errores de consulta a la base de datos
//       console.error(`Error fetching user from database: ${error.message}`);
//       throw error;
//     }
//   };
  

const getUserById = async (id, source) => {
  let user;

  if (source === "api") {
    try {
      const userData = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
      const hpStat = userData.stats.find((stat) => stat.stat.name === "hp");

      const officialArtworkUrl =
        userData.sprites.other["official-artwork"].front_default;

      user = {
        id: userData.id,
        name: userData.name,
        hp: hpStat ? hpStat.base_stat : 0,
        height: userData.height,
        weight: userData.weight,
        types: userData.types.map((type) => type.type.name),
        attack: userData.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
        defense: userData.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0,
        speed: userData.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
        image: officialArtworkUrl,
      };
    } catch (error) {
      throw new Error(`Error fetching user by ID from API: ${error.message}`);
    }
  } else {
    try {
      const dbUser = await Pokemon.findByPk(id, {
        include: [
          {
            model: Types,
            attributes: ['type'], // Aquí seleccionamos solo el atributo 'type'
            through: { attributes: [] }, // Esto evita que se incluyan las propiedades adicionales de la relación Many-to-Many
          },
        ],
      });

      // Obtener solo el nombre del tipo ('type') de cada tipo asociado al Pokemon
      const typeNames = dbUser.types.map((type) => type.type);

      // Actualizar el objeto de respuesta con los nombres de los tipos
      user = {
        id: dbUser.id,
        name: dbUser.name,
        hp: dbUser.life,
        height: dbUser.height,
        weight: dbUser.weight,
        types: typeNames, // Usar solo los nombres de los tipos
        attack: dbUser.attack,
        defense: dbUser.defense,
        speed: dbUser.speed,
        image: dbUser.image,
      };
    } catch (error) {
      throw new Error(`Error fetching user by ID from database: ${error.message}`);
    }
  }

  return user;
};



  
  

const getAllUser = async () => {
  try {
    const usersDB = await Pokemon.findAll({ include: Types });
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=100")).data;
    const userApi = infoCleaner(infoApi);

    const userDetailedInfoPromises = userApi.map(async (user) => {
      if (user.url) {
        const detailedInfo = (await axios.get(user.url)).data;
        const hpStat = detailedInfo.stats.find((stat) => stat.stat.name === "hp");

        const officialArtworkUrl =
          detailedInfo.sprites.other["official-artwork"].front_default;

        return {
          id: detailedInfo.id,
          name: user.name,
          height: detailedInfo.height,
          weight: detailedInfo.weight,
          types: detailedInfo.types.map((type) => ({ type: type.type.name })),
          hp: hpStat ? hpStat.base_stat : 0,
          attack: detailedInfo.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
          defense: detailedInfo.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0,
          speed: detailedInfo.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
          image: officialArtworkUrl,
          created: false
        };
      }
      return null;
    });

    const userDetailedInfo = await Promise.all(userDetailedInfoPromises);

    // Ajustar la estructura antes de devolverla
    const adjustedUserDetailedInfo = userDetailedInfo.map((user) => {
      if (user) {
        return {
          ...user,
          types: user.types.map((type) => type.type),
        };
      }
      return null;
    });

    return [...usersDB, ...adjustedUserDetailedInfo.filter(Boolean)];
  } catch (error) {
    throw new Error(`Error fetching all users: ${error.message}`);
  }
};



const getUserByName = async (name) => {
  try {
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon", {
      params: { limit: 1000 }
    })).data;

    const userApi = infoCleaner(infoApi);
    const lowerCaseName = name.toLowerCase();

    const usersDB = await Pokemon.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: lowerCaseName
        }
      },
      include: [
        {
          model: Types,
          attributes: ['type'], // Aquí seleccionamos solo el atributo 'type'
          through: { attributes: [] }, // Esto evita que se incluyan las propiedades adicionales de la relación Many-to-Many
        },
      ],
    });

    const userFiltered = userApi.filter((user) => user.name.toLowerCase() === lowerCaseName);

    const userDetailedInfoPromises = userFiltered.map(async (user) => {
      if (user.url) {
        const detailedInfo = (await axios.get(user.url)).data;
        const hpStat = detailedInfo.stats.find((stat) => stat.stat.name === "hp");

        const officialArtworkUrl =
          detailedInfo.sprites.other["official-artwork"].front_default;

        return {
          id: detailedInfo.id,
          name: user.name,
          height: detailedInfo.height,
          weight: detailedInfo.weight,
          types: detailedInfo.types.map((type) => type.type.name),
          hp: hpStat ? hpStat.base_stat : 0,
          attack: detailedInfo.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
          defense: detailedInfo.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 0,
          speed: detailedInfo.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
          image: officialArtworkUrl,
          created: user.created
        };
      }
      return null;
    });

    const userDetailedInfo = await Promise.all(userDetailedInfoPromises);

    // Ajusta la estructura después de obtener la información detallada del usuario
    const adjustedUserDetailedInfo = userDetailedInfo.map((user) => {
      if (user) {
        return {
          ...user,
          types: user.types.map((type) => type),
        };
      }
      return null;
    });

    const result = usersDB ? [...usersDB, ...adjustedUserDetailedInfo.filter(Boolean)] : adjustedUserDetailedInfo.filter(Boolean);

    return result;
  } catch (error) {
    throw new Error(`Error fetching user by name: ${error.message}`);
  }
};





module.exports = {
  getUserById,
  getAllUser,
  getUserByName
};
