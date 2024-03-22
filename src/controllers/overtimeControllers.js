import { createNewOvertimeService, getEmployeeOvertimeService  } from "../services/overtimeServices.js"
import { sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../helpers/helperFunctions.js"
import { getEmployeeByIDService } from "../services/userServices.js"


export const getAllOvertimeRecord = async (req, res) => {
    try {
        const response = await getEmployeeOvertimeService ();
        console.log(response);
        if (response.length > 0) {
            return res.status(200).json(response);
        } else {
            sendNotFound(res, 'No records found for overtime');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
}

export const createNewOvertime = async (req, res) => {
    try {
        const { number_of_hours, rate_per_hours, user_id } = req.body;

        // Check if required parameters are provided
        if (!number_of_hours || !rate_per_hours || !user_id) {
            return sendBadRequest(res, "Missing required parameters");
        }

        const overtime = {
            number_of_hours,
            rate_per_hours,
            user_id
        };

        const user = await getEmployeeByIDService(user_id);

        // Check if user exists
        if (!user || user.length === 0) {
            return sendNotFound(res, "Employee not found");
        }

        const response = await createNewOvertimeService(overtime);

        if (response.rowsAffected > 0) {
            return sendCreated(res, `${user[0].firstname} (ID: ${user_id}) overtime record has been added successfully`);
        } else {
            return sendServerError(res, "Failed to create overtime record");
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
}
