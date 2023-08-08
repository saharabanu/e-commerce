const {Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');







const userSchema = new Schema({
  name:{
    type: String,
    required: [true, "user name is required"],
    trim: true, // to capture empty space
    maxLength:[31, "The length of User name can be maximum 31 character"],
    minLength:[3, "The length of User name can be minimum 3 character"],
  },
  email:{
    type: String,
    required: [true, "User email is required"], 
    trim: true,
    lowerCase:true, // convert lowercase
    unique: true,
    validate:{
      validator: function (v){
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v))

      },
      message: "Please Enter a valid email"
    }
  },

  password:{
    type: String,
    required: [true, "user password is required"],
    minLength:[6, "The length of password name can be minimum 6 character"],
    set: (v) =>  bcrypt.hashSync(v, bcrypt.genSaltSync(10))

    
  },
  image:{
    type: Buffer,
     contentType: String,
     required: [true, "User Image is required"], 
    
  },
  // image:{
  //   type: Buffer,
  //     default:defaultImagePath
    
  // },
  address:{
    type: String, 
    required: [true, "user address is required"],
    minLength:[3, "The length of user address can be minimum 3 character"]
    
  },
  phone:{
    type: String,
    required: [true, "user phone is required"],
    
  },
  isAdmin:{
    type: Boolean,
    default: false,
    
  },
  isBanned:{
    type: Boolean,
    default: false,
    
  }
  

}, {timestamps: true})


const User = model("Users", userSchema);

module.exports = User;



