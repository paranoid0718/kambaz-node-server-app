import model from "./model.js";

export async function findAttemptsForUser(userId) {
    const attempts = await model.find({ user: userId }).populate("course quiz");
    return attempts;
}
export async function addAttempt(attempt) {
    return model.create(attempt);
}
export async function findAttemptById(attemptId) {
    return model.findById(attemptId);
}
export async function findAttemptsForQuiz(quizId, userId) {
    return await model.find({ quiz: quizId, user: userId });
}