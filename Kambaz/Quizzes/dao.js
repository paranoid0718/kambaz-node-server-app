import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findQuizzesForCourse = (courseId) =>
  model.find({ course: courseId });

export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}

export const findQuizById = (qid) => model.findById(qid);

export const updateQuiz = (qid, updates) =>
  model.updateOne({ _id: qid }, { $set: updates });

export const deleteQuiz = (qid) => model.deleteOne({ _id: qid });

