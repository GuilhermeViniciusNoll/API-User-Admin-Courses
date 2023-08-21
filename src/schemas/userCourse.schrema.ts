import { z } from "zod";

const userCourseSchema = z.object({
    id: z.number().positive(),
    active: z.boolean().default(true),
    "userId": z.number().min(1),
    "courseId": z.number().min(1)
})
const createUserCourseSchema = userCourseSchema.omit({ id: true })
const partialUserCourseSchema = userCourseSchema.partial()

export { userCourseSchema, createUserCourseSchema, partialUserCourseSchema }