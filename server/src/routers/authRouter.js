const express = require("express");
const { handleLogin, handleLogOut } = require("../controllers/authController");
const { isLoggedOut, isLoggedIn } = require("../middleware/auth");


const authRouter = express.Router();

authRouter.post("/login",isLoggedOut, handleLogin);

authRouter.post("/logout",isLoggedIn, handleLogOut);
module.exports = authRouter;
