import { Request, Response } from "express";
import { TCreateUser, TUser, listUsers, loginRequest } from "../interfaces/users.interface";
import services from "../services";
import { Server } from "http";
import { TCourse, TCreateCourse, listCourses } from "../interfaces";



const createCourse = async (req: Request, res: Response): Promise<Response> => {
    const payload: TCreateCourse = req.body
    const course: TCourse = await services.createCourse(payload)
    return res.status(201).json(course)
}

const getAllCourses = async (req: Request, res: Response): Promise<Response> => {
    const listCourses: listCourses = await services.getAllCourses()
    return res.status(200).json(listCourses)
}


const registerInCourse = async (req: Request, res: Response): Promise<Response> => {
    const payload: Array<string> = [res.locals.userId, res.locals.courseId]
    const sentence: String = await services.registerInCourse(payload)
    return res.status(201).json({ message: sentence })
}

const deleteRegister = async (req: Request, res: Response): Promise<Response> => {
    const payload: Array<string> = [res.locals.userId, res.locals.courseId]
    services.deleteRegister(payload)
    return res.status(204).json()
}

const getCourseById = async (req: Request, res: Response): Promise<Response> => {
    const payload: String = res.locals.courseId
    const dataTable: Object = await services.getCourseById(payload)
    return res.status(200).json(dataTable)
}

export { createCourse, getAllCourses, registerInCourse, deleteRegister, getCourseById }