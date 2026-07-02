const { default: mongoose, mongo } = require("mongoose");

let userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : [true, 'email is required']
    },
    password : {
        type : String,
        required : [true, 'password is required']
    },
    refreshToken : {
        type : String
    }
},{
    timestamps : true,
})

let userModel = mongoose.model("users",userSchema)
module.exports = userModel