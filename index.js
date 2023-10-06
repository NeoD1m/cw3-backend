const express = require('express')
const userRouter = require('./routes/user.routes')
const PORT = process.env.PORT || 8080

const app = express()
var cors = require('cors')

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))