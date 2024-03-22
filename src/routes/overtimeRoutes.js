
import {Router} from "express"
import { createNewOvertimeController,  getAllOvertimeRecordController } from "../controllers/overtimeControllers.js"






const overtimeRouter=Router()

overtimeRouter.get('/overtime/getall',getAllOvertimeRecordController)
overtimeRouter.post('/overtime/add',createNewOvertimeController)





export default overtimeRouter