import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true }
})

const loginModel = mongoose.model("admindatas", loginSchema);

export { loginModel };
