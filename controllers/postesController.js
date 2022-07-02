const uuid=require('uuid')

const users=[]
const postes=[{
    id:'',
    titel:'',
    content:''
}]
const getAllPosts=(req,res)=>{
    res.json({'data':postes})
}

const addNewposte=(req,res)=>{
    const {id,poste}=req.body
    const findUser=users.find(user=>user.id===id)
    if(!findUser)return res.sendStatus(401)
    poste={
        id:uuid.v4(),
        titel,
        content
    }
    findUser.postes.push(poste)
    res.json({'data':postes})
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