const Dev = require("../model/Dev");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerDev = async (req, res) => {
    let { username, email, password , company} = req.body;
    let user = await Dev.findOne({
        $or: [{ username }, { email }],
    });
    if (user) {
        return res.status(409).json({
            Message: "Dev Already Exists",
        });
    }
    let salt = await bcrypt.genSalt(Number(process.env.SALT));
    let hash = await bcrypt.hash(password, salt);

    const newUser = await Dev.create({
        username,
        email,
        password: hash,
        company
    });

    let token = jwt.sign(
        {
            id: newUser._id,
            account_type: "developer",
            company : newUser.company
        },
        process.env.JWT_SECRET,
    );

    res.cookie("token", token);

    res.status(201).json({
        Message: "Dev Registered Successfully",
    });
};

const loginDev = async (req, res) => {
    let { identifier, password } = req.body;
    let userExist = await Dev.findOne({
        $or: [{ username: identifier }, { email: identifier }],
    });
    if (!userExist) {
        return res.status(404).json({
            Message: "Register First Dev not Found",
        });
    }

    let passCheck = await bcrypt.compare(password, userExist.password);
    if (!passCheck) {
        return res.status(409).json({
            Message: "Invalid Credentials",
        });
    }

    const token = jwt.sign(
        {
            id: userExist._id,
            account_type : "developer",
        },
        process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    res.status(200).json({
        Message: "Dev Logged in",
    });
};

const logoutDev = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        Message: "Logged Out",
    });
};

module.exports = { registerDev , loginDev, logoutDev };
