import * as quizDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";

export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await quizDao.deleteQuiz(quizId);
    res.send(status);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const status = await quizDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });
const findQuestionsForQuiz = async (req, res) => {
  const { quizId } = req.params;
  const questions = await questionsDao.findQuestionsForQuiz(quizId);
  res.json(questions);
};

const createQuestionForQuiz = async (req, res) => {
  const question = req.body;
  const newQuestion = await questionsDao.createQuestion(question);
  res.json(newQuestion);
};

app.put("/api/quizzes/:quizId/points", async (req, res) => {
  const { quizId } = req.params;
  const total = await questionsDao.recalcQuizPoints(quizId);
  await quizDao.updateQuizPoints(quizId, total);
  res.json({ quizId, points: total });
});

app.put("/api/quizzes/:quizId/question-number", async (req, res) => {
  const { quizId } = req.params;
  const totalQuestions = await questionsDao.recalcQuizQuestionNumber(quizId);
  await quizDao.updateQuizQuestionNumber(quizId, totalQuestions);
  res.json({ quizId, questionNumber: totalQuestions });
});

app.get("/api/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.post("/api/quizzes/:quizId/questions", createQuestionForQuiz);
}