import express from 'express';
import { Router } from 'express';
import { createNewDeduction, getAllDeductions } from '../controllers/deductionControllers.js';


const deductionRouter = express.Router();


deductionRouter.post('/deductions/add', createNewDeduction);
deductionRouter.get('/deductions', getAllDeductions);


export default deductionRouter;
