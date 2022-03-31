import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for this course."],
    maxlength: [20, "Name cannot be more than 20 characters"],
  },
  amount: {
    type: Number,
    required: [true, "Please provide an amount for this course."],
  },
  description: { type: String },
  active: { type: Boolean, default: true },
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
