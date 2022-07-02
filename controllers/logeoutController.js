


const handelLogout=(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt)return res.sendStaus(204)
    const refreshToken=cookies.jwt
    const findUser=users.find(user=>user.refreshToken === refreshToken)
    if(!findUser){
        res.clearCookie('jwt',{httpOnly:true,maxAge:24*60*60*1000})
        return res.sendStaus(403)
    }

   //delete from db
    const otherUsers=users.filter(user=>user.refreshToken !== findUser.refreshToken)
    const currentUser={...findUser,refreshToken:''}
    const db=[...otherUsers,currentUser]
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true})
    res.sendStaus(204)
}

module.exports={handelLogout}