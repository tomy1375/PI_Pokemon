const {getUserByName, getAllUser, getUserById } = require("../controllers/usersControllers")

const getDetailHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const response = await getUserById(id, source);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const getUserHandler = async(req, res)=>{            //query
   const {name} = req.query
   try {
    if(name){
        const userByName = await getUserByName(name)
        res.status(200).json(userByName)
    }else{
        const response = await getAllUser()
        res.status(200).json(response)
    }
   } catch (error) {
    res.status(400).json({error: error.message})
   }
}

module.exports = {
    getDetailHandler,
    getUserHandler
}