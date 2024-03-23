import sql from 'mssql';
import * as uuid from 'uuid';
import { poolRequest } from '../utils/dbConnect.js';

export const createNewOvertimeService = async (overtime) => {
    try {
        const { number_of_hours, rate_per_hours, employeeID } = overtime;
        const overtime_id = uuid.v4();

        const result = await poolRequest()
            // .input('overtime_id', sql.Int, overtime_id)
            .input('number_of_hours', sql.Int, number_of_hours)
            .input('rate_per_hours', sql.Decimal(10, 2), rate_per_hours)
            .input('employeeID', sql.Int, employeeID)
            .query(
                `INSERT INTO Overtime ( NumberOfHours, RatePerHour, CreatedOn, EmployeeID)
                 VALUES ( @number_of_hours, @rate_per_hours, GETDATE(), @employeeID)`
            );

        return result;
    } catch (error) {
        throw error;
    }
};

export const getEmployeeOvertimeService = async (employeeId) => {
    try {
        const result = await poolRequest()
            .input('employeeId', sql.Int, employeeId)
            .query(`SELECT  NumberOfHours, RatePerHour, CreatedOn
                    FROM Overtime
                    WHERE EmployeeID = @employeeId`);

        return result.recordset;
    } catch (error) {
        throw error;
    }
};



export const getEmployeeByIDService = async (employeeID) => {
    try {
        const queryResult = await poolRequest()
            .input('employeeID', sql.Int, employeeID)
            .query(
                `SELECT firstname, lastname, other_columns FROM Employee WHERE EmployeeID = @employeeID`
            );
            return queryResult.recordset;
        } catch (error) {
            throw error;
        }
    };


    export const getOvertimeByIDService = async (overtimeID) => {
        try {
            const queryResult = await poolRequest()
                .input('overtimeID', sql.NVarChar(36), overtimeID) // Assuming overtime_id is stored as NVARCHAR(36)
                .query(
                    `SELECT NumberOfHours, RatePerHour, CreatedOn, EmployeeID 
                     FROM Overtime 
                     WHERE OvertimeID = @overtimeID`
                );
            return queryResult.recordset;
        } catch (error) {
            throw error;
        }
    };