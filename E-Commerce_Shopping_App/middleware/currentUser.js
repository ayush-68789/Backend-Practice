const jwt = require('jsonwebtoken') ;

const currentUser = async(req ,res ,next) => {
    let token = req.cookies.token ; 
    if(!token )
    {
        res.locals.user = null ;
        next() ; 
        return res.status(401) ; 
    }

    try {
        const decoded = await jwt.verify(token , process.env.JWT_SECRET) ;
        res.locals.user = decoded ;
        next() ; 
    }
    catch(err) {
        res.locals.user = null ;
        return res.status(401) ; 
    }
}

module.exports = currentUser ; 