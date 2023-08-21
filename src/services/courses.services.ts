import { compareSync, hash } from "bcryptjs";
import { TCreateUser, TUser, TUserResult, listUsers, loginRequest } from "../interfaces/users.interface";
import { QueryConfig, QueryResult, QueryResultRow } from "pg";
import format from "pg-format";
import { client } from "../database";
import { Hash, sign, verify } from "crypto";
import schemas from "../schemas";
import { JsonWebTokenError, Jwt } from "jsonwebtoken";
import "dotenv/config";
import "dotenv"
import appError from "../errors/appError";
import { TCourse, TCourseResult, TCreateCourse, TUserCourseResult, listCourses } from "../interfaces";


const createCourse = async (payload: TCreateCourse): Promise<TCourse> => {
    const payloadName: any = Object.keys(payload)
    const payloadValues: any = Object.values(payload)

    const queryConfig: QueryConfig = {
        text: format(`INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;`,
            payloadName, payloadValues)
    }

    const result: TCourseResult = await client.query(queryConfig)
    const course: TCourse = schemas.courseSchema.parse(result.rows[0])
    return course
}


const getAllCourses = async (): Promise<listCourses> => {

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM courses;`
    }

    const result: TCourseResult = await client.query(queryConfig)
    const listCourses: listCourses = schemas.listCourses.parse(result.rows)
    return listCourses
}

const registerInCourse = async (payload: Array<String>): Promise<String> => {

    const queryConfig: QueryConfig = {
        text: `INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2);`,
        values: [...payload]
    }

    await client.query(queryConfig)

    return "User successfully vinculed to course"
}

const deleteRegister = async (payload: Array<String>) => {

    const queryConfig: QueryConfig = {
        text: `SELECT id FROM "userCourses" WHERE "userId" = $1 AND "courseId" = $2;`,
        values: [...payload]
    }

    const dataUserCourse: TUserCourseResult = await client.query(queryConfig)


    const queryConfigTwo: QueryConfig = {
        text: `UPDATE "userCourses" SET "active" = 'false' WHERE id = $1;`,
        values: [dataUserCourse.rows[0]]
    }

    await client.query(queryConfigTwo)
}

const getCourseById = async (payload: String): Promise<Object> => {
    const queryConfig: QueryConfig = {
        text: `SELECT
        users.id "userId",
        users.name "userName",
        courses.id "courseId",
        courses.name "courseName",
        courses.description "courseDescription",
        us.active "userActiveInCourse"
    FROM "userCourses" AS us JOIN users ON users.id = us."userId" JOIN courses ON courses.id = us."courseId" WHERE us."courseId" = $1;`,
        values: [payload]
    }

    const dataTable: QueryResult = await client.query(queryConfig)

    return dataTable.rows

}



export { createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById }