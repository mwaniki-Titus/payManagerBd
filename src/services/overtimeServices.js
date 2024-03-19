
import mssql from 'mssql'
import * as uuid from 'uuid'
import { poolRequest } from '../utils/sqlDbConnect.js'




export const createNewOvertimeService=async(overtime)=>{
    try {
          const{number_of_hours,rate_per_hours,user_id}=overtime
          const overtime_id=uuid.v4()

          const result=await poolRequest()
          .input('overtime_id' , mssql.VarChar,overtime_id)
          .input('number_of_hours',mssql.VarChar, number_of_hours)
          .input('rate_per_hours',mssql.Decimal,rate_per_hours)
          .input('user_id',mssql.VarChar,user_id)
          .query(
            `INSERT INTO overtime(overtime_id,number_of_hours,rate_per_hours,user_id)
             VALUES(@overtime_id,@number_of_hours,@rate_per_hours,@user_id)
            `
          )
          
          return result
        
    } catch (error) {
        return error 
    }
}


export const getAllOvertimeService=async()=>{
    try {
        const result=await poolRequest()
        .query(`SELECT overtime.*,tbl_user.firstname,tbl_user.lastname
                FROM overtime
                JOIN tbl_user ON tbl_user.user_id=overtime.user_id
        
         `)

        return result.recordset
        
    } catch (error) {
        return error
    }
}

