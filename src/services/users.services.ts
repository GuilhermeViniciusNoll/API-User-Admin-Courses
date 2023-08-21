import { compareSync, hash } from "bcryptjs";
import { TCreateUser, TUser, TUserResult, TUserView, listUsers, loginRequest } from "../interfaces/users.interface";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { Hash, sign, verify } from "crypto";
import schemas from "../schemas";
import { JsonWebTokenError, Jwt } from "jsonwebtoken";
import "dotenv/config";
import "dotenv"
import appError from "../errors/appError";


const createUser = async (payload: TCreateUser): Promise<Omit<TUser, "password">> => {
    const payloadName: any = Object.keys(payload)
    payload.password = await hash(payload.password, 10)
    const payloadValues: any = Object.values(payload)

    const queryConfig: QueryConfig = {
        text: format(`INSERT INTO "users" (%I) VALUES (%L) RETURNING *;`,
            payloadName, payloadValues)
    }

    const result: TUserResult = await client.query(queryConfig)
    const users: TUserView = schemas.userViewSchema.parse(result.rows[0])
    return users
}


const getAllUsers = async (): Promise<Array<Omit<TUser, "password">>> => {

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users;`
    }

    const result: Omit<TUserResult, "password"> = await client.query(queryConfig)
    const user: listUsers = schemas.listUsers.parse(result.rows)
    return user
}

const login = async (payload: loginRequest): Promise<String> => {

    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [payload.email]
    }

    const user: TUserResult = await client.query(queryConfig)

    if (user.rowCount < 1) throw new appError("Wrong email/password", 401)

    const pass = compareSync(payload.password, user.rows[0].password)

    if (!pass) throw new appError("Wrong email/password", 401)

    const jwt = require('jsonwebtoken');

    const token: string = jwt.sign(
        { email: payload.email },
        String(process.env.SECRET_KEY),
        { expiresIn: String(process.env.EXPIRES_IN), subject: String(user.rows[0].id) }
    );

    return token
}

const getUsersByIdCourse = async (payload: String): Promise<Object> => {

    const queryConfigTwo: QueryConfig = {
        text: `SELECT * FROM "userCourses" WHERE "userId" = $1;`,
        values: [payload]
    }

    const data: QueryResult = await client.query(queryConfigTwo)

    if (data.rowCount < 1) throw new appError("No course found", 404)

    const queryConfig: QueryConfig = {
        text: `SELECT
        courses.id AS "courseId",
        courses.name AS "courseName",
        courses.description "courseDescription",
        us.active "userActiveInCourse",
        users.id "userId",
        users.name "userName"
    FROM "userCourses" AS us JOIN users ON users.id = us."userId" JOIN courses ON courses.id = us."courseId" WHERE us."userId" = $1;`,
        values: [payload]
    }

    const dataTable: QueryResult = await client.query(queryConfig)


    return dataTable.rows

}


export { createUser, login, getAllUsers, getUsersByIdCourse }