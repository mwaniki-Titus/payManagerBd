
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import  * as uuid from 'uuid'




export const createCashAdvancesService = async (cashAdvances) => {
    const { EmployeeID, amount, number_of_hours } = cashAdvances;
    try {
        const cash_advance_id = uuid.v4();
        const response = await poolRequest()
            .input('cash_advance_id', mssql.VarChar, cash_advance_id)
            .input('EmployeeID', mssql.Int, EmployeeID) 
            .input('amount', mssql.Decimal, amount)
            .input('number_of_hours', mssql.Int, number_of_hours) 
            .query(`
                INSERT INTO CashAdvances (CashAdvanceID, EmployeeID, NumberOfHours, CreatedOn, Amount)
                VALUES (@cash_advance_id, @EmployeeID, @number_of_hours, GETDATE(), @amount)
            `);
        return response;
    } catch (error) {
        return error;
    }
};


export const getAllCashAdvancesServices = async () => {
    try {
        const response = await poolRequest()
            .query(`SELECT CashAdvances.*, Employees.FirstName, Employees.LastName, Employees.EmployeeID, Employees.Contact
                    FROM CashAdvances 
                    JOIN Employees ON Employees.EmployeeID = CashAdvances.EmployeeID`);
        return response.recordset;
    } catch (error) {
        return error;
    }
};



export const userLoginValidator=({email,password})=>{

    const userSchema=joi.object({
        
        email:joi.string().required(),
        password:joi.string().required(),
           
    })
    return userSchema.validate({email,password});
}