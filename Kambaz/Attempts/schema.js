import mongoose from "mongoose";
const attemptSchema = new mongoose.Schema(
    {
        _id: String,
        course: { type: String, ref: "CourseModel" },
        user: { type: String, ref: "UserModel" },
        quiz: { type: String, ref: "QuizModel" },
        answers: [
            {
                questionId: { type: String, required: true },
                choice: { type: String, required: true }
            }
        ]
    },
    { collection: "attempts" }
);
export default attemptSchema;