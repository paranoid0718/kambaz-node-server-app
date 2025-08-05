import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js"
export default function CourseRoutes(app) {
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  }
    const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  }
    const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  }
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  }
    const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  }

  const findAssignmentsForCourse = (req, res) => {
    const {courseId} = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  }
    const createAssignmentForCourse = (req, res) => {
    const assignment = req.body;
    const newAssignment = assignmentsDao.createAssignment(assignment);
    res.send(newAssignment);
  }
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse)
    app.post("/api/courses/:courseId/assignments", createAssignmentForCourse); 
}