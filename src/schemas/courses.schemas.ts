import { z } from "zod";

const courseSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(15),
    description: z.string().min(1)
})
const createCourseSchema = courseSchema.omit({ id: true })
const partialCourseSchema = courseSchema.partial()
const listCourses = courseSchema.array()

export { courseSchema, createCourseSchema, partialCourseSchema, listCourses }