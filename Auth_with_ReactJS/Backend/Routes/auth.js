const express = require('express') ;
const Router = express.Router() ; 
const userController = require('../controllers/userController') ; 
const devController = require('../controllers/devController') ; 

Router.post('/register', userController.registerUser)
Router.post('/login', userController.loginUser)
Router.post('/logout', userController.logoutUser) ; 

Router.post('/dev/register', devController.registerDev) ;
Router.post('/dev/login', devController.loginDev) ;
Router.post('/dev/logout', devController.logoutDev) ;

module.exports = Router ;