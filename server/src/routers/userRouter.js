const express = require("express");
const { getUsers, postUser, deleteUser, updateUser, getUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",getUser );
userRouter.post("/post", postUser);
userRouter.delete("/delete", deleteUser);
userRouter.put("/put", updateUser);

module.exports = userRouter;
