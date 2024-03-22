import { sendBadRequest, sendCreated, sendNotFound, sendServerError , sendSuccess} from "../helpers/helperFunctions.js";
import { addScheduleService, getAllScheduleService, updateScheduleService, deleteScheduleService, getEmployeesInScheduleService, getScheduleByIdService } from "../services/scheduleServices.js";
import logger from "../utils/logger.js";




export const addScheduleController = async (req, res) =>{
    const {
        InTime, OutTime, ScheduleName
    } = req.body;
    console.log(req.body);
 
    try {
 
       
        const newSchedule = { InTime, OutTime, ScheduleName } 
        // console.log(newPosition);
 
        const response = await addScheduleService(newSchedule);
 
        if (response instanceof Error){
            throw response;
        }
 
        if (response.rowsAffected && response.rowsAffected[0] === 1) {
            // sendMail(newUser.Email);
            sendCreated(res, "Schedule created successfully");
          } else {
            sendServerError(res, "Failed to create Schedule");
          }
    } catch (error) {
        sendServerError(res, error.message);
    }
  }

  
// Controller function to update a schedule
export const updateScheduleController = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID; 
        const { in_time, out_time } = req.body;
        const updatedSchedule = { scheduleID, in_time, out_time };
        const response = await updateScheduleService(updatedSchedule);

        if (response.rowsAffected > 0) {
            sendSuccess(res, `Schedule with ID ${scheduleID} has been updated successfully`);
        } else {
            sendNotFound(res, `Schedule with ID ${scheduleID} not found`);
        }
    } catch (error) {
        logger.error("Error updating schedule:", error);
        sendServerError(res, "Failed to update schedule", error.message);
    }
};

// Controller function to get all schedules
export const getAllScheduleController = async (req, res) => {
    try {
        const schedules = await getAllScheduleService();
        if (schedules.length > 0) {
            res.status(200).json(schedules);
        } else {
            sendNotFound(res, 'No records of schedules found');
        }
    } catch (error) {
        logger.error("Error fetching schedules:", error);
        sendServerError(res, "Failed to fetch schedules", error.message);
    }
};

// Controller function to delete a schedule
export const deleteScheduleController = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID;
        const response = await deleteScheduleService(scheduleID);
        
        if (response.rowsAffected > 0) {
            sendSuccess(res, `Schedule with ID ${scheduleID} has been deleted successfully`);
        } else {
            sendNotFound(res, `Schedule with ID ${scheduleID} not found`);
        }
    } catch (error) {
        logger.error("Error deleting schedule:", error);
        sendServerError(res, "Failed to delete schedule", error.message);
    }
};


export const getOneSchedule = async (req, res) => {
    try {
        const scheduleId = req.params.schedule_id;
        const schedule = await getScheduleByIdService(scheduleId);

        if (schedule.length) {
            return res.status(200).json(schedule);
        } else {
            sendNotFound(res, 'Schedulenot found');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};



export const getEmployeesInScheduleController = async (req, res) => {
    try {
        const scheduleID = req.params.scheduleID; 
        const employees = await getEmployeesInScheduleService(scheduleID);

        if (employees.length > 0) {
            return res.status (200).json(employees)
        } else {
            sendNotFound(res, 'No employees found for the given schedule ID');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};
