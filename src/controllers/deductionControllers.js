
import { createNewDeductionService, getAllDeductionService } from '../services/deductionServices.js';
import { getEmployeeByIDService } from '../services/userServices.js';
import { sendBadRequest, sendCreated, sendNotFound, sendServerError } from '../helpers/helperFunctions.js';

export const createNewDeduction = async (req, res) => {
    try {
        const deduction = {
            description: req.body.description,
            amount: req.body.amount,
            employeeID: req.body.employee_id
        };

        const user = await getEmployeeByIDService(deduction.employeeID);

        if (user.length > 0) {
            const response = await createNewDeductionService(deduction);
            if (response.rowsAffected > 0) {
                sendCreated(res, `Deductions for employee id ${deduction.employeeID}`);
            } else {
                sendServerError(res, "Failed to create deduction");
            }
        } else {
            sendNotFound(res, "Employee records not found");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const getAllDeductions = async (req, res) => {
    try {
        const result = await getAllDeductionService();
        if (result.length) {
            return res.status(200).json(result);
        } else {
            sendNotFound(res, 'No deductions records found');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};


