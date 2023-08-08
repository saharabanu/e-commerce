// registration 


const { body } = require('express-validator');


const validationRegistration =[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min: 3, max:31})
    .withMessage("Name should be at least 3-31 characters long"),
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("INVALID EMAIL ADDRESS"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({min:6})
    // .matches("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}")
    .withMessage(" password should be at least 6 characters longMust contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"),
    body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required")
    .isLength({min:3})
    .withMessage("address at least 3 character long"),


    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Enter your Phone Number is required"),
    body("image").optional().isString()
    .withMessage("image is required"),

    body("image")
    .custom((value, {req}) => {
        if(!req.file || !req.file.buffer){
            throw new Error("User image is required")
        }
        return true
    })
    .withMessage("User Image is required")
    



]


module.exports = {validationRegistration}
