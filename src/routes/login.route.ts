import { Router } from "express"
import middlewares from "../middlewares"
import schemas from "../schemas"
import controllers from "../controllers"

const login: Router = Router()

login.post("", middlewares.validBody(schemas.loginRequest), controllers.login)

export default login