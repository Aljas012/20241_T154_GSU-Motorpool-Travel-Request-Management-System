const jwt = require('jsonwebtoken');

const userGenerateToken = (userId,college_name,name,email,office_code) => {
    return jwt.sign({
         id: userId,
         office_code:office_code,
         email:email,
         name:name,
         college_name:college_name,
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};


const adminGenerateToken = (adminId,name,email) => {
    return jwt.sign({
         id: adminId,
         email:email,
         name:name
        }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });
};

module.exports = {adminGenerateToken,userGenerateToken} ;
