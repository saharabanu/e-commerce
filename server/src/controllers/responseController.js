/*
 to handle error response function

 we have set default value, by chance,  we forget to pass code or message
*/
const errorResponse =  (res, {statusCode = 500, message = "Internal Server Error"} ) => {
    return res.status(statusCode).json({
        success:false,
        message: message
    })

};



/*
 to handle success response function

 we have set default value, by chance,  we forget to pass code or message.  when server running is success, then we can pass any data, for this , we take payload by default {} object
*/
const successResponse =  (res, {statusCode = 200, message = "Success", payload= {}}) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        payload
    })

};

module.exports = {errorResponse, successResponse};