const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const authMiddleware = () => {
    const token = req.header('x-auth-token');
    if(!token) {
        return res.status(401).json({
            msg:"No token,access denied"
        });
    }
    try {
        const decoded = jwt.verify(token,config.get('jwtKey'));
        req.user = decoded.user;
        next();
    }catch(err) {
        return res.status(401).json({
            msg:"Invalid token,access denied"
        });
    }
};

module.exports = authMiddleware;