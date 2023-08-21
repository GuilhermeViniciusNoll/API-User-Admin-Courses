import { z } from "zod";

const usersSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(50),
    email: z.string().email().min(1),
    password: z.string().max(120).min(1),
    admin: z.boolean().default(false)
})
const createUserSchema = usersSchema.omit({ id: true })
const partialUserSchema = usersSchema.partial()
const loginRequest = usersSchema.pick({ email: true, password: true })
const listUsers = usersSchema.omit({ password: true }).array()
const userViewSchema = usersSchema.omit({ password: true })

export { usersSchema, createUserSchema, partialUserSchema, loginRequest, listUsers, userViewSchema }