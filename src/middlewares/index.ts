import { handleError } from "./handleError.middleware"
import validBody from "./validBody.middleware"
import existEmail from "./existEmail.middleware"
import verifyPermission from "./verifyPermission.middleware"
import validIdParams from "./validIdParams.middleware"

export default { handleError, validBody, existEmail, verifyPermission, validIdParams }