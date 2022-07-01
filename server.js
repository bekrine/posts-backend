const express=require('express')
const cors =require('cors')

const app=express()
const PORT=3500

const whiteListe=['http//localhost:3000']
const corsOption={
    origin:(origin,callback)=>{
        if(whiteListe.indexOf(origin) !== -1){
            callback(null,true)
        }else{
            callback(new Error('Not Allowed by CORS'))
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOption))
app.use(express.json())


app.post('/register',(req,res)=>{
    console.log(req)
})

app.listen(PORT,()=>{console.log(`listin to port ${PORT}`)})
