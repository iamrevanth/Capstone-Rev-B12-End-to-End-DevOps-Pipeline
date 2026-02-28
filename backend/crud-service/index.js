const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
PORT = process.env.PORT || 3001
const conn = require('./conn')
app.use(express.json())
app.use(cors())

const tripRoutes = require('./routes/trip.routes')

app.use('/trip', tripRoutes) // http://localhost:3001/trip --> POST/GET/GET by ID

app.get('/hello', (req,res)=>{
    res.json({ message: "Hello from Crud Service 🚀" });
})

app.listen(PORT, ()=>{
    console.log(`✅ Server started at http://localhost:${PORT}`)
})