const User = require("../models/userModel");
const createError = require('http-errors');
const { successResponse } = require("./responseController");
const bcrypt = require('bcryptjs');
const createJsonWebToken = require("../helpers/jsonWebToken");
const { jwtAccessKey } = require("../secret");

const handleLogin = async(req, res, next)=> {
try {

// email and password from req.body
const {email, password} = req.body;
 const user = await User.findOne({email});
// email check
 if(!user) throw createError(404, "User does not exist in this email. Please Register first")
 
// compare password
 const isPassword = await bcrypt.compare(password, user.password);
 if(!isPassword){
    throw createError(401, "Email/password does not match")
 }

 // user not banned
 
 if(user?.isBanned){
    throw createError(403, "You are Banned. Please Contact authority")
 }

 // jwt token
 const accessToken = createJsonWebToken(
    {  email },
    jwtAccessKey,
    "10m"
  );
  res.cookie("access_Token", accessToken,{
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    //secure: true,
    sameSite:"none" // it is used to control same site open like 30001 etc without 3000
  })

  // cookie

 return successResponse(res, {
    statusCode: 200,
      message: "User LoggedIn successfully",
      payload:user
 })



    
} catch (error) {
    next(error)
}
};

const handleLogOut = async(req,res,next) => {
try {
    res.clearCookie("access_Token");
    
 return successResponse(res, {
    statusCode: 200,
      message: "User LoggedOut successfully",
      payload:{}
 })
} catch (error) {
    next(error)
}
}

module.exports = {handleLogin, handleLogOut}