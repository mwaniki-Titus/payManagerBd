import { createCashAdvanceService, getAllCashAdvancesService, updateCashAdvanceService  } from '../services/cashAdvanceServices.js';
import { sendCreated, sendServerError, sendNotFound } from "../helpers/helperFunctions.js";

export const createCashAdvanceController = async (req, res) => {
    try {
        const { employeeID, amount } = req.body;
        await createCashAdvanceService(employeeID, amount);
        sendCreated(res, "Cash advance created successfully.");
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const getAllCashAdvancesController = async (req, res) => {
    try {
        const cashAdvances = await getAllCashAdvancesService();
        if (cashAdvances.length > 0) {
            res.status(200).json(cashAdvances);
        } else {
            sendNotFound(res, "No cash advances found.");
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};



export const updateCashAdvanceController = async (req, res) => {
    const { cashAdvanceID, amount } = req.body;

    try {
      
        const response = await updateCashAdvanceService(cashAdvanceID, amount);

     
        res.status(200).json({ message: 'Cash advance updated successfully', data: response });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: error.message });
    }
};
