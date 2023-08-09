const express = require("express");
const { handleLogin, handleLogOut } = require("../controllers/authController");


const authRouter = express.Router();

authRouter.post("/login", handleLogin);

authRouter.post("/logout", handleLogOut);
module.exports = authRouter;
