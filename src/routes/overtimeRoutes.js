
import {Router} from "express"
import { createNewOvertimeController,  getAllOvertimeRecordController,  getOvertimeByIDController } from "../controllers/overtimeControllers.js"






const overtimeRouter=Router()

overtimeRouter.get('/overtime/getall',getAllOvertimeRecordController)
overtimeRouter.post('/overtime/add',createNewOvertimeController)
overtimeRouter.get('/overtime/byid/:overtimeID', getOvertimeByIDController); 





export default overtimeRouter