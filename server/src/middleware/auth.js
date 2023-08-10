const createError = require('http-errors');
const { jwtAccessKey } = require('../secret');
const jwt = require("jsonwebtoken");

const isLoggedIn = async(req,res, next) => {
    try {

        // access token from cookie
        const token = req.cookies.access_Token;
        if(!token){
            throw createError(401, "Access Token not found. Please Login")
        }

        // decoded id from jwt token

        const decoded = jwt.verify(token, jwtAccessKey);
        if(!decoded){
            throw createError(401, 'Invalid access token. Please Login again')
        }

          req.user = decoded.user1
          //console.log(req.user)
          //console.log(decoded.user1,)

        next()
    } catch (error) {
        return next(error)
    }

}
const isLoggedOut = async(req,res, next) => {
    try {

        // access token from cookie
        const token = req.cookies.access_Token;
        if(token){
            throw createError(400, "User Already LoggedIn")
        }
        next()
    } catch (error) {
        return next(error)
    }

}
const isAdmin = async(req,res, next) => {
    try {
        //console.log(req.user.isAdmin)

        if(!req.user.isAdmin){
            throw createError(403, 'Forbidden. You must be an Admin to access all users')
        }
        next()
    } catch (error) {
        return next(error)
    }

}
module.exports = {isLoggedIn, isLoggedOut, isAdmin}