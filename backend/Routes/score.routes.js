const express=require('express')
const { scoreModel } = require('../Models/score.model')
const scoreRouter=express.Router()

scoreRouter.post("/push",async(req,res)=>{
    try {
        await scoreModel.insertMany(req.body)
        res.send('inserted success')
    } catch (error) {
        res.send(error)
    }
})

module.exports={scoreRouter}