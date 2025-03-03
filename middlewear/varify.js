const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header("Authorization"); 
    if (!token) {
        token = req.cookies?.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
    }

    try {
     

        const decoded = jwt.verify(token, process.env.jwt_code);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid Token!" });
    }
};
