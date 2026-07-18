const express = require('express') ; 
const App = express() ; 
require('dotenv').config() ; 
const connectDB = require('./config/db')
const authRoutes = require('./Routes/auth') ; 

connectDB() ; 

App.use(express.json());

App.use(authRoutes) ; 

const PORT = process.env.PORT ; 
App.listen(PORT, ()=>{
    console.log(`Server Listening at ${PORT}`) ; 
})