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

          req.body.userId = decoded._id

        next()
    } catch (error) {
        return next(error)
    }

}
const isLoggedOut = async(req,res, next) => {
    try {

        // access token from cookie
        const token = req.cookies.access_Token;
        if(!token){
            throw createError(401, "User Already LoggedIn")
        }
        next()
    } catch (error) {
        return next(error)
    }

}
module.exports = {isLoggedIn, isLoggedOut}