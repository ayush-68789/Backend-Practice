const Dev = require('../model/Dev') ; 
const jwt = require('jsonwebtoken') ;

const authDev = async(req ,res ,next) => {
    let token = req.cookies.token ;
    if(!token)
    {
        return res.status(409).json({
            Message : "Unauthorized"
        })
    }
    try{
        let decoded = jwt.verify(token, process.env.JWT_SECRET) ; 
        if(decoded.account_type !== "developer")
        {
            return res.status(409).json({
                Message : "Unauthorized"
            })
        }
        req.devId = decoded.id ; 
        next() ; 
    }
    catch(err) {
        return res.status(409).json({
            Message: "Unauthorized",
        });
    }
}

module.exports = authDev ; 