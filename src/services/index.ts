import { createUser, login, getAllUsers, getUsersByIdCourse } from "./users.services"
import { createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById } from "./courses.services"

export default { createUser, login, getAllUsers, createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById, getUsersByIdCourse }