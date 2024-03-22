
import { poolRequest, sql} from '../utils/dbConnect.js';

export const createCashAdvanceService = async (employeeID, amount) => {
    try {
        const response = await poolRequest()
            .input('EmployeeID', sql.Int, employeeID)
            .input('Amount', sql.Decimal(10, 2), amount)
            .query(`
                INSERT INTO CashAdvances (EmployeeID, Amount)
                VALUES (@EmployeeID, @Amount);
            `);
        return response;
    } catch (error) {
        throw new Error(`Error creating cash advance: ${error.message}`);
    }
};

// Function to retrieve all cash advances
export const getAllCashAdvancesService = async () => {
    try {
        const response = await poolRequest()
            .query(`
                SELECT 
                    CashAdvances.CashAdvanceID,
                    CashAdvances.EmployeeID,
                    CashAdvances.DateOfAdvance,
                    CashAdvances.Amount,
                    Employees.FirstName,
                    Employees.LastName
                FROM 
                    CashAdvances
                INNER JOIN 
                    Employees ON CashAdvances.EmployeeID = Employees.EmployeeID
            `);
        return response.recordset;
    } catch (error) {
        throw new Error(`Error fetching cash advances: ${error.message}`);
    }
};


export const updateCashAdvanceService = async (cashAdvanceID, amount) => {
    try {
        const response = await poolRequest()
            .input('CashAdvanceID', sql.Int, cashAdvanceID)
            .input('Amount', sql.Decimal(10, 2), amount)
            .query(`
                UPDATE CashAdvances
                SET Amount = @Amount
                WHERE CashAdvanceID = @CashAdvanceID;
            `);
        return response;
    } catch (error) {
        throw new Error(`Error updating cash advance: ${error.message}`);
    }
};
