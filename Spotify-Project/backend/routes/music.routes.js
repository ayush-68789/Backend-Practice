const express = require('express') ;
const Router = express.Router() ;  
const musicController = require('../controllers/music.controller') ; 
const authMiddleWare = require('../middlewares/auth.Middleware') ;
const validate = require('../middlewares/validate') ; 
const musicValidationSchema = require('../validations/music.validation') ; 

Router.get('/',authMiddleWare.authUser, musicController.getMusic) ; 

Router.post('/upload',authMiddleWare.authArtist,validate(musicValidationSchema) , musicController.createMusic) 

module.exports = Router ;