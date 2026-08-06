const Joi = require('joi') ; 

const userSchema = Joi.object({
    username : Joi.string().min(3).max(15).required(), 
    email : Joi.string().email().required() , 
    password : Joi.string().required().min(6).max(15) , 
})

module.exports = userSchema ;