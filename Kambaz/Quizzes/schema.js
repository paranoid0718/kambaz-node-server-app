import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    course: { type: String, ref: "CourseModel", required: true },
    title: String,
    description: String,
    quizType: {
      type: String,
      enum: ["GRADED", "PRACTICE", "GRADED_SURVEY", "UNGRADED_SURVEY"],
      default: "GRADED",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    published: { type: Boolean, default: false },
    points: { type: Number, default: 0 },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    attemptsAllowed: { type: Number, default: 1 },
    showCorrectAnswers: { type: String, default: "" },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    availableUntil: String,
  },
  { collection: "quizzes" }
);

export default schema;