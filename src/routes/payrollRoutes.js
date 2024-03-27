import { Router } from "express";
import { addPayrollController, deletePayrollIContollor,
     getAllPayrollsController, getPayrollByEmpIDController, getPayrollByIDController, updatePayrollController } from "../controllers/payrollController.js";

const payrollRouter = Router();

payrollRouter.get("/payroll/getAll", getAllPayrollsController);
payrollRouter.get("/payroll/getpayrollByID/:PayrollID", getPayrollByIDController);
payrollRouter.get("/payroll/getpayrollByEmpID/:EmployeeID", getPayrollByEmpIDController);
payrollRouter.post("/payroll/addpayroll", addPayrollController);
payrollRouter.put("/payroll/UpdatepayrollByID/:PayrollID", updatePayrollController );
payrollRouter.delete("/payroll/deletepayrollByID/:PayrollID", deletePayrollIContollor);


export default payrollRouter;