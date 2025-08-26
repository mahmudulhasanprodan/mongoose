const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema); 
//get todo by all
route.get('/',async (req,res) => {
   await Todo.find({status : "active"}).select({
    _id : 0,
    __v : 0,
    date: 0,
   }).then((data) => {
        res.status(200).json({
          result : data,
          message: "Todo inserted successfully"
        })
     }).catch((err) => {
        res.status(500).json({
        error : "There was a serverside err"
       })
     })
  
  
});

//get todo by id
route.get('/:id',async (req,res) => {

});

//post todo by post
route.post('/',async (req,res) => {
     const newtodo = new Todo(req.body);
     await newtodo.save().then(() => {
        res.status(200).json({
          message: "Todo inserted successfully"
        })
     }).catch((err) => {
       res.status(500).json({
        error : "There war a serverside err"
       })
     })
});

//post todo by all
route.post('/all', async (req,res) => {
     await Todo.insertMany(req.body).then(() => {
        res.status(200).json({
          message: "Todo inserted successfully"
        })
     }).catch((err) => {
        res.status(500).json({
        error : "There was a serverside err"
       })
     })
  
});

//put todo 
route.put('/:id',async (req,res) => {
   await Todo.updateOne({_id:req.params.id},{
      $set:{
        status: "inactive",
      }
   }).then(() => {
     res.status(200).json({
          message: "Todo Status update successfully"
        })
   }).catch((err) => {
     res.status(500).json({
        error : "There was a serverside err"
       })
   })
});

//delete todo 
route.delete('/',async (req,res) => {

});

module.exports = route;










