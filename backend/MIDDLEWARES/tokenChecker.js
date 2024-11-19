const jwt = require('jsonwebtoken');

// Middleware to authenticate token
const userAuthenticateToken = (req, res, next) => {
    // Get the token from the Authorization header (expected format: "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1]; 

    // If token is not present, respond with a 401 Unauthorized error
    if (!token) {
        console.error("Token missing from request headers");
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the decoded user info to the request object (for further use in the route handler)
        req.user = decoded;

        // Proceed to the next middleware or route handler
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

    // If token is not present, respond with a 401 Unauthorized error
    if (!token) {
        console.error("Token missing from request headers");
        return res.status(401).json({ message: "Access denied, token missing" });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Attach the decoded user info to the request object (for further use in the route handler)
        req.user = decoded;

        // Proceed to the next middleware or route handler
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
