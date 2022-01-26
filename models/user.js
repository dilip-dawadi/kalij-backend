import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type : String, required: true},
    email: {type : String, required: true, unique: true},
    password: {type : String, required: true},
    id: {type : String},
    role: { type: Number, default: 0 },
})

const userDetail = mongoose.model('UserDetails', userSchema);

export default userDetail;