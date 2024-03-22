import express from 'express';
import { Router } from 'express';
import {
    getAllAttendanceController,
    getAttendanceByIDController,
    addAttendanceController,
    // deleteAttendanceController,
    updateAttendanceController
} from '../controllers/attendanceController.js';

const attendanceRouter = Router();

attendanceRouter.get('/attendance/getAll', getAllAttendanceController);

attendanceRouter.get('/attendance/attendanceByID/:attendanceID', getAttendanceByIDController);

attendanceRouter.post('/attendance/addAttendance', addAttendanceController);

// attendanceRouter.delete('/attendance/deleteattendanceByID/:attendanceID', deleteAttendanceController);
attendanceRouter
attendanceRouter.put('/attendance/editAttendance/:attendanceID', updateAttendanceController);

export default attendanceRouter;
