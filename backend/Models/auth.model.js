const mongoose=require('mongoose')

const authSchema=mongoose.Schema({},{strict:false})
const authModel=mongoose.model('auth',authSchema)

module.exports={authModel}