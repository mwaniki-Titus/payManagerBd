import { sendCreated, sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { createCashAdvancesService, getAllCashAdvancesServices } from "../services/cashAdvanceServices.js";
import { getEmployeeByIDService } from "../services/userServices.js";

export const createCashAdvances = async (req, res) => {
    try {
        const cashAdvances = {
            EmployeeID: req.body.EmployeeID,
            amount: req.body.amount,
            number_of_hours: req.body.number_of_hours // Adjusted property name
        };

        const user = await getEmployeeByIDService(cashAdvances.EmployeeID);
        if (user.length) {
            const response = await createCashAdvancesService(cashAdvances);
            console.log(response);
            if (response.rowsAffected > 0) {
                sendCreated(res, `Cash advance for employee id ${cashAdvances.EmployeeID} has been created successfully`);
            }
        } else {
            sendNotFound(res, "Employee records not found");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const getAllCashAdvances = async (req, res) => {
    try {
        const cashAdvances = await getAllCashAdvancesServices();
        if (cashAdvances.length) {
            return res.status(200).json(cashAdvances);
        } else {
            sendNotFound(res, "Records of the cash advances not found");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};
