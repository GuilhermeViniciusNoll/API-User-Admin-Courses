import { QueryResult } from "pg"
import schemas from "../schemas/index"

type TUserCourse = Zod.infer<typeof schemas.userCourseSchema>
type TCreateUserCourse= Zod.infer<typeof schemas.createUserCourseSchema>
type TPartialUserCourse = Zod.infer<typeof schemas.partialUserCourseSchema>
type TUserCourseResult = QueryResult<TUserCourse>


export { TUserCourse, TCreateUserCourse, TPartialUserCourse, TUserCourseResult } 