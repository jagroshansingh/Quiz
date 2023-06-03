const express=require('express')
const { connection } = require('./db')
const { authRouter } = require('./Routes/auth.routes')
const app=express()
require('dotenv').config()
const cors=require('cors')
const { bankRouter } = require('./Routes/bank.routes')
const { scoreRouter } = require('./Routes/score.routes')
app.use(cors())
app.use(express.json())

app.use('/auth',authRouter)
app.use('/quiz',bankRouter)
app.use('/score',scoreRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log('DB is running awesome')
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at ${process.env.port}`)
})