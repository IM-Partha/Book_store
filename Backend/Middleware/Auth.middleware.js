const JWT = require('jsonwebtoken')
require('dotenv').config()

const Authmiddleware = (req,res,next) =>{
    const AuthHeaders = req.headers["authorization"]
    const Token = AuthHeaders && AuthHeaders.split(" ")[1]



    if (!Token) {
        return res.status(401).json({
            success: false,
            message: "Token missing or invalid",
        });
    }
    try {
        const decode = JWT.verify(Token, process.env.JWT_SECRET_KEY || "myhardcodedsecretkey12345")
       
        req.userInfo = decode
        next()
    } catch (error) {
       
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}

module.exports = {Authmiddleware}
