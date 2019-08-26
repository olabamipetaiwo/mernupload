const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const authMiddleware = (req,res,next) => {
    const token = req.header('x-auth-token');
     if(!token) {
        return res.status(401).json({
            msg:"No token,access denied"
        });
    }
    try {
        const decoded = jwt.verify(token,config.jwtKey);
        req.user = decoded.user;
        next();
    }catch(err) {
        return res.status(401).json({
            msg:"Invalid token,access denied",
            err:err.message
        });
    }
};

module.exports = authMiddleware;