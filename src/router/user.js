const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')
router.post('/user',async (req,res) =>
{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.send(201).send({user,token})
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res) =>
{
    try
    {
        const user = await User.findByCredential(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send(user)
    }
    catch(e)
    {
        res.status(400).send()
    }
})
router.post('/users/logout',auth,async (req,res) =>
{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>
        {
            return token.token = req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
router.post('/users/logoutall',auth,async (req,res) =>
{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
router.patch('/users/me',auth,async (req,res) =>
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValidOperation = updates.every((update) =>
    {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation)
    {
        return res.status(400).send({error:"Invalid Updates"})
    }
    try
    {
        updates.forEach((update) =>
        {
            req.user[update] = req.body[update]
        })
        await req.user.save()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
router.delete('/users/me',auth,async (req,res) =>
{
    try{
        await req.user.remove()
        res.send(res.user)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
router.get('/users/me',auth,async (req,res) =>
{   
    res.send(req.user)          
})
module.exports = router