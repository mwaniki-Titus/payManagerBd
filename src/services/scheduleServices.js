
import mssql from 'mssql'
import { poolRequest } from '../utils/dbConnect.js'
import * as uuid from 'uuid'
// import { schedule } from 'node-cron'


export const createNewScheduleService = async (schedule) => {
    try {
        const scheduleID = uuid.v4();
        const result = await poolRequest()
            .input('InTime', mssql.Time, schedule.in_time) 
            .input('OutTime', mssql.Time, schedule.out_time) 
            .query(`
                INSERT INTO Schedule ( InTime, OutTime)
                VALUES ( @InTime, @OutTime)
            `);
        return result;
    } catch (error) {
        return error;
    }
}

export const getAllScheduleService = async () => {
    try {
        const result = await poolRequest()
            .query(`SELECT * FROM Schedule`);
        return result.recordset;
    } catch (error) {
        return error;
    }
}

export const getAShiftByDescriptionService = async (scheduleDescription) => {
    try {
        const result = await poolRequest()
            .input('ScheduleDescription', mssql.VarChar, scheduleDescription) 
            .query(`SELECT * FROM Schedule WHERE ScheduleDescription = @ScheduleDescription`); 
    } catch (error) {
        return error;
    }
}


export const updateScheduleService = async (updatedSchedule) => {
    try {
        const result = await poolRequest()
            .input('ScheduleID', mssql.VarChar, updatedSchedule.scheduleID)
            .input('InTime', mssql.Time, updatedSchedule.in_time)
            .input('OutTime', mssql.Time, updatedSchedule.out_time)
            .query(`
                UPDATE Schedule
                SET InTime = @InTime, OutTime = @OutTime
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
            .input('ScheduleID', mssql.VarChar, scheduleID)
            .query(`
                DELETE FROM Schedule
                WHERE ScheduleID = @ScheduleID
            `);

        return result;
    } catch (error) {
        throw error;
    }
};
