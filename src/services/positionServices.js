
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import  * as uuid from 'uuid'



export const createNewPositionService = async (position) => {
    try {
        const PositionID = uuid.v4(); 
        const result = await poolRequest()
            .input('PositionDescription', mssql.VarChar, position.positionDescription) 
            .input('GrossSalary', mssql.Int, position.grossSalary) 
            .query(`INSERT INTO Position ( PositionDescription, GrossSalary) 
                    VALUES ( @PositionDescription, @GrossSalary)`);
    
        return result;
    } catch (error) {
        return error;
    }
}


export const getPositionByNameService = async (positionDescription) => {
    try {
        const response = await poolRequest()
            .input('PositionDescription', mssql.VarChar, positionDescription)
            .query(`SELECT * FROM Position WHERE PositionDescription = @PositionDescription`);
        
        return response.recordset;
    } catch (error) {
        return error;
    }
}

export const getAllPositionsService = async () => {
    try {
        const result = await poolRequest()
        .query(`
        SELECT Position.*, Employees.*
        FROM Position
        INNER JOIN Employees ON Employees.PositionID = Position.PositionID
      
    `);
        
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const getPositionByIdService = async (positionID) => {
    try {
        const result = await poolRequest()
            .input('PositionID', mssql.VarChar, positionID)
            .query(`SELECT * FROM Position WHERE PositionID = @PositionID`);
        
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const editPositionService = async (positionID, updatedPositionDetails) => {
    try {
        const { positionDescription, grossSalary } = updatedPositionDetails;
        const result = await poolRequest()
            .input('PositionID', mssql.VarChar, positionID)
            .input('PositionDescription', mssql.VarChar, positionDescription)
            .input('GrossSalary', mssql.VarChar, grossSalary)
            .query(`
                UPDATE Position
                SET PositionDescription = @PositionDescription, GrossSalary = @GrossSalary
                WHERE PositionID = @PositionID
            `);

        return result;
    } catch (error) {
        return error;
    }
}


export const getPositionIdService = async (positionID) => {
    try {
        const result = await poolRequest()
            .input('PositionID', mssql.VarChar, positionID)
            .query(`
                SELECT Position.*, Employees.*
                FROM Position
                INNER JOIN Employees ON Employees.PositionID = Position.PositionID
                WHERE PositionID = @PositionID
            `);
        
        return result.recordset;
    } catch (error) {
        return error;
    }
}


export const deletePositionService = async (positionID) => {
    try {
        const result = await poolRequest()
            .input('PositionID', mssql.VarChar, positionID)
            .query(`
                DELETE FROM Position
                WHERE PositionID = @PositionID
            `);

        return result;
    } catch (error) {
        return error;
    }
}
