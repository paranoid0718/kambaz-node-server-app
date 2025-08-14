import model from "./model.js";

export const findQuestionsForQuiz = (quizId) =>
  model.find({ quizId: quizId }).sort({ createdAt: 1 });

export const findQuestionById = (qid) =>
  model.findById(qid);

export const createQuestion = (question) =>
  model.create(question);

export const updateQuestion = (qid, updates) =>
  model.updateOne({ _id: qid }, { $set: updates });

export const deleteQuestion = (qid) =>
  model.deleteOne({ _id: qid });


export const recalcQuizPoints = async (quizId) => {
  const questions = await model.find({ quizId: String(quizId) });

  let total = 0;
  for (const q of questions) {
    total += q.points ?? 0;
  }
  return total;
};
export const recalcQuizQuestionNumber = async (quizId) => {
  const questions = await model.find({ quizId: String(quizId) });
  return questions.length;
};