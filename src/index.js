const express = require('express')
require('./db/mongoose')

const app = express()
const port = process.env.PORT   // || 3000
app.use(express.json())
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

app.use(userRouter)
app.use(taskRouter)
app.listen(port,() =>
{
    console.log("Server is up and running on port " + port)
})