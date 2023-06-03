const mongoose=require('mongoose')

const scoreSchema=mongoose.Schema({},{strick:false})

const scoreModel=mongoose.model('score',scoreSchema)

module.exports={scoreModel}