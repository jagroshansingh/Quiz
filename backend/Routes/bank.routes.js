const express=require('express')
const { bankModel } = require('../Models/bank.model')
const bankRouter=express.Router()

bankRouter.post('/create',async(req,res)=>{
    try {
        await bankModel.insertMany(req.body)
        res.send("Quiz created")
    } catch (error) {
        res.send(error)
    }
})

module.exports={bankRouter}