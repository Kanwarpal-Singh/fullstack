const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email :String,
    pass:String,
    age:Number,
    secretKey:String,
    dob:String
})
const UserModel = mongoose.model("user",userSchema);

module.exports = {
    UserModel
}