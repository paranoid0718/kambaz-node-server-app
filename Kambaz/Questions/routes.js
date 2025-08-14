import * as questionsDao from "./dao.js";

export default function QuestionRoutes(app) {
  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const question = await questionsDao.findQuestionById(questionId);
    if (!question) return res.sendStatus(404);
    res.json(question);
  });

  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const updates = req.body;
    const status = await questionsDao.updateQuestion(questionId, updates);
    res.send(status);
  });

  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const status = await questionsDao.deleteQuestion(questionId);
    res.send(status);
  });
}
