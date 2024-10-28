import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema(

    {
        user_id: { type: Number, required: true, unique: true },
        office_code: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        position: { type: String, required: true },
        department: { type: String, required: true },
        role: { type: String, default: "admin" }
    }
);
data = "abc12345"
export default mongoose.model('Admin', adminSchema);
