
import { Router } from "express";
import { createNewSchedule, getAllSchedule, updateSchedule, deleteSchedule} from "../controllers/scheduleControllers.js";


const scheduleRouter=Router()

scheduleRouter.post('/schedule',createNewSchedule)
scheduleRouter.get('/schedule/all',getAllSchedule)
scheduleRouter.put('/schedule/:scheduleID', updateSchedule);
scheduleRouter.delete('/schedule/:scheduleID', deleteSchedule);




export default scheduleRouter;



