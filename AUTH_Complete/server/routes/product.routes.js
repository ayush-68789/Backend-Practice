const express = require('express') ; 
const Router = express.Router() ;
const authUser = require('../middlewares/auth.user') ;
Router.get('/products', authUser , (req ,res) => {
    res.send("hello bhai sb shi h ")
}) ;
// Router.post('/login', authController.login) ;

module.exports = Router ;