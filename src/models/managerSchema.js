import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const managerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [{
    type: String,
  }],
});

//----------------------------------------> Hashing password before saving
managerSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (e) {
    console.log("error in hashing password");
  }
});

//-----------------------------------------------> check password 
managerSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
}

const Manager = mongoose.model("managers", managerSchema);

export default Manager;