import { Router } from "express";
import { createCashAdvances, getAllCashAdvances } from "../controllers/cashAdvanceControllers.js";





const cashAdvancesRouter=Router()

cashAdvancesRouter.post('/cashadvances/add', createCashAdvances)
cashAdvancesRouter.get('/cashadvances',getAllCashAdvances)





export default cashAdvancesRouter;