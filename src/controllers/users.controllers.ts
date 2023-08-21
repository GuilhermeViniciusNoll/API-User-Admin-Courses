import { Request, Response } from "express";
import { TCreateUser, TUser, TUserView, listUsers, loginRequest } from "../interfaces/users.interface";
import services from "../services";
import { Server } from "http";



const createUser = async (req: Request, res: Response): Promise<Response> => {
    const payload: TCreateUser = req.body
    const user: TUserView = await services.createUser(payload)
    return res.status(201).json(user)
}

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const listUsers: listUsers = await services.getAllUsers()
    return res.status(200).json(listUsers)
}


const login = async (req: Request, res: Response): Promise<Response> => {
    const payload: loginRequest = req.body
    const token: String = await services.login(payload)
    return res.status(200).json({ token: token })
}

const getUsersByIdCourse = async (req: Request, res: Response): Promise<Response> => {
    const payload: String = res.locals.userId
    const dataTable: Object = await services.getUsersByIdCourse(payload)
    return res.status(200).json(dataTable)
}

export { createUser, login, getAllUsers, getUsersByIdCourse }