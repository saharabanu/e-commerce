const User = require("../models/userModel");
const createError = require('http-errors');
const { successResponse, errorResponse } = require("./responseController");
const { default: mongoose } = require("mongoose");
const { userFindById } = require("../services/userFindById");


// find all users controller function
  const getUsers =  async(req, res, next) => {
   try {
    //for searching need some variable

    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit || 5);


    /// regular expression for searching

    const searchRegExp = new RegExp(".*" + search + ".*");

    // only search and get user not any admin, we can search by using name or email or phone number
    const filter = {
      isAdmin: { $ne: true},
      $or:[
        {name: {$regex : searchRegExp}},
        {email: {$regex : searchRegExp}},
        {phone: {$regex : searchRegExp}},
      ]
    };
   // we don't to show password when we will find users,so we use this and pass as parameter
    const options = {password: 0}

    // find all users 
    const users = await User.find(filter,options)
    // for pagination, every page have 5 users , we have to use limit
    .limit(limit)
     .skip((page - 1) * limit);

     // to see total document
     const count = await User.find(filter).countDocuments();
     // if we don't find user, then we use it

     if(!users) throw createError(404, "Users not found");
     return successResponse(res,{
      statusCode: 200,
      message: 'All Users here returned successfully',
      payload:{
        users: users,

        //for return pagination
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page -1 : null,
          nextPage : page + 1 <= Math.ceil(count/limit) ? page + 1 : null
        }
      }

     })
   
    
   } catch (error) {
    next(error)
    
   }
  };





// find user by id controller function

  const getUser =  async(req, res, next) => {
   try {
    // id comes form params

    const id = req.params.id;
    
   const user = await userFindById(id)
     return successResponse(res,{
      statusCode: 200,
      message: 'user was returned successfully',
      payload:{
        user: user
      }

     })
   
    
   } catch (error) {
    
    next(error)
    
   }
  }



  const postUser = (req, res,next) => {
   try {
    res.status(200).json({
        message:'Welcome to E-commerce project server, post api is working fine',
       
      })
    
   } catch (error) {
    next(error)
   }
  
  }




  const deleteUser = (req, res,next) => {
    try {
        res.status(200).json({
            message: "Welcome to E-commerce project server, delete api is working fine",
          });
    } catch (error) {
        next(error)
    }
  }


  const updateUser = (req, res, next) => {
   try {
    res.status(200).json({
        message: "Welcome to E-commerce project server, put api is working fine",
      });
   } catch (error) {
    next(error)
   }
  }



module.exports = {getUsers,getUser, postUser, deleteUser, updateUser}