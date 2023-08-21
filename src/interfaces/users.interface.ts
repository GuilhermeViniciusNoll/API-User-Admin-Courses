import { QueryResult } from "pg"
import schemas from "../schemas/index"

type TUser = Zod.infer<typeof schemas.usersSchema>
type TCreateUser = Zod.infer<typeof schemas.createUserSchema>
type TPartialUser = Zod.infer<typeof schemas.partialUserSchema>
type loginRequest = Zod.infer<typeof schemas.loginRequest>
type listUsers = Zod.infer<typeof schemas.listUsers>
type TUserView = Omit<TUser, "password">
type TUserResult = QueryResult<TUser>


export { TUser, TCreateUser, TPartialUser, TUserResult, loginRequest, listUsers, TUserView } 