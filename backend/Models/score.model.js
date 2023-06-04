const mongoose=require('mongoose')

const scoreSchema=mongoose.Schema({},{strict:false})

const scoreModel=mongoose.model('score',scoreSchema)

module.exports={scoreModel}