const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
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
    },
    email:
    {
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true
    },
    password:
    {
        type:String,
        required:true,
        trim:true
    },
    tokens:
    [
        {
            token:
            {
                type:String,
                required:true
            }
        }
    ]

})
userSchema.pre('save',async function(next)
{
    const user = this
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }   
    next()
})
userSchema.statics.findByCredential = async (email,password) =>
{
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login wrong email id')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error("Password is wrond")

    }
    return user
}
userSchema.methods.generateAuthToken = async function()
{
    const user = this
    const token = jwt.sign({_id:user.id.toString()},'SplitwiseTodo')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User',userSchema)

module.exports = User