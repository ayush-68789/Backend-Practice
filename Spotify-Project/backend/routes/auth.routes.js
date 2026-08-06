const express = require('express') ; 
const Router = express.Router() ; 
const authController = require('../controllers/auth.controller') ; 
const validate = require('../middlewares/validate') ;
const validationSchema = require('../validations/user.validation') ; 

Router.post('/register',validate(validationSchema), authController.registerUser) ;
Router.post("/login", authController.loginUser);
Router.post("/logout", authController.logoutUser);

module.exports = Router ;