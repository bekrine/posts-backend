const uuid=require('uuid')
const User=require('../model/User')

const getAllPosts=async(req,res)=>{
        const users=await User.find()
        if(!users)return res.status(204).json({'message':'non users found'})
        const postes = users.map((user)=>{return [...user.postes]})
        res.json(postes)
}

const addNewposte=async(req,res)=>{
    console.log(req.email)
    const users=await User.find()
    const email=req.email
    const {titel,content}=req.body
    const findUser= await User.findOne({email}).exec()
    if(!findUser)return res.sendStatus(401)
   findUser.postes.push({
    'title':titel,
        content
    })
   await findUser.save()
   const postes = users.map((user)=>{return [...user.postes]})

    // findUser.postes.push(poste)
    res.json(postes)
}



const updatPost=(req,res)=>{
    const {id,poste}=req.body
    const findUser=users.find(user=>user.id===id)
    if(!findUser)return res.sendStatus(401)
   const postToUpdate= findUser.postes.find(post=>post.id === poste.id)
   postToUpdate.titel=poste.titel?poste.titel:postToUpdate.titel
   postToUpdate.content=poste.content?poste.content:postToUpdate.content

   const otherusers=users.filter(user=>user.id !== findUser.id)
   newUsers=[...otherusers,findUser]
   res.json(newUsers)
}


const deletePost=(req,res)=>{
    const {id,poste}=req.body
    const findUser=users.find(user=>user.id===id)
    if(!findUser)return res.sendStatus(401)
   const postToDelete= findUser.postes.find(post=>post.id === poste.id)
    if(!postToDelete)return res.sendStatus(401)
    findUser.postes.filter(post=>post.id !== poste.id)
    const otherusers=users.filter(user=>user.id !== findUser.id)
    newUsers=[...otherusers,findUser]
    res.json({newUsers})
}

const getOnePost=(req,res)=>{
   const id= req.params.id
   const singelPost=users.postes.filter(post=>post.id === id)
   if(!singelPost)return res.sendStatus(401)
   res.json({singelPost})
}

module.exports={getAllPosts,addNewposte,updatPost,deletePost,getOnePost}