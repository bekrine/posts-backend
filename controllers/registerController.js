const bcrypt=require('bcrypt')
const  uuid=require('uuid')


const handelNewUser=async(req,res)=>{
    
    const{firstName,lastName,email,password}=req.body
    if(!firstName || !lastName || !email || !password){
        return  res.status(400).json({'message':'all filde are required'})
    }
    // const duplicate=db.users.find(user=>user.email === email)
    const duplicate=false
    if(duplicate)return res.sendStatus(409)
    try {
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser={id:uuid.v4(),firstName,lastName,email,passw:hashedPassword}
        console.log(newUser)
        res.status(201).json({'succes':'user created with succes'})
    } catch (err) {
        res.status(500).json({"message":err.message})
    }

    

}

module.exports={handelNewUser}