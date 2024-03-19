// import { poolRequest, sql } from "../utils/dbConnect.js";

// export const getAllEmployeesService = async () => {
//     try {
//         const result = await poolRequest().query(`SELECT * FROM Employees`);
//         return result.recordset;
//     } catch (error) {
//         throw error;
//     }
// };

// export const addEmployeeService = async (employee) => {
//     try {
//         const result = await poolRequest()
//             .input('FirstName', sql.VarChar, employee.FirstName)
//             .input('LastName', sql.VarChar, employee.LastName)
//             .input('Location', sql.VarChar, employee.Location)
//             .input('BirthDate', sql.Date, employee.BirthDate)
//             .input('Contact', sql.VarChar, employee.Contact)
//             .input('Gender', sql.VarChar, employee.Gender)
//             .input('Admin', sql.Bit, employee.Admin)
//             .input('PositionID', sql.Int, employee.PositionID)
//             .input('ScheduleID', sql.Int, employee.ScheduleID)
//             .input('PhotoURL', sql.VarChar, employee.PhotoURL)
//             .input('Email', sql.VarChar, employee.Email)
//             .input('Password', sql.VarChar, employee.Password)
//             .input('BankName', sql.VarChar, employee.BankName)
//             .input('BankBranch', sql.VarChar, employee.BankBranch)
//             .input('AccountNumber', sql.VarChar, employee.AccountNumber)
//             .input('Bio', sql.VarChar, employee.Bio)
//             .query(`INSERT INTO Employees (FirstName, LastName, Location, BirthDate, Contact, Gender, Admin, PositionID, ScheduleID, PhotoURL, Email, Password, BankName, BankBranch, AccountNumber, Bio) 
//                      VALUES (@FirstName, @LastName, @Location, @BirthDate, @Contact, @Gender, @Admin, @PositionID, @ScheduleID, @PhotoURL, @Email, @Password, @BankName, @BankBranch, @AccountNumber, @Bio)`);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// export const deleteEmployeeService = async (employeeId) => {
//     try {
//         await poolRequest().input('EmployeeID', sql.Int, employeeId).query('DELETE FROM Employees WHERE EmployeeID = @EmployeeID');
//     } catch (error) {
//         throw error;
//     }
// };
// // Service to update employee information
// export const updateEmployeeService = async (employeeId, updatedEmployeeData) => {
//     try {
//         const result = await poolRequest()
//             .input('EmployeeID', sql.Int, employeeId)
//             .input('FirstName', sql.VarChar, updatedEmployeeData.FirstName)
//             .input('LastName', sql.VarChar, updatedEmployeeData.LastName)
//             .input('Location', sql.VarChar, updatedEmployeeData.Location)
//             .input('BirthDate', sql.Date, updatedEmployeeData.BirthDate)
//             .input('Contact', sql.VarChar, updatedEmployeeData.Contact)
//             .input('Gender', sql.VarChar, updatedEmployeeData.Gender)
//             .input('Admin', sql.Bit, updatedEmployeeData.Admin)
//             .input('PositionID', sql.Int, updatedEmployeeData.PositionID)
//             .input('ScheduleID', sql.Int, updatedEmployeeData.ScheduleID)
//             .input('PhotoURL', sql.VarChar, updatedEmployeeData.PhotoURL)
//             .input('Email', sql.VarChar, updatedEmployeeData.Email)
//             .input('Password', sql.VarChar, updatedEmployeeData.Password)
//             .input('BankName', sql.VarChar, updatedEmployeeData.BankName)
//             .input('BankBranch', sql.VarChar, updatedEmployeeData.BankBranch)
//             .input('AccountNumber', sql.VarChar, updatedEmployeeData.AccountNumber)
//             .input('Bio', sql.VarChar, updatedEmployeeData.Bio)
//             .query(`UPDATE Employees 
//                      SET FirstName = @FirstName, LastName = @LastName, Location = @Location, BirthDate = @BirthDate, Contact = @Contact,
//                          Gender = @Gender, Admin = @Admin, PositionID = @PositionID, ScheduleID = @ScheduleID, PhotoURL = @PhotoURL,
//                          Email = @Email, Password = @Password, BankName = @BankName, BankBranch = @BankBranch, AccountNumber = @AccountNumber,
//                          Bio = @Bio
//                      WHERE EmployeeID = @EmployeeID`);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };



// // Service to retrieve admin by email
// export const getAdminByEmailService = async (email) => {
//     try {
//         const result = await poolRequest()
//             .input('Email', sql.VarChar, email)
//             .query('SELECT * FROM Employees WHERE Email = @Email AND admin = 1');
//         return result.recordset[0]; // Assuming there should be only one admin with a given email
//     } catch (error) {
//         throw error;
//     }
// };

// // Service to retrieve user (employee) by email
// export const getUserByEmailService = async (email) => {
//     try {
//         const result = await poolRequest()
//             .input('Email', sql.VarChar, email)
//             .query('SELECT * FROM Employees WHERE Email = @Email AND admin = 0');
//         return result.recordset[0]; // Assuming there should be only one user with a given email
//     } catch (error) {
//         throw error;
//     }
// };

// // Service to add a new admin
// export const addAdminService = async (adminData) => {
//     try {
//         const result = await poolRequest()
//             .input('FirstName', sql.VarChar, adminData.FirstName)
//             .input('LastName', sql.VarChar, adminData.LastName)
//             .input('Location', sql.VarChar, adminData.Location)
//             // Add inputs for other admin fields as needed
//             .query(`INSERT INTO Employees (FirstName, LastName, Location, ..., admin)
//                     VALUES (@FirstName, @LastName, @Location, ..., 1)`);
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };

// // Service to add a new user (employee)
// export const addUserService = async (userData) => {
//     try {
//         const result = await poolRequest()
//             .input('FirstName', sql.VarChar, userData.FirstName)
//             .input('LastName', sql.VarChar, userData.LastName)
//             .input('Location', sql.VarChar, userData.Location)
//             // Add inputs for other user fields as needed
//             .query(`INSERT INTO Employees (FirstName, LastName, Location, ..., admin)
//                     VALUES (@FirstName, @LastName, @Location, ..., 0)`); 
//         return result;
//     } catch (error) {
//         throw error;
//     }
// };
