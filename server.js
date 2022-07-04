require('dotenv').config()
const express=require('express')
const cors =require('cors')
const cookieParser=require('cookie-parser')
const corsOptions=require('./config/corsOptions')
const mongoose=require('mongoose')
const dbconnect=require('./config/dbConn')
const {API_PORT}=process.env

const app=express()
const PORT=process.env.PORT ||API_PORT

dbconnect()
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))


app.use('/auth',require('./routes/authentication'))
app.use('/register',require('./routes/register'))
app.use('/postes',require('./routes/api/postes'))
app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))

mongoose.connection.once('open',()=>{
    console.log('dbconect')
    app.listen(PORT,()=>{console.log(`listin to port ${PORT}`)})
})
