const jwt=require('jsonwebtoken')
require('dotenv').config()


const verifyJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith('Bearer '))return res.sendStatus(401)
    const token=authHeader.split(/(\s+)/)
    
    
    jwt.verify(
        token[2],
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) return res.sendStatus(403)
            req.email=decoded.userEmail
            next()
        }
    )

}


module.exports=verifyJwt