const express = require('express');
const mongoose = require('mongoose');
const route = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo',todoSchema); 
//get todo by all
route.get('/',async (req,res) => {
 
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

});

//delete todo 
route.delete('/',async (req,res) => {

});

module.exports = route;










