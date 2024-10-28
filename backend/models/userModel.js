import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({

    user_id: { type: Number, required: true, unique: true },
    office_code: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    position: { type: String, required: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" }

});

// Export the model
export default mongoose.model('User', userSchema);
module.exports = User;


