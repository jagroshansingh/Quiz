const express=require('express')
const { scoreModel } = require('../Models/score.model')
const scoreRouter=express.Router()

scoreRouter.post("/push",async(req,res)=>{
    let d=new Date()
    let date=d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()
    try {
        await scoreModel.insertMany({...req.body,date})
        res.send('inserted success')
    } catch (error) {
        res.send(error)
    }
})

scoreRouter.get("/pull",async(req,res)=>{   
    try {
        let found=await scoreModel.find({quiz:req.headers.quiztitle})
        res.send(found.sort((a,b)=>b.score-a.score))
    } catch (error) {
        res.send(error)
    }
})

module.exports={scoreRouter}