require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 7000;


const mongoDBUrl = process.env.MONGODB_ATLAS_URL||" mongodb://localhost:27017/EcommerceMernDB";

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || '../public/images/users/avatar.jpg';



module.exports = {serverPort, mongoDBUrl, defaultImagePath}