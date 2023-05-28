const { default: mongoose } = require("mongoose");
const createError = require('http-errors');
const User = require("../models/userModel");

const userFindById = async(id) => {
try {
    // we don't to show password when we will find users,so we use this and pass as parameter
const options = {password: 0};
   
// findById method
const user = await User.findById(id, options);

// to handle error or worst case
if(!user) {
  throw createError(404, "user not Found By Id")
}

return user;


} catch (error) {
     // to handle mongoose id error
    if(error instanceof mongoose.Error){
        throw createError(400, "Invalid User Id");
        
      }
      throw error
}
};

module.exports = {userFindById}