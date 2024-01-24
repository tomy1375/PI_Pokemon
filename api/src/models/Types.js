const { DataTypes, UUIDV4 } = require('sequelize');

module.exports =(sequelize)=>{
    sequelize.define('types',{
        id:{
            type :DataTypes.UUID,
            primaryKey:true,
            defaultValue : DataTypes.UUIDV4,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps : false
    })
}