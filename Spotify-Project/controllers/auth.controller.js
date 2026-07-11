const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs') ; 

const registerUser = async (req, res) => {
    let { username, email, password, role = "user" } = req.body;
    let alreadyExist = await User.findOne({
        $or: [{username}, {email}],
    });

    if(alreadyExist)
    {
        return res.status(409).json({
            Message : "Another user with same username or email is found"
        })
    }

    let salt = await bcrypt.genSalt(process.env.SALT) ; 
    const Hash = await bcrypt.hash(password, salt) ;
    let user = await User.insertOne({
        username,
        email,
        password : Hash,
        role,
    });

    const token = jwt.sign({
        id : user._id,
        role : user.role
    }, process.env.JWT_SECRET) ;

    res.cookie("token", token) ;

    res.status(201).json({
        Message : "User Registered Successfully" ,
        user
    })

};

module.exports = { registerUser };
