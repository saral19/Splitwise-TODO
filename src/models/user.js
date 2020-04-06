const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',
{
    userID:
    {
        type:Number,
        required:true,
        trim:true
    },
    name:
    {
        type:String,
        required:true,
        trim:true
    },
    photoUrl:
    {
        type:String
    }

})
module.exports = User