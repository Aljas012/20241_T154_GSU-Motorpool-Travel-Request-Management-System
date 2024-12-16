const validateAuthCode = (req, res, next) => {
    if (!req.query.code) {
        return res.status(400).json({ error: 'Authorization code is required' });
    }
    next();
};

module.exports = { validateAuthCode };