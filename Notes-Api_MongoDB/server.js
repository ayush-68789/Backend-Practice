const express = require('express') ; 
const connectDb = require('./config/db');
const noteRoutes = require('./routes/noteRoutes') ;
const app = express() ; 

connectDb() ;

// Middlewares
app.use(express.json()) ;

// Routes 
app.use(noteRoutes) ; 
 
const PORT = 5050 ;
app.listen(PORT , () => {
    console.log(`Server is Running at ${PORT}`) ;
})