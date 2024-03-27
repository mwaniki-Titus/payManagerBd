import { createNewOvertimeService, getEmployeeOvertimeService, getOvertimeByIDService} from "../services/overtimeServices.js";
import { sendBadRequest, sendCreated, sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import { getEmployeeByIDService } from "../services/userServices.js";

export const getAllOvertimeRecordController = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const overtimeRecords = await getEmployeeOvertimeService(employeeId);

        if (overtimeRecords.length > 0) {
            return res.status(200).json(overtimeRecords);
        } else {
            sendNotFound(res, 'No records found for overtime');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};

export const createNewOvertimeController = async (req, res) => {
    try {
        const { number_of_hours, rate_per_hours, employeeID } = req.body;

        if (!number_of_hours || !rate_per_hours || !employeeID) {
            return sendBadRequest(res, "Missing required parameters");
        }

        const overtime = {
            number_of_hours,
            rate_per_hours,
            employeeID
        };

        const employee = await getEmployeeByIDService(employeeID);

        // Check if user exists
        if (!employee || employee.length === 0) {
            return sendNotFound(res, "Employee not found");
        }

        const response = await createNewOvertimeService(overtime);

        if (response.rowsAffected > 0) {
            return sendCreated(res, `${employee[0].firstname} (${employeeID}) overtime record has been added successfully`);

        } else {
            return sendServerError(res, "Failed to create overtime record");
        }
    } catch (error) {
        return sendServerError(res, error.message);
    }
};



export const getOvertimeByIDController = async (req, res) => {
    try {
        const { overtimeID } = req.params;
        const overtimeRecord = await getOvertimeByIDService(overtimeID);

        if (overtimeRecord.length > 0) {
            return res.status(200).json(overtimeRecord[0]); 
        } else {
            sendNotFound(res, 'No overtime record found for the provided ID');
        }
    } catch (error) {
        sendServerError(res, error.message);
    }
};



// import { sendBadRequest, sendDeleteSuccess, 
//     sendCreated, sendNotFound,
//     sendServerError, sendSuccess, checkIfValuesIsEmptyNullUndefined} from "../helper/helperFunctions.js";     
// import { response } from "express";
// import { addOvertimeService, deleteOvertimeService, getAllOvertimesService, getOvertimeByEmpIDService, getOvertimeByIDService, updateOvertimeService } from "../services/OvertimeSevice.js";
// // import { verifyToken } from "../middlewares/VerifyToken.js";

// dotenv.config();


// const checkOvertime = async (req) => {
//   const overtimeID = Number(req.params.OvertimeID);
//   const overtime = await getOvertimeByIDService(overtimeID);
//   if (overtime.length == 0 || overtime.message) {
//       return false;
//   } else {
//       return true;
//   }
// }

// export const getAllOvertimesController = async (req,res) => {
//     try {
//         const data = await getAllOvertimesService();
//         if (data.length=== 0) {
//             sendNotFound(res, "Currently there is No Overtime");
//         } else {
//             res.status(200).send(data);
//         }
//     } catch (error) {
//         sendServerError(res, error);
//     }
// };

// export const getOvertimeByIDController = async (req, res) => {
//     try {
//       const overtimeID = Number(req.params.OvertimeID);
//       console.log(overtimeID)
//       const overtime = await getOvertimeByIDService(overtimeID);
  
//       if (overtime.length != 0) {
//         return res.status(200).json(overtime);
//       } else {
//         return res.status(404).json({ error: "overtime not found" });
//       }
//     } catch (error) {
//       sendServerError(res, error.message);
//     }
//   };


//   // get overtime by employeeID
  
//   export const getovertimesByEmpIDController = async (req, res) => {
//     try {
//       const employeeID = Number(req.params.EmployeeID);
//       const overtime = await getOvertimeByEmpIDService(employeeID);
  
//       if (overtime.length != 0) {
//         return res.status(200).json(overtime);
//       } else {
//         return res.status(404).json({ error: "overtime not found" });
//       }
//     } catch (error) {
//       sendServerError(res, error.message);
//     }
//   };


//     //Adding overtime
// export const addovertimeController = async (req, res) =>{
//   const {
//     EmployeeID, AttendanceID, OvertimeHours, OvertimeEarnings 
//   } = req.body;
//   // console.log(req.body);

//   try {

//       // const {error} = validateNewPosition({
//       //     Title, BasicSalary, OvertimeRate
//       // });

//       // if (error){
//       //     // return res.status(400).send(error.details.message);
//       //     return res.status(400).send(error.details[0].message);
//       // }
//       // const Title = String(req.params.Title);
//       // console.log(Title)
//       // const existingPosition = await getPositionByTitleService(Title);

//       // if (existingPosition) {
//       //     return res.status(400).json({ error : "Position already exists"});
//       //     // console.log("Use in the syste alredy");
//       // }
      
//       const newOvertime = {
//         EmployeeID, AttendanceID, OvertimeHours, OvertimeEarnings 
//       }
//       // console.log(newPosition);

//       const response = await addOvertimeService(newOvertime);

//       if (response instanceof Error){
//           throw response;
//       }

//       if (response.rowsAffected && response.rowsAffected[0] === 1) {
         
//           sendCreated(res, "Overtime created successfully");
//         } else {
//           sendServerError(res, "Failed to create Overtime");
//         }
//   } catch (error) {
//       sendServerError(res, error.message);
//   }
// }



// //delette
// export const deleteOvertimeContollor = async (req, res) => {
//   try {
//       const overtimeID = Number(req.params.OvertimeID);
//       if (await checkOvertime(req)) {
//           const result = await deleteOvertimeService(overtimeID);
//           if (result && result.message) {
//             console.log(onContoll)
//               return res.status(500).send({ "error": result.message });
//           } else {
//               return sendDeleteSuccess(res, 'Overtime deleted successfully');
//           }
//       } else {
//           return sendNotFound(res, 'Overtime not found');
//       }

//   } catch (error) {
//       sendServerError(res, error.message);
//   }
// }


// export const updateOvertimeByEmpIDController = async (req, res) => {
//   try {
//     const employeeID = Number(req.params.EmployeeID);
//     const exists = await checkOvertime(req);

//     // if (!exists){
//     //   return res.status(404).json({ message: "Attendance not found" });
//     // }
    
//     const overtimeData = await getOvertimeByEmpIDService(employeeID);
//     // console.log(employeeData)
   
//     const updatedOvertimeData ={ ...overtimeData[0], ...req.body };
//     updatedOvertimeData.EmployeeID =employeeID;
//     // console.log(employeeID)

//     if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
//           const { AttendanceID, OvertimeHours, OvertimeEarnings  } = req.body;
        
//           if (AttendanceID) {
//             updatedOvertimeData.AttendanceID = AttendanceID;
//           }
//           if (OvertimeHours) {
//             updatedOvertimeData.OvertimeHours = OvertimeHours;
//           }
//           if (OvertimeEarnings) {
//             updatedOvertimeData.OvertimeEarnings = OvertimeEarnings;
//           }
          
//           const updatedOvertime = await updateOvertimeService(updatedOvertimeData);
//           if (updatedOvertime && updatedOvertime.rowsAffected && updatedOvertime.rowsAffected[0] > 0) {
//             return res.status(200).json({ message: "Overtime updated successfully" });
//           } else {
//             return res.status(500).json({ error: "Failed to update Overtime" });
//         }}
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }