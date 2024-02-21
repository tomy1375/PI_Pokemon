const axios = require('axios');

const infoCleaner = (data) => {
    return data.results.map((element) => {
        return {
            name: element.name,
            url: element.url,
            created: false
        };
    });
}

const getUserByNameFromApi = async (name) => {
    const infoApi = (await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: { limit:  1000 }
    })).data;

    const userApi = infoCleaner(infoApi);
    const lowerCaseName = name.toLowerCase();
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
                hp: hpStat ? hpStat.base_stat :  0,
                attack: detailedInfo.stats.find((stat) => stat.stat.name === "attack")?.base_stat ||  0,
                defense: detailedInfo.stats.find((stat) => stat.stat.name === "defense")?.base_stat ||  0,
                speed: detailedInfo.stats.find((stat) => stat.stat.name === "speed")?.base_stat ||  0,
                image: officialArtworkUrl,
                created: user.created
            };
        }
        return null;
    });

    const userDetailedInfo = await Promise.all(userDetailedInfoPromises);

    const adjustedUserDetailedInfo = userDetailedInfo.map((user) => {
        if (user) {
            return {
                ...user,
                types: user.types.map((type) => type),
            };
        }
        return null;
    });

    return adjustedUserDetailedInfo.filter(Boolean);
};

module.exports = {
    getUserByNameFromApi
};
