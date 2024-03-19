
import { Router } from "express";
import { createNewSchedule, getAllSchedule } from "../controllers/schedule.controller.js";


const scheduleRouter=Router()

scheduleRouter.post('/schedule',createNewSchedule)
scheduleRouter.get('/schedule/all',getAllSchedule)




export default scheduleRouter



