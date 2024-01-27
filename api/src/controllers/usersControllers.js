const axios = require('axios')
const {Pokemon} = require("../db")

const infoCleaner = (data) => {
    if (!data || !data.results || !Array.isArray(data.results)) {
        return [];
    }

    return data.results.map((element) => {
        return {
            name: element.name,
            url: element.url,
            created: false
        };
    });
}
const getUserById = async(id, source)=>{
    const user = source === "api" ? ( await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`))
        .data
    : await Pokemon.findByPk(id)
    return user
}

const getAllUser = async()=>{
    const userDB = await Pokemon.findAll()
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon")).data
    const userApi = infoCleaner(infoApi)
   
        return [...userDB,...userApi]
}

const getUserByName = async (name) => {
    try {
        const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon", {
            params: { limit: 1000 } // Ajusta el límite según tu necesidad
        })).data;

        const userApi = infoCleaner(infoApi);
        const userFiltered = userApi.filter((user) => user.name === name);

        // Hacer solicitudes adicionales para obtener información dentro de las URLs
        const userDetailedInfoPromises = userFiltered.map(async (user) => {
            if (user.url) {
                const detailedInfo = (await axios.get(user.url)).data;
                const hpStat = detailedInfo.stats.find(stat => stat.stat.name === "hp");
        
                return {
                    name: user.name,
                    height: detailedInfo.height,
                    weight: detailedInfo.weight,
                    types: detailedInfo.types.map(type => type.type.name), // Mantener la propiedad "types" como un array
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

        return userDetailedInfo.filter(Boolean); // Filtrar nulos antes de devolver el resultado
    } catch (error) {
        throw new Error(`Error fetching user by name: ${error.message}`);
    }
}



module.exports= {
    getUserById,
    getAllUser,
    getUserByName
}