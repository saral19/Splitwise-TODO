const mongoose = require('mongoose')
const validator = require('validator')
const Task = mongoose.model('Task',
{
    id:
    {
        type:Number,
        required:true,
        trim:true
    },
    userId:
    {
        type:Number,
        required:true,
        trim:true
    },
    title:
    {
        type:String,
        required:true,
        trim:true
    },
    date:
    {
        type:Date
    },
    isDone:
    {
        type:Boolean
    }
})
module.exports = Task