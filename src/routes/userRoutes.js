import { Router } from "express";
import { addEmployeeController, 
    deleteEmployee, 
    getAllUserController, 
    getEmployeeByIDController, 
    loginUserController, 
    updateUserController
} from "../controllers/userController.js";


const userRouter = Router();

userRouter.get("/users/getAllUsers", getAllUserController);
userRouter.get("/users/getUserByID/:EmployeeID", getEmployeeByIDController);
userRouter.post("/users/addNewEmployee", addEmployeeController);
userRouter.post("/users/login", loginUserController);
userRouter.put("/users/UpdateEmployeeByID/:EmployeeID", updateUserController);
userRouter.delete("/users/deleteEmployee/:EmployeeID", deleteEmployee);


export default userRouter;
