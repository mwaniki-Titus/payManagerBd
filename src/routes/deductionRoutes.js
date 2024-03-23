import express from 'express';
import { Router } from 'express';
import { createNewDeduction, getAllDeductions, getDeductionsByEmployeeID} from '../controllers/deductionControllers.js';


const deductionRouter = express.Router();


deductionRouter.post('/deductions/add', createNewDeduction);
deductionRouter.get('/deductions', getAllDeductions);
deductionRouter.get('/deductions/employee/:employeeID', getDeductionsByEmployeeID);


export default deductionRouter;
