const express = require('express') ; 
const App = express() ; 
require('dotenv').config() ; 
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser') ;
const authRoutes = require('./Routes/auth') ; 
const productRoutes = require('./Routes/product') ; 
const CORS = require('cors') ; 

connectDB() ; 

App.use(express.json());
App.use(cookieParser()) ; 
App.use(
    CORS({
        origin: "http://localhost:5173",
        credentials : true 
    }),
);

App.use(authRoutes) ; 
App.use(productRoutes) ; 

const PORT = process.env.PORT ; 
App.listen(PORT, ()=>{
    console.log(`Server Listening at ${PORT}`) ; 
})