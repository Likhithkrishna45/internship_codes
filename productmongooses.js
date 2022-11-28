const mongoose = require('mongoose');
const productschema = mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:1,
        max:100,
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
    },
    createdat:{
        type:Date,
        default:()=>Date.now(),
    },
    updatedat:{
        type:Date,
        default:()=>Date.now(),
    },
    hobbies:[String],
    address:{
        street:String,
        city:String
    }
})

module.exports=mongoose.model("users",productschema)