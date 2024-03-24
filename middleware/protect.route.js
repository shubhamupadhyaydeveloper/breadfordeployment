const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protectedRoute = async (req ,res , next)  => {

    try {
        const token = req.cookies.jwt

        if(!token) {
            return res.status(401).json({message : "Unauthorized User"})
        }
    
        const decoded =  jwt.verify(token , process.env.JSON_SECRET)
    
        const user = await User.findById(decoded.userId).select("-password")
    
        req.user =  user;
        
        next()
    } catch (err) {
        res.status(500).json({message : err.message})
        console.log("Error in Signup Protected routes", err.message)
    }
    
}

module.exports = protectedRoute;