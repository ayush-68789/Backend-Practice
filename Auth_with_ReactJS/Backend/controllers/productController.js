const Product = require('../model/Product') ;
const Dev = require('../model/Dev') ;

const getProducts = async(req , res) => {
    let products = await Product.find({}).populate("devBy") ;
    res.status(200).json({
        Message : "Data Fetched",
        products
    })
}

const addProducts = async(req ,res) =>{
    let {name} = req.body ;
    let newProduct = await Product.create({
        name, 
        devBy : req.devId
    })
    res.status(201).json({
        Message: "Data Added",
        newProduct,
    });
}

module.exports = {getProducts, addProducts} ; 