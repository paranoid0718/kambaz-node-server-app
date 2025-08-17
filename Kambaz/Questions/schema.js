import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quizId: { type: String, ref: "QuizModel", required: true, index: true },
    type: { type: String, enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"], required: true },
    title: { type: String, required: true },
    fields: { type: Number, required: true },
    points: { type: Number, default: 0, min: 0 },
    choices: [
      {
        _id: false,
        text: String,
        isCorrect: Boolean,
      }
    ],
    answer: [[String]],
  },
  { collection: "questions", timestamps: true }
);
export default QuestionSchema; 