import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TCourseResult, TUserResult } from "../interfaces";
import appError from "../errors/appError";


const validIdParams = (originId?: "user" | "course" | "both") => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  
    var validCourse: Boolean = false
    var validUser: Boolean = false

    if (originId === "user" || originId === "both") {
        const userId: String = req.params.userId
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM users WHERE id = $1`,
            values: [userId]
        }

        const user: TUserResult = await client.query(queryConfig)
        if (user.rowCount < 1) if (originId != "both") throw new appError("User not found", 404)
        if (user.rowCount > 0) validUser = true
        res.locals = { ...res.locals, userId }
    }

    if (originId === "course" || originId === "both") {
        const courseId: String = req.params.courseId

        const queryConfig: QueryConfig = {
            text: `SELECT * FROM courses WHERE id = $1`,
            values: [courseId]
        }

        const Course: TCourseResult = await client.query(queryConfig)
        if (Course.rowCount < 1) if (originId != "both") throw new appError("Course not found", 404)
        if (Course.rowCount > 0) validCourse = true
        res.locals = { ...res.locals, courseId }
    }

    if (originId === "both") {
        if (validCourse === false || validUser === false) {
            throw new appError("User/course not found", 404)
        }
    }
   
    return next()
}

export default validIdParams