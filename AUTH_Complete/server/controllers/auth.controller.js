const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcrypt') ;
const User = require('../model/User') ;
const register = async(req ,res) => {
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
            Message : "User already exists" ,
            sucess : false
        })
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT)) ;
    const hashPass = await bcrypt.hash(password , salt) ;

    const user = await User.create({
        username , 
        email ,
        password : hashPass
    })

    const token = jwt.sign({
        userID : user._id
    },
        process.env.JWT_SECRET, 
        {
            expiresIn : "3d"
        }
    )

    res.cookie("token", token) ;
    res.status(201).json({
        Message : "User Registered", 
        success : true
    })
}

const login = async(req ,res) => {
    const {identifier, password} = req.body ;
    const user = await User.findOne({
        $or : [
            {username : identifier},
            {email : identifier}
        ]
    })
    if(!user)
    {
        return res.status(400).json({
            Message : "User Does'nt Exist. Register ", 
            success : false
        })
    }
    
    const hash = await bcrypt.compare(password , user.password) ;
    if(!hash)
    {
        return res.status(400).json({
            Message : "Password incorrect",
            success : false 
        })
    }
    const token = jwt.sign({
        userID : user._id
    },process.env.JWT_SECRET, {
        expiresIn : '3d'
    })
    res.cookie("token", token) ; 
    res.status(200).json({
        Message : "Login Successfull",
        success : true ,
        user
    })
}

module.exports = {register, login} ;