const jwt = require('jsonwebtoken');



const createJsonWebToken = (payload, secretKey, expiresIn) => {

    // if someone sent empty object or not data or onot object, for this we  can handle it.
    if(typeof payload !== 'object' || !payload){
       throw new Error("Payload must be a non-empty object")

    }
    // if someone sent secret key empty string or  for this we  can handle it.
    if(typeof secretKey !== 'string' || secretKey === ""){
       throw new Error("Secret key must be a non-empty String")

    };

    try {
        const token = jwt.sign(payload,secretKey,{expiresIn});
         return token
    } catch (error) {
        console.error("failed to sign the JWT:", error);
        throw error
    }
};

module.exports = createJsonWebToken;