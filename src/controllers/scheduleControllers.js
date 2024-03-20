import { sendBadRequest, sendCreated, sendNotFound, sendServerError , sendSuccess} from "../helpers/helperFunctions.js";
import { getAShiftByDescriptionService, createNewScheduleService, getAllScheduleService, updateScheduleService, deleteScheduleService } from "../services/scheduleServices.js";
import logger from "../utils/logger.js";


export const createNewSchedule = async (req, res) => {
    try {
        const in_time = req.body.in_time;
        const out_time = req.body.out_time;

        const newSchedule = {
            in_time: in_time,
            out_time: out_time
        };

        logger.info(newSchedule);

       
        const schedule = await getAShiftByDescriptionService(/* Pass description here */);

        if (schedule.length > 0) {
            sendBadRequest(res, `Schedule already exists`);
        } else {
            const response = await createNewScheduleService(newSchedule);
            logger.info(response);
            if (response.rowsAffected > 0) {
                sendCreated(res, `Schedule has been created successfully`);
            }
        }
    } catch (error) {
        logger.error(error);
        sendServerError(res, error);
    }
};


export const updateSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID; 
        const inTime = req.body.in_time;
        const outTime = req.body.out_time;

        const updatedSchedule = {
            scheduleID: scheduleID,
            in_time: inTime,
            out_time: outTime
        };

        logger.info(updatedSchedule);

        const response = await updateScheduleService(updatedSchedule);
        logger.info(response);

        if (response.rowsAffected > 0) {
            sendSuccess(res, `Schedule with ID ${scheduleID} has been updated successfully`);
        } else {
            sendNotFound(res, `Schedule with ID ${scheduleID} not found`);
        }
    } catch (error) {
        logger.error(error);
        sendServerError(res, error);
    }
};

export const getAllSchedule = async (req, res) => {
    try {
        const schedules = await getAllScheduleService();
        if (schedules.length > 0) {
            return res.status(200).json(schedules);
        } else {
            sendNotFound(res, 'No records of schedules found');
        }
    } catch (error) {
        sendServerError(res, error);
    }
};


export const deleteSchedule = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID;

        const response = await deleteScheduleService(scheduleID);
        
        // Check if any rows were affected by the deletion
        if (response.rowsAffected > 0) {
            res.status(200).json({ message: `Schedule with ID ${scheduleID} has been deleted successfully` });
        } else {
            res.status(404).json({ message: `Schedule with ID ${scheduleID} not found` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
