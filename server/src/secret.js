require('dotenv').config()
const serverPort = process.env.SERVER_PORT || 7000;


const mongoDBUrl = process.env.MONGODB_ATLAS_URL||" mongodb://localhost:27017/EcommerceMernDB";

const defaultImagePath = process.env.DEFAULT_USER_IMAGE_PATH || '../public/images/users/avatar.jpg';

// JWT KEY
const jwtActivationKey =  process.env.JWT_ACTIVATION_KEY || 'abc123456b';

// smtp username and email

const smtpUserName = process.env.SMTP_USERNAME || "";
const smtpUserPassword = process.env.SMTP_PASSWORD || "";
const client_Url = process.env.CLIENT_URL || ""



module.exports = {serverPort, mongoDBUrl, defaultImagePath,jwtActivationKey, smtpUserName,smtpUserPassword, client_Url}