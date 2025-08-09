import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
export default function CourseRoutes(app) {
  const findAllCourses = async(req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  }
  //   const deleteCourse = (req, res) => {
  //   const { courseId } = req.params;
  //   const status = dao.deleteCourse(courseId);
  //   res.send(status);
  // }
    const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  }
  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  }
    const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  }

  const findAssignmentsForCourse = async (req, res) => {
    const {courseId} = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  }
    const createAssignmentForCourse = async (req, res) => {
    const assignment = req.body;
    const newAssignment = await assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  }
   app.post("/api/courses", async (req, res) => {
   const course = await dao.createCourse(req.body);
      const currentUser = req.session["currentUser"];
   if (currentUser) {
     await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
   }

   res.json(course);
 });
  app.delete("/api/courses/:courseId", async (req, res) => {
   const { courseId } = req.params;
   const status = await dao.deleteCourse(courseId);
   res.send(status);
 });


 const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
      const {role, name } = req.query;
        if (!cid) return;
    if (role) {
      const users = await enrollmentsDao.findUsersForCourseByRole(cid, role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await enrollmentsDao.findUsersForCourseByPartialName(cid, name);
      res.json(users);
      return;
    }
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
    return;
 };


  app.post("/api/courses/:courseId/modules", createModuleForCourse);
app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.put("/api/courses/:courseId", updateCourse);
  // app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse)
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse); 
     app.get("/api/courses/:cid/users", findUsersForCourse);
}