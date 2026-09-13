const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcrypt');
const User = require('../model/User') ; 

const generateAccessToken = (userID) => {
    return jwt.sign({
        userID
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn : '15m'
    })
}

const generateRefreshToken = (userID) => {
    return jwt.sign({
        userID
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn : '7d'
    })
}

const register = async(req , res) => {
    try{
        const {username , email , password} = req.body ;
        const doesExist = await User.findOne({
            $or : [
                {username},
                {email}
            ]
        })

        if(doesExist)
        {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }
        const SALT = await bcrypt.genSalt(Number(process.env.SALT)) ;
        const hashPass = await bcrypt.hash(password, SALT) ;
        const user = await User.create({
            username ,
            email ,
            password : hashPass
        })
        const accessToken = generateAccessToken(user._id) ;
        const refreshToken = generateRefreshToken(user._id) ;

        res.cookie("refreshToken", refreshToken ,{
            httpOnly : true ,
            secure : true ,
            sameSite : 'strict' ,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        return res.status(201).json({
            Message : "User Registered Successfully",
            success : true ,
            accessToken
        })  
    }
    catch(err)
    {
        return res.status(401).json({
            Message : "Bad request",
            success : false,
            err
        })
    }
}

const login = async(req ,res) => {
    try{
        const {identifier , password} = req.body ;
        const doesExist = await User.findOne({
            $or : [
                {username : identifier},
                {email : identifier}
            ]
        })
        if(!doesExist)
        {
            return res.status(401).json({
                Message : "username or email not found",
                success : false 
            })
        }

        const passCheck = await bcrypt.compare(password , doesExist.password) ;
        if(!passCheck)
        {
            return res.status(401).json({
                Message : "password incorrect" ,
                success : false 
            })
        }
        const accessToken = generateAccessToken(doesExist._id) ;
        const refreshToken = generateRefreshToken(doesExist._id) ;

        res.cookie("refreshToken", refreshToken , {
            httpOnly : true,
            secure : true ,
            sameSite: 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            "Message" : "Logged in Successfull",
            success : true ,
            accessToken,
            doesExist
        })
    }
    catch(err)
    {
        return res.status(401).json({
            Message: "Bad request",
            success: false,
            err,
        }) ;
    }
}

const refresh = async(req , res) => {
    try{
        const refreshToken = req.cookies.refreshToken ;
        if(!refreshToken)
        {
            return res.status(401).json({
                Message : "Refresh token missing" ,
                success : false 
            })
        }

        const decoded = jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET) ;
        const accessToken = generateAccessToken(decoded.userID) ;
        return res.status(200).json({
            Message : "New accessToken created", 
            success : true,
            accessToken, 
            decoded
        }) 
    }  
    catch(err)
    {
        return res.status(401).json({
            Message: "Refreshtoken invalid or expired",
            success: false,
            err,
        });
    }
}

const logout = async(req ,res) => {
    res.clearCookie("refreshToken", {
        httpOnly : true ,
        secure : true ,
        sameSite : 'strict' 
    })

    return res.status(200).json({
        Message : "Logged Out successfully",
        success : true 
    })
}

module.exports = {register, login ,refresh , logout} ;