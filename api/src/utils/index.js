const axios = require('axios')
const {Pokemon} = require("../db");
const infoCleaner = (data) => {
    return data.results.map((element) => ({
        name: element.name,
        url: element.url,
        created: false
    }));
};

const getDetailedInfoFromUrl = async (url) => {
    if (!url) return null;

    const detailedInfo = (await axios.get(url)).data;
    const hpStat = detailedInfo.stats.find(stat => stat.stat.name === "hp");

    return {
        name: detailedInfo.name,
        height: detailedInfo.height,
        weight: detailedInfo.weight,
        types: detailedInfo.types.map(type => type.type.name),
        hp: hpStat ? hpStat.base_stat : 0,
        attack: detailedInfo.stats.find(stat => stat.stat.name === "attack")?.base_stat || 0,
        defense: detailedInfo.stats.find(stat => stat.stat.name === "defense")?.base_stat || 0,
        speed: detailedInfo.stats.find(stat => stat.stat.name === "speed")?.base_stat || 0,
    };
};


module.exports={
    infoCleaner,
    getDetailedInfoFromUrl
}