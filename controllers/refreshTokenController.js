const jwt=require('jsonwebtoken')
require('dotenv').config()


const refreshAccesToken=(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt)return res.sendStaus(401)
    const refreshToken=cookies.jwt
    const findUser=users.find(user=>user.refreshToken === refreshToken)
    if(!findUser)return res.sendStaus(403)

    jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || findUser.email !== decoded.userEmail)return res.sendStaus(403)
         const accesToken= jwt.sign(
                {'userEmail':decoded.userEmail},
                process.env.REFRECH_TOKEN_SECRET,
                {expiresIn:'1m'}
            )
            res.json({accesToken})
        }
    )

}

module.exports={refreshAccesToken}