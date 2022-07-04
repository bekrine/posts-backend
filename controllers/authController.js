const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken')
const User=require('../model/User')


const authHandler=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({'message':'email & password required'})
    }
    const findUser=await User.findOne({email}).exec()
    console.log(findUser)
    if(!findUser)return res.sendStatus(401)
    const match = await bcrypt.compare(password,findUser.password)
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
            await User.findOneAndUpdate(findUser.email,{'refreshToken':refreshToken}) 
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'none',secure:true,maxAge:24*60*60*1000})    
        res.json({accesToken})

    }else{
        res.sendStatus(401)
    }
}

module.exports={authHandler}