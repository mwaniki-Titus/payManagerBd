import { createNewOvertimeService, getEmployeeOvertimeService } from "../services/overtimeServices.js";
import { sendBadRequest, sendCreated, sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { getEmployeeByIDService } from "../services/userServices.js";

export const getAllOvertimeRecordController = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const overtimeRecords = await getEmployeeOvertimeService(employeeId);

        if (overtimeRecords.length > 0) {
            return res.status(200).json(overtimeRecords);
        } else {
            sendNotFound(res, 'No records found for overtime');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const createNewOvertimeController = async (req, res) => {
    try {
        const { number_of_hours, rate_per_hours, employeeID } = req.body;

        if (!number_of_hours || !rate_per_hours || !employeeID) {
            return sendBadRequest(res, "Missing required parameters");
        }

        const overtime = {
            number_of_hours,
            rate_per_hours,
            employeeID
        };

        const user = await getEmployeeByIDService(employeeID);

        if (!user || user.length === 0) {
            return sendNotFound(res, "Employee not found");
        }

        const response = await createNewOvertimeService(overtime);

        if (response.rowsAffected > 0) {
            return sendCreated(res, `${user[0].firstname} (ID: ${employeeID}) overtime record has been added successfully`);
        } else {
            return sendServerError(res, "Failed to create overtime record");
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};
