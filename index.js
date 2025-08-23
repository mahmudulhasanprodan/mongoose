 const express = require('express');
 const mongoose = require('mongoose');

 //express app initialization
 const app = express();
 app.use(express.json());

//Database connection with mongoose
mongoose.connect("mongodb://localhost/todos")
.then(() => console.log("Connection Successful"))
.catch((err) => console.log(err))
//aplication routes


//default app error handling

function ErrorHandler(err,req,res,next){
    if(res.headerSent){
       return next(err);
    }else{
        res.status(500).json({error: err});
    }
};


 app.listen('3000',()=>{
    console.log("listening to port 3000");  
 })