const data = require("../data");
const User = require("../models/userModel")



const seedUsers = async(req,res,next) => {
try {
    //delete all existing users
    await User.deleteMany({});


    // create a new user

    const users = await User.insertMany(data.users);

    // success response
    return res.status(201).json(users)

    
} catch (error) {
    next(error)
}
}


module.exports = {seedUsers}