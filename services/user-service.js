const userModel = require('../models/user');


const createUser = async (username, password, createdDate) => {
    console.log(username, password, createdDate)
    let user = await userModel.create({ userID: null, username: username, password: password, createdDate: createdDate }).then(res => console.log("HEY", res, userModel)).catch(error => console.log("ERROR", error))
    
} 

module.exports = {
    createUser,

}