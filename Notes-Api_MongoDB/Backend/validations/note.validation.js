const Joi = require('joi') ; 

const noteSchema = Joi.object({
    title : Joi.string().alphanum().min(3).max(15).required().trim() ,
    desc : Joi.string().min(5).required().trim() 
})

module.exports = noteSchema ;