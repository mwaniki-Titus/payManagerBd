import express from 'express';
import { createNewDeduction, getAllDeductions } from '../controllers/deductionControllers.js';


const deductionRoutes = express.Router();


deductionRoutes.post('/deductions', createNewDeduction);
deductionRoutes.get('/deductions', getAllDeductions);


export default deductionRoutes;
