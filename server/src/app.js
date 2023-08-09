const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const seedRouter = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');
const authRouter = require('./routers/authRouter');
const cookieParser = require('cookie-parser')


const app = express();

// if any hacker or any users try to access get | post| delete | put or any api over 5 times in one minutes , it is  not possible now. Because , we have set limit.

const rateLimiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max: 5,
    message: "Too many Request from this IP. Please try again."
})


// all middlewares are here
app.use(cookieParser())
app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// routing sector
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/seed',seedRouter);




// health checking api

app.get('/test', (req, res) => {
  res.status(200).json({
    message:'Welcome to E-commerce project server, api is working fine',
    
  })

});



//client error handling 

app.use((req,res,next) => {
   next(createError(404, "Route Not Found"))
});



//server error handling 


app.use((err, req,res,next) => {
    return errorResponse(res, {
      statusCode:err.status,
      message: err.message
    })

});




module.exports = app;


