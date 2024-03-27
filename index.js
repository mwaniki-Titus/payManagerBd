import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import userRouter from './src/routes/userRoutes.js'
import positionRouter from './src/routes/positionRoutes.js'
import deductionsRouter from './src/routes/deductionRoutes.js'
import cashAdvancesRouter from './src/routes/cashAdvanceRoutes.js'
import overtimeRouter from './src/routes/overtimeRoutes.js'
import scheduleRouter from './src/routes/scheduleRoutes.js'
import attendanceRouter from './src/routes/attendanceRoutes.js'
import payrollRouter from './src/routes/payrollRoutes.js'


dotenv.config()

const app=express()
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
}
const PORT=process.env.PORT || 8000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors(corsOptions));


app.use('/api', userRouter),
app.use('/api', positionRouter),
app.use('/api',cashAdvancesRouter),
app.use('/api', deductionsRouter),
app.use('/api', overtimeRouter),
app.use('/api', scheduleRouter),
app.use('/api', attendanceRouter),
app.use('/api', payrollRouter)







app.listen(PORT,()=>{
    console.log(`This app is running on port ${PORT}`);
})