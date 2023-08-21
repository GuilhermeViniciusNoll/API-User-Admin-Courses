import { QueryResult } from "pg"
import schemas from "../schemas/index"

type TCourse = Zod.infer<typeof schemas.courseSchema>
type TCreateCourse = Zod.infer<typeof schemas.createCourseSchema>
type TPartialCourse = Zod.infer<typeof schemas.partialCourseSchema>
type listCourses = Zod.infer<typeof schemas.listCourses>
type TCourseResult = QueryResult<TCourse>


export { TCourse, TCreateCourse, TPartialCourse, TCourseResult, listCourses } 