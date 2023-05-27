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
    },
    // {
    //   "name": "Mohammed Ali",
    //   "email": "mohammedali@gmail.com",
    //   "password": "pass123",
    //   "phone": "6655443322",
    //   "address": "Cairo, Egypt"
    // },
    // {
    //   "name": "Maria Garcia",
    //   "email": "mariagarcia@gmail.com",
    //   "password": "password123",
    //   "phone": "1122334455",
    //   "address": "Madrid, Spain"
    // },
    // {
    //   "name": "Ravi Patel",
    //   "email": "ravipatel@gmail.com",
    //   "password": "p@ssw0rd",
    //   "phone": "9988776655",
    //   "address": "Mumbai, India"
    // },
    // {
    //   "name": "Sophie Martin",
    //   "email": "sophiemartin@gmail.com",
    //   "password": "sophie123",
    //   "phone": "3344556677",
    //   "address": "Paris, France"
    // },
    // {
    //   "name": "Alex Johnson",
    //   "email": "alexjohnson@gmail.com",
    //   "password": "password",
    //   "phone": "5566778899",
    //   "address": "Sydney, Australia"
    // },
    // {
    //   "name": "Luisa Fernandez",
    //   "email": "luisafernandez@gmail.com",
    //   "password": "luisa321",
    //   "phone": "7788990011",
    //   "address": "Barcelona, Spain"
    // },
    // {
    //   "name": "David Wang",
    //   "email": "davidwang@gmail.com",
    //   "password": "david987",
    //   "phone": "2233445566",
    //   "address": "Beijing, China"
    // }
  ]


  seedRouter.get('/users',seedUsers)


module.exports = seedRouter;
  