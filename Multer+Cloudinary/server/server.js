const express = require('express') ;
const app = express() ; 
const connectDB = require('./config/db') ;

require('dotenv').config() ;

connectDB() ;

const PORT = process.env.PORT ; 
app.listen(PORT , () => {
    console.log(`Server running at PORT ${PORT}`) ; 
})