import { sendBadRequest, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../helpers/helperFunctions.js";
import { createNewPositionService, editPositionService, getAllPositionsService, getPositionByIdService, getPositionByNameService, deletePositionService } from "../services/positionServices.js";
import logger from "../utils/logger.js";



export const createNewPosition = async (req, res) => {
    try {
        const positionDescription = req.body.PositionDescription;
        const grossSalary = req.body.GrossSalary;

        
        if (!positionDescription || !grossSalary || positionDescription.trim() === '' || isNaN(grossSalary)) {
            return sendBadRequest(res, 'Input for all fields is required and GrossSalary must be a valid number');
        }

       
        const positionDetails = {
            positionDescription: positionDescription,
            grossSalary: grossSalary
        };

        const response = await createNewPositionService(positionDetails);

        
        if (response.rowsAffected > 0) {
            return sendCreated(res, `${positionDescription} created successfully`);
        }
    } catch (error) {
        return sendServerError(res, error);
    }
};

export const getAllPositions = async (req, res) => {
    try {
        const result = await getAllPositionsService();
        if (result.length > 0) {
            return res.status(200).json(result);
        } else {
            sendNotFound(res, 'No records of positions found');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const getOnePosition = async (req, res) => {
    try {
        const positionId = req.params.position_id;
        const position = await getPositionByIdService(positionId);

        if (position.length) {
            return res.status(200).json(position);
        } else {
            sendNotFound(res, 'Position not found');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const editPosition = async (req, res) => {
    try {
        const positionId = req.params.position_id;
        const { positionDescription, grossSalary } = req.body;

        if (positionDescription || grossSalary) {
            return sendBadRequest(res, 'Input for all fields is required');
        }

        const position = await getPositionByIdService(positionId);
        if (position.length === 0) {
            return sendNotFound(res, 'Position not found');
        }

        const updatedPositionDetails = {
            positionDescription,
            grossSalary
        };

        const response = await editPositionService(positionId, updatedPositionDetails);
        
        if (response.rowsAffected > 0) {
            return sendSuccess(res, 'Position updated successfully');
        } else {
            return sendServerError(res, 'Failed to update position');
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};



export const deletePosition = async (req, res) => {
    try {
        const positionId = req.params.position_id;

        const position = await getPositionByIdService(positionId);
        if (position.length === 0) {
            return sendNotFound(res, 'Position not found');
        }

        const result = await deletePositionService(positionId);
        
        if (result.rowsAffected > 0) {
            return sendSuccess(res, 'Position deleted successfully');
        } else {
            return sendServerError(res, 'Failed to delete position');
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};