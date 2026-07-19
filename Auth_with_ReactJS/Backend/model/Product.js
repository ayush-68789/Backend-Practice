const mongoose = require('mongoose') ;
const Dev = require('../model/Dev') ;

const productSchema = new mongoose.Schema({
    name : {
        type : String, 
        required : true 
    },
    devBy : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : Dev ,
        required : true
    }
})

const Product = mongoose.model("Product", productSchema) ;

module.exports = Product ;