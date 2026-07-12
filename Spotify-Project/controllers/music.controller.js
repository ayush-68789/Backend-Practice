const Music = require('../models/Music') ;
const jwt = require('jsonwebtoken') ;

const createMusic = async (req ,res) => {
    const token = req.cookies.token ; 
    if(!token)
    {
        return res.status(401).json({
            Message : "Unauthorized"
        })
    }
    
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET) ;
        if(decoded.role !== 'artist')
        {
            return res.status(403).json({
                Message : "You are not allowed to do this"
            })
        }
        let {title} = req.body ; 
        let music = await Music.create({
            title , 
            artist : decoded.id
        })
    
        res.status(201).json({
            Message : "Song Uploaded",
            music
        })
    }
    catch(err){
        return res.status(401).json({
            Message : "Unauthorized"
        })
    }

}

module.exports ={ createMusic} ; 

