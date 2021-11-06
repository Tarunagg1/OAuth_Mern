"use strict";

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    id:{
        type:String
    }

},{timeStamps:true});

const postModel = mongoose.model('user',postSchema);
module.exports = postModel;






