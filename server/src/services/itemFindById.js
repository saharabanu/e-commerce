const { default: mongoose } = require("mongoose");
const createError = require('http-errors');
const User = require("../models/userModel");

const findWithId = async(id, options = {}) => {
try {
    // we don't to show password when we will find users,so we use this and pass as parameter

   
// findById method
const item = await User.findById(id, options);

// to handle error or worst case
if(!item) {
  throw createError(404, "🐱‍🏍 oops!!! item not Found By Id")
}

return item;


} catch (error) {
     // to handle mongoose id error
    if(error instanceof mongoose.Error){
        throw createError(400, "Invalid User Id");
        
      }
      throw error
}
};

module.exports = {findWithId}