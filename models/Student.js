import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name for this student."],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name for this student."],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  description: { type: String },
  address: { type: String },
  email: { type: String },
  phones: { type: Array },
  courses: { type: Array },
  active: { type: Boolean, default: true },
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
