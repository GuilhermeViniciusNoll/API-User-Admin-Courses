import { NextFunction, Request, Response } from "express"
import { z } from "zod"

const validBody = (schema: z.ZodTypeAny,) => (req: Request, res: Response, next: NextFunction): void => {
    schema.parse(req.body)
    return next()
}

export default validBody