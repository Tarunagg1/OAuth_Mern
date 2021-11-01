const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/oauth",{useNewUrlParser: true},(err,link)=>{
    if(err)
    console.log(err);
    else{
        console.log("database connected");
    }
})


