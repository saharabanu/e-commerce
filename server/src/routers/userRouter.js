const express = require("express");
const { getUsers, postUser,  updateUser, getUserById, deleteUserById, activateAccount} = require("../controllers/userController");
const upload = require("../middleware/uploadFile");
const { validationRegistration } = require("../validators/auth");
const runValidators = require("../middleware");

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",getUserById );
userRouter.post("/register",upload.single("image"),validationRegistration,runValidators, postUser);
userRouter.post("/verify", activateAccount);
userRouter.delete("/:id", deleteUserById);
userRouter.put("/put", updateUser);

module.exports = userRouter;
