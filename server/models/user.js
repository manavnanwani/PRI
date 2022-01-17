import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model("userSchema", userSchema);

export default User;
