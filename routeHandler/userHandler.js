const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const route = express.Router();
const userSchema = require('../schemas/userSchema');
const User = new mongoose.model('User',userSchema); 

//get todo by all
route.post('/signup', async (req,res) => {   
   try {
     const hashedPassword = await bcrypt.hash(req.body.password, 8);
     const newUser = new User({
     name: req.body.name,
     username: req.body.username,
     password:hashedPassword,
   });
    await newUser.save();
    res.status(200).json({
        message: "Sign Up was succesffully",
    })
   } catch (err) {
    res.status(500).json({
        error: err,
    })
   }
  
});

route.post('/login',async(req,res)=>{
  try{
    const user= await User.find({username:req.body.username});
    if(user && user.length >0){
      const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
      if(isValidPassword){
        //Generate token
        const token = jwt.sign({
          username: user[0].username,
          userId: user[0]._id,
        },process.env.JWT_SECRET,{
          expiresIn: "2h",
        });
        res.status(200).json({
          "access token" : token,
          "message" : "Login Successfull",
        })
      }else{
        res.status(401).json({
        error: "Authentication failure "
      })
      }
    }else{
      res.status(401).json({
        error: "Authentication failure "
      })
    }
  }catch(err){
    res.status(500).json({
      Error: err,
    })
  }
});


module.exports = route;










