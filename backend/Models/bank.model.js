const mongoose=require('mongoose')

const bankSchema=mongoose.Schema({},{strict:false})

const bankModel=mongoose.model('bank',bankSchema)

module.exports={bankModel}