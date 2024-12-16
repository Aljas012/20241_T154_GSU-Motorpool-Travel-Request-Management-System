const jwt = require('jsonwebtoken');

const userAuthenticateToken = (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        console.error(`Token missing for route: ${req.originalUrl}`);
        return res.status(401).json({ message: "Access denied, token missing" });
    }
    try {
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        console.error("Error verifying token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

const adminAuthenticateToken = (req, res, next) => {
   
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        console.error(`Token missing for route: ${req.originalUrl}`);
        return res.status(401).json({ message: "Access denied, token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        console.error("Error verifying token:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { userAuthenticateToken ,adminAuthenticateToken};
