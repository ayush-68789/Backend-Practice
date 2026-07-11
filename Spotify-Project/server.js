const express = require("express");
const app = express();
require('dotenv').config() ; 
const cookieParser = require('cookie-parser') ; 

const connectDB = require("./config/db");
const authRoutes = require('./routes/auth.routes') ; 

app.use(express.json()) ; 
app.use(cookieParser()) ;

connectDB();

app.use('/api/auth', authRoutes) ; 

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server Listening at port : ${PORT}`);
});
