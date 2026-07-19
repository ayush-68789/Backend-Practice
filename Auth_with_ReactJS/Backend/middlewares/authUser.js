const jwt = require('jsonwebtoken') ;
const User = require('../model/User') ; 

const authUser = async(req, res, next) => {
    let token = req.cookies.token ;
    if(!token)
    {
        return res.status(409).json({
            Message : "Unauthenticated"
        })
    }

    try{
        let decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        if(!decoded.account_type === "user")
        {
            return res.status(401).json({
                Message : "Unauthorized"
            })
        }
        next() ; 
    }
    catch(err){
        return res.status(401).json({
            Message: "Unauthorized",
        });
    }
}

module.exports = authUser ; 