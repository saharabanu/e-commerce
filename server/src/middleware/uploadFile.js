const multer  = require('multer');
const path  = require('path');
const createError = require("http-errors");
const { UPLOAD_USER_IMG_DIR, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } = require('../config');
// // image set in public
// const UPLOAD_DIR = uploadFile;
// // image file size set

// const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE) || 2097152;

// const ALLOWED_FILE_TYPES = process.env.ALLOWED_FILE_TYPES || ['jpg','jpeg', 'png'];

// 1024 * 1024 kilobyte e convert and 2 mb
const storage = multer.diskStorage({

    
    destination: function (req, file, cb) {
      cb(null, UPLOAD_USER_IMG_DIR)
    },
    filename: function (req, file, cb) {
      const extName = path.extname(file.originalname);

      cb(null, Date.now() + "-" + file.originalname.replace(extName, "") + extName)
    }
  });

  // filtering

  const fileFilter = (req, file, cb) =>{
    const extName = path.extname(file.originalname);
    if(!ALLOWED_FILE_TYPES.includes(extName.substring(1))){
        
        return cb(new Error("File Type not Allowed"), false)
    }
    cb(null, true)
  }
  
  const upload = multer({ storage: storage, limits: {fileSize:MAX_FILE_SIZE},
fileFilter });
  module.exports = upload;