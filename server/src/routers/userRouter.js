const express = require("express");
const { getUsers, postUser,  updateUser, getUserById, deleteUserById, activateAccount} = require("../controllers/userController");
const upload = require("../middleware/uploadFile");
const { validationRegistration } = require("../validators/auth");
const runValidators = require("../middleware");
const { isLoggedIn, isLoggedOut, isAdmin } = require("../middleware/auth");

const userRouter = express.Router();


userRouter.post("/register",upload.single("image"),isLoggedOut ,validationRegistration,runValidators, postUser);
userRouter.post("/verify",isLoggedOut, activateAccount);
userRouter.get("/",isLoggedIn,isAdmin,getUsers);
userRouter.get("/:id",isLoggedIn, getUserById );
userRouter.delete("/:id", isLoggedIn,deleteUserById);
userRouter.put("/:id",upload.single("image"),isLoggedIn, updateUser);

module.exports = userRouter;
