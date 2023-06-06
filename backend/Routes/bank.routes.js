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

bankRouter.get('/',async(req,res)=>{
    try {
        let found=await bankModel.find()
        res.send(found)
    } catch (error) {
        res.send(error)
    }
})

bankRouter.get('/single',async(req,res)=>{
    try {
        let found=await bankModel.find({_id:req.headers.id})
        res.send(found)
    } catch (error) {
        res.send(error)
    }
})

bankRouter.put('/update',async(req,res)=>{
    try {
        await bankModel.findByIdAndUpdate(req.headers.quizid,req.body)
        res.send('updated successfully')
    } catch (error) {
        res.send(error)
    }
})

bankRouter.delete('/delete',async(req,res)=>{
    try {
        let see=await bankModel.findByIdAndDelete(req.headers.quizid)
        res.send('quiz successfully deleted')
    } catch (error) {
        res.send(error)
    }
})

module.exports={bankRouter}