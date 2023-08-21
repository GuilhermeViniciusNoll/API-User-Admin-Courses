import "express-async-errors"
import { NextFunction, Request, Response } from "express";
import appError from "../errors/appError";
import { z } from "zod"

const handleError = (error: Error, req: Request, res: Response, next: NextFunction): Response => {

    if (error instanceof appError) return res.status(error.statusCode).json({ message: error.message })

    if (error instanceof z.ZodError) {
        console.log(error.flatten().fieldErrors)
        return res.status(400).json(error.flatten().fieldErrors)
    }

    console.log(error.message)
    return res.status(500).json({ message: "Internal Server Error" })
}

export { handleError }