const express = require('express') ;
const Router = express.Router() ;

const authUser = require('../middlewares/authUser') ; 
const authDev = require('../middlewares/authDev')
const productController = require('../controllers/productController') ; 

Router.get('/products',authUser ,productController.getProducts) ; 
Router.post('/products',authDev ,productController.addProducts) ; 

module.exports = Router ;