
import { Router } from "express";
import { addScheduleController, getAllScheduleController, updateScheduleController, deleteScheduleController,  getEmployeesInScheduleController} from "../controllers/scheduleControllers.js";


const scheduleRouter=Router()

scheduleRouter.post('/schedule/addSchedule',addScheduleController);
scheduleRouter.get('/schedule/',getAllScheduleController);
scheduleRouter.put('/schedule/update/:scheduleID', updateScheduleController);
scheduleRouter.delete('/schedule/remove/:scheduleID', deleteScheduleController);
scheduleRouter.get('/schedule/:scheduleID/employees', getEmployeesInScheduleController);




export default scheduleRouter;



