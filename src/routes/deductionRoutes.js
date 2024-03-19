
import { Router } from "express";
import { createNewDeduction, getAlllDeductions } from "../controllers/deductions.controller.js";




const deductionRouter=Router()

deductionRouter.post('/deduction',createNewDeduction)
deductionRouter.get('/deduction',getAlllDeductions)





export default deductionRouter