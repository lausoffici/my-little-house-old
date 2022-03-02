import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name for this student."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name for this student."],
    maxlength: [20, "Name cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: false,
  },
  phones: {
    type: Array,
  },
  courses: {
    type: Array,
  },
  isDeleted: { type: Boolean },
});

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
