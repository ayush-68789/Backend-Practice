const Joi = require('joi') ; 

const schema = Joi.object({
    name : Joi.string().required() ,
    age : Joi.number().required()
})

const payload = {
    name : "ayush", 
    age : 20
}

const {error ,value} = schema.validate(payload, {
    abortEarly : false
})

if(error)
{
    console.log(error.message) ;
}
else
{
    console.log('Validation successful') ;
}