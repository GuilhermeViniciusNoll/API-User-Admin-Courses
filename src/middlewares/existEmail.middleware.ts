import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { TUserResult } from "../interfaces/users.interface";
import { client } from "../database";
import appError from "../errors/appError";


const existEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [req.body.email]
    }

    const user: TUserResult = await client.query(queryConfig)

    if (user.rowCount > 0) throw new appError("Email already registered", 409)
    return next()
}

export default existEmail