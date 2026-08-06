const validate = (Schema) => {
    return (req, res, next) => {
        const{error, value} = Schema.validate(req.body, {
            abortEarly : false
        })
        if(error)
        {
            return res.status(400).json({
                error : error.details.map(err => err.message) 
            })
        }
        next() ; 
    }
}
module.exports = validate ;