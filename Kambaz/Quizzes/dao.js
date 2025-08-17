import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findQuizzesForCourse = (courseId) =>
  model.find({ course: courseId }).sort({ availableDate: 1 });;

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}

export const findQuizById = (qid) => model.findById(qid);

export const updateQuiz = (qid, updates) =>
  model.updateOne({ _id: qid }, { $set: updates });

export const publishQuiz = (qid) =>
  model.updateOne({ _id: qid }, { $set: { published: true } });

export const deleteQuiz = (qid) => model.deleteOne({ _id: qid });

export const updateQuizPoints = async (quizId, points) => {
  return await model.updateOne(
    { _id: String(quizId) },
    { $set: { points } }
  );
};

export const updateQuizQuestionNumber = async (quizId, questionNumber) => {
  return await model.updateOne(
    { _id: String(quizId) },
    { $set: { questionNumber } }
  );
};