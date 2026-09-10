const jwt = require('jsonwebtoken') ;
const authUser = async(req ,res , next) => {
    let token = req.cookies.token ;
    if(!token)
    {
        return res.status(400).json({
            Message : "Login/Register First",
            success : false
        })
    }
    try{
        let decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        console.log(decoded) ;
        req.userID = decoded.userID ;
        next() ;
    }
    catch(err)
    {
        res.status(400).json({
            Message : ""
        })
    }

}

module.exports = authUser ; 