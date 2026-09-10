require('dotenv').config() ; 
const express = require('express') ;
const app = express () ; 

const morgan = require('morgan') ; // Logger middleware
const connectDB = require('./config/db') ; 
const authRoutes = require('./routes/auth.routes') ;
const productRoutes = require('./routes/product.routes') ;
const cookieParser = require('cookie-parser') ;

app.use(express.json()) ; // body parser middleware
app.use(morgan('dev')) ; // logger middleware
app.use(cookieParser()) ;

app.use(authRoutes) ;
app.use(productRoutes) ;

const PORT = process.env.PORT ;
app.listen(PORT , () => {
    console.log("=".repeat(30)) ;
    console.log(`Server Running at PORT : ${PORT}`) ;
    connectDB() ;
    console.log("=".repeat(30)) ;
})