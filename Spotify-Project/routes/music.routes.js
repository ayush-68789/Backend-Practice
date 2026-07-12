const express = require('express') ;
const Router = express.Router() ;  
const musicController = require('../controllers/music.controller') ; 

Router.post('/upload', musicController.createMusic) 

module.exports = Router ;