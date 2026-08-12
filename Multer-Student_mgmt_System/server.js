const express = require('express'); 
const app = express() ; 

require('dotenv').config() ; 
const connectDB = require('./config/db') ;
const studentRoutes = require('./Routes/student.routes') ;

app.use(express.json()); 

connectDB() ; 
app.use(studentRoutes) ;

const PORT = process.env.PORT ; 
app.listen(PORT, ()=>{
    console.log(`Server Running at ${PORT}`) ;
})