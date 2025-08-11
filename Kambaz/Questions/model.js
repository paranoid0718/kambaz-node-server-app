import mongoose from "mongoose";
import QuestionSchema from "./schema.js";
const model = mongoose.model("QuestionModel", QuestionSchema);
export default model;