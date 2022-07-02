const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authHandler=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({'message':'email & password required'})
    }
    const findUser=db.users.find(user=>user.email === email )
    if(!findUser)return res.sendStatus(401)
    const match = await bcrypt.compare(password,findUser.passw)
    if(match){

        //create  token
        const accesToken=jwt.sign(
            {'userEmail':findUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:"5min"
            }
        )

        const refreshToken=jwt.sign(
            {'userEmail':findUser.email},
            process.env.REFRECH_TOKEN_SECRET,
            {
                expiresIn:'1d'
            }
            )
        //add token to db
        const otherUser=users.filter(user=>user.email !== findUser.email)  
        const userWithToken={...findUser,refreshToken}
        const db=[...otherUser,userWithToken]  
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'none',secure:true,maxAge:24*60*60*1000})    
        res.json({accesToken})
    }else{
        res.sendStatus(401)
    }
}

module.exports={authHandler}