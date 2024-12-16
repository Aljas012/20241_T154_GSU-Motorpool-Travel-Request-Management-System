const admin_data = require ('../../MODELS/admin_model')
const bcrypt = require('bcrypt');
const adminGenerateToken =require("../../MIDDLEWARES/token_generator").adminGenerateToken;


const login_admin = async (req, res) => {  

    const { email, password } = req.body; 
  
    try {

        const admin = await admin_data.findOne({ email });

        if (!admin ) 
            {
                console.log('account not found!  -backend')
                return res.status(401).json({ error: 'Invalid email or password' }); 
            }

        console.log('account  found!  -backend')
        const isMatch = await bcrypt.compare(password, admin.password);

            
        if (!isMatch)
              { 
                return res.status(401).json({ error: 'Invalid email or password' }); 
            }

        console.log('credentials match  -backend')
        
        const token = adminGenerateToken(admin._id, admin.name, admin.email,admin.role);
        res.status(200).json({ message: 'Welcome admin',admin: {admin_token:token,admin_id:admin._id,name:admin.name, email: admin.email, role:admin.role}});
            
    } catch (error) {res.status(500).json({ error: 'Something went wrong in the backend!: ' + error.message });}
};

module.exports = {login_admin};