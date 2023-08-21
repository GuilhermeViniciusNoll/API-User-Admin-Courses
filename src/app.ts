import express, { Application, json } from 'express'
import routes from "./routes/index"
import middlewares from './middlewares'
import "express-async-errors"

const app: Application = express()
app.use(json())

app.use("/users", routes.users)
app.use("/login", routes.login)
app.use("/courses", routes.courses)

app.use(middlewares.handleError)

export default app
