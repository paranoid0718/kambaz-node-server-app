// import Database from "../Database/index.js";
// import { v4 as uuidv4 } from "uuid";
// export function enrollUserInCourse(userId, courseId) {
//   const { enrollments } = Database;
//   enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
// }
// export function getAllEnrollments() {
//   const { enrollments } = Database;
//   return enrollments;
// }
// export function unenrollUserFromCourse(userId, courseId) {
//   const db = Database;
//   db.enrollments = db.enrollments.filter(
//     (e) => !(e.user === userId && e.course === courseId)
//   );
// }
import model from "./model.js";
export async function findCoursesForUser(userId) {
 const enrollments = await model.find({ user: userId }).populate("course");
 return enrollments.map((enrollment) => enrollment.course);
}
// export async function findUsersForCourse(courseId) {
//  const enrollments = await model.find({ course: courseId }).populate("user");
//  return enrollments.map((enrollment) => enrollment.user);
// }
export async function findUsersForCourse(courseId) {
  const enrollments = await model
    .find({ course: courseId })
    .populate("user");
  return enrollments
    .map((e) => e.user)
    .filter(Boolean);
}

export async function findUsersForCourseByRole(courseId, role) {
  const enrollments = await model
    .find({ course: courseId})
    .populate("user");
  return enrollments
    .map((e) => e.user)
    .filter(Boolean)
    .filter((u) => u.role === role);
}

export async function findUsersForCourseByPartialName(courseId, partialName) {
  const enrollments = await model
    .find({ course: courseId })
    .populate("user");
      const regex = new RegExp(partialName, "i"); 
  return enrollments
    .map((e) => e.user)
    .filter(Boolean)
    .filter((u) => regex.test(u.firstName) || regex.test(u.lastName));
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course, _id: `${user}-${course}` });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
