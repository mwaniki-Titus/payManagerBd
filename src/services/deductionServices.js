import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import  * as uuid from 'uuid'







export const createNewDeductionService = async (deductions) => {
    try {
        const deductionID = uuid.v4();
        const { description, amount, employeeID } = deductions;
        const response = await poolRequest()
            .input('deduction_id', mssql.VarChar, deductionID )
            .input('description', mssql.VarChar, description)
            .input('amount', mssql.Decimal, amount)
            .input('employeeID', mssql.Int, employeeID)
            .query(`
                INSERT INTO Deductions (DeductionID, Description, Amount, EmployeeID) 
                VALUES (@deduction_id, @description, @amount, @employeeID)
            `);
        
        return response;
    } catch (error) {
        return error;
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
        return error;
    }
};
