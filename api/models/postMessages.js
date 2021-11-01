"use strict";

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likecount:{
        type:Number,
        default:0
    }
},{timeStamps:true});

const postModel = mongoose.model('postMessage',postSchema);
module.exports = postModel;






