const mongoose = require('mongoose');
const { mongoDBUrl } = require('../secret');



const connectDatabase = async(options={}) => {
    try {
        await mongoose.connect(mongoDBUrl, options);
        console.log("connection to db successfully");

        mongoose.connection.on("error", (error) => {
          console.error("DB Connection error", error)
        })
        
    } catch (error) {
        console.error("Couldn't DB Connection error", error.toString())
    }
}

module.exports = connectDatabase;