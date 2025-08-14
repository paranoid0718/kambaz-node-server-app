import * as attemptsDao from "./dao.js";
import { v4 as uuidv4 } from "uuid";

export default function AttemptRoutes(app) {
    // app.get("/api/attempts/:userId", async (req, res) => {
    //     const { userId } = req.params;
    //     const attempts = await attemptsDao.findAttemptsForUser(userId);
    //     res.json(attempts);
    // });

    app.post("/api/attempts", async (req, res) => {
        const attempt = { ...req.body, _id: uuidv4() };
        const newAttempt = await attemptsDao.addAttempt(attempt);
        res.json(newAttempt);
    });
    app.get("/api/attempts/:attemptId", async (req, res) => {
        const { attemptId } = req.params;
        const attempt = await attemptsDao.findAttemptById(attemptId);
        if (attempt) {
            console.log(attempt.toObject());
            res.json(attempt.toObject());
        } else {
            res.status(404).send("Attempt not found");
        }
    });
}