require('dotenv').config() ; 
const express = require('express') ;
const app = express () ; 

const morgan = require('morgan') ; // Logger middleware
const connectDB = require('./config/db') ; 
const authRoutes = require('./routes/auth.routes') ;
const cookieParser = require('cookie-parser') ;
const CORS = require('cors') ;

app.use(
    CORS({
        origin: "http://localhost:5173",
        credentials : true
    })
);
app.use(express.json()) ; // body parser middleware
app.use(morgan('dev')) ; // logger middleware
app.use(cookieParser()) ;

app.use(authRoutes) ;

const PORT = process.env.PORT ;
app.listen(PORT , () => {
    console.log("=".repeat(30)) ;
    console.log(`Server Running at PORT : ${PORT}`) ;
    connectDB() ;
    console.log("=".repeat(30)) ;
})