import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  managerId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  workHours: {
    type: Number,
  },
  salaryType: {
    type: Number,
  },
  salary: {
    type: Number,
  },
  department: {
    type: String,
    required: true,
  },
});

const Employee = mongoose.model("employees", employeeSchema);

export default Employee;