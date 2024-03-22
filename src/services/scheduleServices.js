
import { poolRequest, sql } from '../utils/dbConnect.js';
import * as uuid from 'uuid';



export const addScheduleService = async (newSchedule) => {
    const { InTime, OutTime, ScheduleName } = newSchedule;
    try {
        const result = await poolRequest() 
            .input("InTime", sql.VarChar(255),  InTime) 
            .input("OutTime", sql.VarChar(255), OutTime)    
            .input("ScheduleName", sql.VarChar(255),ScheduleName) 
            .query(
                `INSERT INTO Schedule (InTime, OutTime, ScheduleName)
                VALUES ( @InTime, @OutTime, @ScheduleName)` 
            );
        return result; 
    } catch (error) {
        return error; 
    }
}
export const getScheduleByIdService = async (scheduleID) => {
    try {
        const result = await poolRequest()
            .input('ScheduleID', sql.VarChar, scheduleID)
            .query(`SELECT * FROM Position WHERE ScheduleID = @ScheduleID`);
        
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const getScheduleIdService = async (scheduleID) => {
    try {
        const result = await poolRequest()
        .input('ScheduleID', sql.VarChar, scheduleID)
        .query(`
            SELECT Schedule.*, Employees.*
            FROM Schedule
            INNER JOIN Employees ON Employees.ScheduleID = Schedule.ScheduleID
            WHERE ScheduleID = @ScheduleID
        `);
        return result.recordset;
    } catch (error) {
        return error;
    }
};



export const getAllScheduleService = async () => {
    try {
        const result = await poolRequest()
            .query(`SELECT * FROM Schedule`);
        return result.recordset;
    } catch (error) {
        return error;
    }
};

export const getAShiftByDescriptionService = async (scheduleDescription) => {
    try {
        const result = await poolRequest()
            .input('ScheduleDescription', sql.VarChar, scheduleDescription) 
            .query(`SELECT * FROM Schedule WHERE ScheduleName = @ScheduleDescription`); 
        return result.recordset;
    } catch (error) {
        return error;
    }
};

export const updateScheduleService = async (updatedSchedule) => {
    try {
        const result = await poolRequest()
            .input('ScheduleID', sql.Int, updatedSchedule.ScheduleID)
            .input('InTime', sql.Time, updatedSchedule.InTime)
            .input('OutTime', sql.Time, updatedSchedule.OutTime)
            .input('ScheduleName', sql.VarChar(50), updatedSchedule.ScheduleName)
            .query(`
                UPDATE Schedule
                SET InTime = @InTime, OutTime = @OutTime, ScheduleName = @ScheduleName
                WHERE ScheduleID = @ScheduleID
            `);

        return result;
    } catch (error) {
        throw error;
    }
};

export const deleteScheduleService = async (scheduleID) => {
    try {
        const result = await poolRequest()
            .input('ScheduleID', sql.Int, scheduleID)
            .query(`
                DELETE FROM Schedule
                WHERE ScheduleID = @ScheduleID
            `);

        return result;
    } catch (error) {
        throw error;
    }
};

export const getEmployeesInScheduleService = async (scheduleID) => {
    try {
        const result = await poolRequest()
            .input('ScheduleID', sql.Int, scheduleID)
            .query(`
                SELECT Employees.EmployeeID, Employees.FirstName, Employees.LastName, Schedule.InTime, Schedule.OutTime, Schedule.ScheduleName
                FROM Employees
                INNER JOIN Schedule ON Employees.ScheduleID = Schedule.ScheduleID
                WHERE Schedule.ScheduleID = @ScheduleID
            `);
        return result.recordset;
    } catch (error) {
        return error;
    }
};
