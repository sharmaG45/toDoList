const mongoose=require('mongoose')

const customerSchema=new mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    phone:String,
    password:String
})

const customerModel=mongoose.model('customer',customerSchema)
module.exports=customerModel