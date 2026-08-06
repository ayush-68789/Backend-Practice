const Joi = require('joi') ;

const musicSchema = Joi.object({
    title : Joi.string().min(2).max(15)
})

module.exports = musicSchema ; 