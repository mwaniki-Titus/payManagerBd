import { Router } from "express";
import { createCashAdvanceController, getAllCashAdvancesController, updateCashAdvanceController } from '../controllers/cashAdvanceControllers.js';


const cashAdvancesRouter=Router()


cashAdvancesRouter.post('/create/cashAdvance', createCashAdvanceController); 
cashAdvancesRouter.get('/getAll/cashAdvance', getAllCashAdvancesController); 
cashAdvancesRouter.put('/edit/cashAdvance', updateCashAdvanceController);



export default cashAdvancesRouter;





