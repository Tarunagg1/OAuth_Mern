require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');

const app = express();

app.use(express.json({extended:true, limit:"30mb"}));
app.use(express.urlencoded({extended:true, limit:"30mb"}));

app.use(cors());


app.use('/posts',require('./routes/post'));
app.use('/auth',require('./routes/auth'));


const PORT = process.env.PORT || 4000;

app.listen(PORT,()=>{
    console.log('Server listning at ',PORT);
})

