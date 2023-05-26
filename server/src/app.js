const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit')

const app = express();


const rateLimiter = rateLimit({
    windowMs : 1 * 60 * 1000,
    max: 5,
    message: "Too many Request from this IP. Please try again."
})





// middleware
app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));



// health checking api

app.get('/test', (req, res) => {
  res.status(200).json({
    message:'Welcome to E-commerce project server, api is working fine'
  })

});
app.post('/post', (req, res) => {
  res.status(200).json({
    message:'Welcome to E-commerce project server, post api is working fine'
  })

});
app.delete('/delete', (req, res) => {
  res.status(200).json({
    message:'Welcome to E-commerce project server, delete api is working fine'
  })

});
app.put('/put', (req, res) => {
  res.status(200).json({
    message:'Welcome to E-commerce project server, put api is working fine'
  })

});


//client error handling 

app.use((req,res,next) => {
   next(createError(404, "Route Not Found"))
});



//server error handling 


app.use((err,req,res,next) => {
  
    return res.status(err.status || 500).json({
        success: false,
        message:err.message
    })

});




module.exports = app;


