import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { TUserResult } from "../interfaces/users.interface";
import { client } from "../database";
import appError from "../errors/appError";
import { verify } from "jsonwebtoken";


const verifyPermission = (isAdmin: boolean) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const header: String | undefined = req.headers.authorization


    if (!header || header === "") {
        throw new appError("Missing bearer token", 401);
    }


    const token: String = header.split(" ")[1]


    const userInfo = verify(String(token),
        String(process.env.SECRET_KEY),
        (error: any, decoded: any) => {
            if (error) throw new appError(error.message, 401)
            return decoded.email;
        }
    );


    const queryConfig: QueryConfig = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [userInfo]
    }

    const user: TUserResult = await client.query(queryConfig)

    if (isAdmin) {
        if (!user.rows[0].admin) throw new appError("Insufficient permission", 403)
    }

    return next()
}

export default verifyPermission