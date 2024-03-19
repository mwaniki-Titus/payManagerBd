
import mssql from 'mssql'
import { poolRequest } from '../utils/sqlDbConnect.js'
import  * as uuid from 'uuid'





export const createCashAdvancesService=async(cashAdvances)=>{
    const {user_id,amount,number_of_hours}=cashAdvances
    try{
        const cash_advance_id=uuid.v4()
        const response=await poolRequest()
        .input('cash_advance_id',mssql.VarChar,cash_advance_id)
        .input('user_id', mssql.VarChar,user_id)
        .input('amount', mssql.Decimal,amount)
        .input('number_of_hours',mssql.VarChar,number_of_hours)
        .query(`
                INSERT INTO cash_advances(cash_advance_id,user_id,number_of_hours,amount)
                VALUES(@cash_advance_id, @user_id,@number_of_hours,@amount)
        `)
         return response

    }
    catch(error){
        return error
    }
}


export const getAllCashAdvancesServices=async()=>{
    try {
         const response=await poolRequest()
         .query(`SELECT cash_advances.*, tbl_user.firstname, tbl_user.lastname, tbl_user.user_id, tbl_user.identification_number
                FROM cash_advances 
                JOIN tbl_user ON tbl_user.user_id=cash_advances.user_id

         
         
         `)
         return response.recordset
        
    } catch (error) {
        return error
    }
}

import joi from 'joi'

export const userLoginValidator=({email,password})=>{

    const userSchema=joi.object({
        
        email:joi.string().required(),
        password:joi.string().required(),
           
    })
    return userSchema.validate({email,password});
}