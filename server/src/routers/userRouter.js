const express = require("express");
const { getUsers, postUser, deleteUser, updateUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/post", postUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/put", updateUser);

module.exports = userRouter;
