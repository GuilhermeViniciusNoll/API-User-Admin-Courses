import { createUser, login, getAllUsers, getUsersByIdCourse } from "./users.controllers"
import { createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById } from "./courses.controllers"

export default { createUser, login, getAllUsers, createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById, getUsersByIdCourse }