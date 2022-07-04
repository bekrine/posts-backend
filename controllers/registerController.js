const User=require("../model/User")
const bcrypt=require('bcrypt')
const  uuid=require('uuid')


const handelNewUser=async(req,res)=>{
    
    const{firstName,lastName,email,password}=req.body
    if(!firstName || !lastName || !email || !password){
        return  res.status(400).json({'message':'all filde are required'})
    }
     const duplicate= await User.findOne({email}).exec()

    if(duplicate)return res.sendStatus(409)
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        const result= await User.create({
            'firstName':firstName
            ,'lastName':lastName,
            'email':email,
            'password':hashedPassword
        })
        res.status(201).json({'succes':'user created with succes'})
    } catch (err) {
        res.status(500).json({"message":err.message})
    }

    

}

module.exports={handelNewUser}