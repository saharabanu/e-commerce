const express = require("express");
const { seedUsers } = require("../controllers/seedController");
const seedRouter = express.Router();

const user1 = [
    {
      name: "Sahara Banu",
      email: "saharabanu@gmail.com",
      password: "123456",
      phone: "0187453729",
      address: "Dhaka, Bangladesh"
    },
    {
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "abcdef",
      phone: "0123456789",
      address: "New York, USA"
    },
    {
      name: "Emily Smith",
      email: "emilysmith@gmail.com",
      password: "qwerty",
      phone: "9876543210",
      address: "London, UK"
    }
    
  ]


  seedRouter.get('/users',seedUsers)


module.exports = seedRouter;
  