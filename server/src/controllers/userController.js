const User = require("../models/userModel");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { successResponse } = require("./responseController");
const { findWithId } = require("../services/itemFindById");
const { deleteImage } = require("../helpers/deleteImage");
const createJsonWebToken = require("../helpers/jsonWebToken");
const { jwtActivationKey, client_Url } = require("../secret");
const sendEmailWithNodeMailer = require("../helpers/emailer");

// find all users controller function
const getUsers = async (req, res, next) => {
  try {
    //for searching need some variable

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit || 5);

    /// regular expression for searching

    const searchRegExp = new RegExp(".*" + search + ".*", "i"); // i is used for case sensitive

    // only search and get user not any admin, we can search by using name or email or phone number
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    // we don't to show password when we will find users,so we use this and pass as parameter
    const options = { password: 0 };

    // find all users
    const users = await User.find(filter, options)
      // for pagination, every page have 5 users , we have to use limit
      .limit(limit)
      .skip((page - 1) * limit);

    // to see total document
    const count = await User.find(filter).countDocuments();
    // if we don't find user, then we use it

    if (!users) throw createError(404, "Users not found");
    return successResponse(res, {
      statusCode: 200,
      message: "All Users here returned successfully",
      payload: {
        users: users,

        //for return pagination
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// find user by id controller function

const getUserById = async (req, res, next) => {
  try {
    // id comes form params

   

    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "user was returned successfully",
      payload: {
        user: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// register user

const postUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const image = req.file
    // to create buufer image 
    const bufferImage = image.buffer.toString("base64");
    // if it is error
   
    if(!image){
 throw createError(400, "Image file is required")
    }

    // to control file size
    if(image.size > 1024 * 1024 * 2){
 throw createError(400, "File is too large. It must be less than 2 mb")
    }

    // to handle  same email in double. user will create if email is not unique
    const isUserExist = await User.exists({ email: email });

    if (isUserExist) {
      throw createError(409, "This email is already exist. Please login");
    }
    // jwt token
    const token = createJsonWebToken(
      { name,image:bufferImage, email, password, phone, address },
      jwtActivationKey,
      "10m"
    );
    //  console.log(token)

    //prepare email for smtp and send mailer

    const emailData = {
      email,
      subject: "Account Activation Email",
      html: ` 
  <h2>Hello ${name}</h2>
  <p> Please click here to  activate your account <a href="${client_Url}/api/users/activate/${token}" target="_blank"> </a> </p>
  
  `,
    };
    // send node mailer email
    try {
       await sendEmailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification email"));
      return;
    }

    //  const newUser = {
    //   name, email, password, phone, address
    //  }
    return successResponse(res, {
      statusCode: 200,
      message: `Please got to your ${email} for completing your registration process `,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

// verify account user

const activateAccount = async (req, res, next) => {
  try {
    // get token from body
    const token = req.body.token;
    // check not token
    if (!token) throw createError(404, "Token not found");

    // console.log(token)

    try {
      // jwt token very fy
      const decoded = jwt.verify(token, jwtActivationKey);

      // if it is not found decode data from token
      if (!decoded) throw createError(401, "Unable to verify user ");

      // check user exist or not 


      const isUserExist = await User.exists({ email: decoded.email });

    if (isUserExist) {
      throw createError(409, "This email is already exist. Please login");
    }
      // create user
      await User.create(decoded);

      //console.log(decoded)
      return successResponse(res, {
        statusCode: 201,
        message: "User was registered successfully",
      });
    } catch (error) {
      if(error.name === 'TokenExpiredError'){
        throw createError(401,' Token has expired')
      }
      else if(error.name === 'JsonWebTokenError'){
        throw createError(401,' Invalid Token')
      }
      else{
        throw error
      }
    }
  } catch (error) {
    next(error);
  }
};

// delete user
const deleteUserById = async (req, res, next) => {
  try {
    // id comes form params

    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    // remove users image must from public , fs module diye

    const userImagePath = user.image;
    deleteImage(userImagePath);

    // delete method
    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
// update user
const updateUser = async (req, res, next) => {


  try {

    // id comes form params

    const id = req.params.id;
    const options = { password: 0 };
   await findWithId(User, id, options);
    const updateOptions = { new: true, runValidators: true, context:"query"}
    
    let update = {};

    // if(req.body.name){
    //   update.name=req.body.name
    // }
    // if(req.body.password){
    //   update.password=req.body.password
    // }
    // if(req.body.phone){
    //   update.phone=req.body.phone
    // }
    // if(req.body.address){
    //   update.address=req.body.address
    // }


    /// short cut 

    for(let key in req.body){
      if(['name','address','phone','password'].includes(key)){
       update[key]= req.body[key]
      }
      else if(['email'].includes(key)){
       throw new Error( 'Email can not be updated')
      }
      
    }
    const image = req.file;
    
    if(image){
      // to control file size
    if(image.size > 1024 * 1024 * 2){
      throw createError(400, "File is too large. It must be less than 2 mb")
         }
         update.image = image.buffer.toString('base64')
    }
// delete email if anyone can update email, he cant do it

//delete update.email;
// update method
     const updatedUser = await User.findByIdAndUpdate(id, update, updateOptions).select("-password")
     if(!updatedUser){
 throw createError(404, " User with this id doesn't exists")
     }
    return successResponse(res, {
      statusCode: 200,
      message: "user was Updated successfully",
      payload:updatedUser
    });


    
  } catch (error) {
    next(error);
  }
};




module.exports = { getUsers, getUserById, postUser, deleteUserById, updateUser, activateAccount };
