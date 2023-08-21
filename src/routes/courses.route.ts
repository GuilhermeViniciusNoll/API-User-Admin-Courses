import { Router } from "express"
import middlewares from "../middlewares"
import schemas from "../schemas"
import controllers from "../controllers"

const courses: Router = Router()

courses.post("", middlewares.validBody(schemas.createCourseSchema), middlewares.verifyPermission(true), controllers.createCourse)
courses.get("", controllers.getAllCourses)
courses.post("/:courseId/users/:userId", middlewares.verifyPermission(true), middlewares.validIdParams("both"), controllers.registerInCourse)
courses.get("/:courseId/users", middlewares.verifyPermission(true), middlewares.validIdParams("course"), controllers.getCourseById)
courses.delete("/:courseId/users/:userId", middlewares.validIdParams("both"), middlewares.verifyPermission(true), controllers.deleteRegister)

export default courses