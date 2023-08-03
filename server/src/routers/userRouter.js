const express = require("express");
const { getUsers, postUser,  updateUser, getUserById, deleteUserById} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",getUserById );
userRouter.post("/register", postUser);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/put", updateUser);

module.exports = userRouter;
