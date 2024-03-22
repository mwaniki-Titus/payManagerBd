
import sql from 'mssql'
import * as uuid from 'uuid'
import { poolRequest } from '../utils/dbConnect.js'



export const createNewOvertimeService = async (overtime) => {
    try {
        const { number_of_hours, rate_per_hours, employeeID } = overtime;
        const overtime_id = uuid.v4();

        const result = await poolRequest()
            .input('overtime_id', sql.UniqueIdentifier, overtime_id)
            .input('number_of_hours', sql.Int, number_of_hours)
            .input('rate_per_hours', sql.Decimal(10, 2), rate_per_hours)
            .input('employeeID', sql.Int, employeeID)
            .query(
                `INSERT INTO Overtime (OvertimeID, NumberOfHours, RatePerHour, CreatedOn, EmployeeID)
                 VALUES (@overtime_id, @number_of_hours, @rate_per_hours, GETDATE(), @employeeID)`
            );

        return result;
    } catch (error) {
        return error;
    }
}


export const getEmployeeOvertimeService = async (employeeId) => {
    try {
        const result = await poolRequest()
            .query(`SELECT OvertimeID, OvertimeDate, HoursWorked
                    FROM OvertimeRecords
                    WHERE EmployeeID = @employeeId`, { employeeId })

        return result.recordset
    } catch (error) {
        return error
    }
}


