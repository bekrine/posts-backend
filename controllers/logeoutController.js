const User=require('../model/User')



const handelLogout=async(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt)return res.sendStatus(204)
    const refreshToken=cookies.jwt
    const findUser=await User.findOne({refreshToken}).exec()
    if(!findUser){
        res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStatus(403)
    }
   //delete from db
   await User.findOneAndUpdate(findUser.email,{'refreshToken':''})
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})
    res.sendStatus(204)
}

module.exports={handelLogout}