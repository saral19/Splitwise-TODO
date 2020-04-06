const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

//Insert one task
router.post('/tasks',async (req,res) =>
{
    const task = new Task(req.body)
    try{
        
        await task.save()
        res.status(201).send(task)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
//Fetch all Tasks
router.get('/tasks',async (req,res) =>
{
    try{
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
//Fetch task by id
router.get('/tasks/:id',async (req,res) =>
{
    try{
        const task = await Task.findById(req.params.id)
        if(!task)
            return res.status(500).send("task not found")
        res.status(200).send(task)
    }
    catch(e)
    {
        res.status(500).send("task not found")
    }
})
//Update task
router.patch('/tasks/:id',async (req,res) =>
{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title','date']
    const isValidOpearation = updates.every((update) =>
    {
        return allowedUpdates.includes(update)
    })
    if(!isValidOpearation)
    {
        return res.status(400).send({error:"Invalid Update"})
    }
    try
    {
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,new:true})
        if(!task)
        {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
//delete task
router.delete('/tasks/:id',async (req,res) =>
{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task)
        {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(e)
    {
        res.satus(500).send(e)
    }
})
module.exports = router