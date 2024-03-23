
import mssql from 'mssql';
import { poolRequest } from '../utils/dbConnect.js';
import * as uuid from 'uuid';

export const createNewDeductionService = async (deduction) => {
    try {
        const deductionID = uuid.v4();
        const { description, amount, employeeID } = deduction;
        const response = await poolRequest()
            .input('deduction_id', mssql.VarChar, deductionID)
            .input('description', mssql.VarChar, description)
            .input('amount', mssql.Decimal, amount)
            .input('employeeID', mssql.Int, employeeID)
            .query(`
                INSERT INTO Deductions (DeductionID, Description, Amount, EmployeeID) 
                VALUES (@deduction_id, @description, @amount, @employeeID)
            `);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllDeductionService = async () => {
    try {
        const response = await poolRequest().query(`
            SELECT deductions.*, employees.firstname, employees.lastname
            FROM deductions
            JOIN employees ON employees.employeeID = deductions.employeeID
        `);
        return response.recordset;
    } catch (error) {
        throw error;
    }
};

export const getDeductionsByEmployeeIDService = async (employeeID) => {
    try {
        const response = await poolRequest()
            .input('employeeID', mssql.Int, employeeID)
            .query(`
                SELECT * FROM Deductions WHERE EmployeeID = @employeeID
            `);
        return response.recordset;
    } catch (error) {
        throw error;
    }
};