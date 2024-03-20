
import { Router } from "express";
import { createNewPosition, editPosition, getAllPositions, getOnePosition } from "../controllers/positionControllers.js";







const positionRouter =Router()

positionRouter.post('/position/addPosition', createNewPosition)
positionRouter.get('/position',getAllPositions)
positionRouter.patch('/position/:position_id',editPosition);
positionRouter.get('/position/:position_id',getOnePosition)
// positionRouter.delete('/position/:position_id',deletePosition)





export default positionRouter