import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    points: Number,
    description: String,
    availableDate: Date,
    dueDate: Date,
  },
  { collection: "assignments" }
);

export default schema;