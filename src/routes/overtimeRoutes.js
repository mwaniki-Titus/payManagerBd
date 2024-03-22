
import {Router} from "express"
import { createNewOvertime, getAllOvertimeRecord } from "../controllers/overtimeControllers.js"






const overtimeRouter=Router()

overtimeRouter.get('/overtime/getall',getAllOvertimeRecord)
overtimeRouter.post('/overtime',createNewOvertime)





export default overtimeRouter