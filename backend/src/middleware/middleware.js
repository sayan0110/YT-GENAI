const jwt = require('jsonwebtoken')
const logoutSchema = require('../models/userLogout.model')

async function verifiedUserMiddleware(req, res, next) {
    const token = req.cookies.userToken;

    if (!token) {
        return res.status(400).json({
            msg: 'Token is missing'
        })
    }

    const isBlacklistedToken = await logoutSchema.findOne({ token })
    if (isBlacklistedToken) {
        return res.status(400).json({
            msg: "Token is invalid"
        })
    }

    try {

        const verifiedToken = jwt.verify(token, process.env.JWT_SECRETE_KEY)

        req.verifiedUser = verifiedToken;

        next();

    } catch (error) {
        return res.status(400).json({
            msg: "token is not verified"
        })
    }


}

module.exports = {
    verifiedUserMiddleware
}