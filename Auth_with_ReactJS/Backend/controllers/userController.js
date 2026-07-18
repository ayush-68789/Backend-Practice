const User = require('../model/User') ; 
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ; 

const registerUser = async(req , res)=> {
    let {username, email , password} = req.body ; 
    let user = await User.findOne({
        $or : [
            {username}, 
            {email}
        ]
    })
    if(user)
    {
        return res.status(409).json({
            Message : "User Already Exists"
        })
    }
    let salt = await bcrypt.genSalt(Number(process.env.SALT)) ; 
    let hash = await bcrypt.hash(password , salt) ; 
    
    const newUser = await User.create({
        username ,
        email,
        password : hash 
    })
    
    let token = jwt.sign({
        id : newUser._id, 
        account_type : "user"
    }, process.env.JWT_SECRET)

    res.cookie("token" ,token) ;

    res.status(201).json({
        Message : "User Registered Successfully"
    })
}

const loginUser = async(req ,res) =>{
    let {identifier , password} = req.body ;
    let userExist = await User.findOne({
        $or :[
            {username : identifier}, 
            {email : identifier}
        ]
    })
    if(!userExist)
    {
        return res.status(404).json({
            Message : "Register First User not Found"
        })
    }

    let passCheck = await bcrypt.compare(password, userExist.password) ; 
    if(!passCheck)
    {
        return res.status(409).json({
            Message: "Invalid Credentials",
        });
    }

    const token = jwt.sign({
        id : userExist._id, 
        account_type : "user"
    }, process.env.JWT_SECRET)

    res.cookie("token", token) ; 
    res.status(200).json({
        Message : "User Logged in"
    })
}

const logoutUser = async (req ,res) => {
    res.clearCookie('token') ;
    res.status(200).json({
        Message : "Logged Out"
    }) 
}

module.exports = {registerUser, loginUser , logoutUser} ; 