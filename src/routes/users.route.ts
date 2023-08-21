import { Router } from "express"
import controllers from "../controllers/index"
import middlewares from "../middlewares"
import schemas from "../schemas"

const users: Router = Router()

users.post("", middlewares.validBody(schemas.createUserSchema), middlewares.existEmail, controllers.createUser)
users.get("", middlewares.verifyPermission(true), controllers.getAllUsers)
users.get("/:userId/courses", middlewares.validIdParams("user"), middlewares.verifyPermission(true), controllers.getUsersByIdCourse)

export default users