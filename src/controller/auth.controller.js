const jwt = require('jsonwebtoken'); //npm i jsonwebtoken
const bcrypt = require('bcryptjs');  //npm i bcryptjs

const userModel = require('../models/user.model')

async function registerUser(req, res) {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({
            msg: "All the fireelds are required to register user"
        })
    }

    const isUser = await userModel.findOne({ email })
    if (isUser) {
        return res.status(200).json({
            msg: "User already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
        userName,
        email,
        password: hashPassword
    })


    const usertoken = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRETE_KEY, { expiresIn: "3d" });


    res.cookie("userToken", usertoken);

    res.status(201).json({
        msg: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            token: usertoken
        }
    })
}

async function loginUser(req, res) {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({
            msg: "Missing credentials"
        })
    }

    const isUserExists = await userModel.findOne({$or: [{ email }, { userName }]});
    if (!isUserExists) {
        return res.status(400).json({
            msg: "User not found"
        })
    }

    const comparePassword = await bcrypt.compare(password, isUserExists.password)
    if (!comparePassword) {
        return res.status(400).json({
            msg: "Invalid username or password"
        })
    }

    const userToken = jwt.sign({
        id: isUserExists._id
    }, process.env.JWT_SECRETE_KEY)

    res.cookie("userToken", userToken);

    res.status(200).json({
        msg: 'user LoggedIn successfully',
        userData: {
            id: isUserExists._id,
            userName: isUserExists.userName,
            email: isUserExists.email,
            userToken: userToken
        }
    })

}

module.exports = {
    registerUser,
    loginUser,

}