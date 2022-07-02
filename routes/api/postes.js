const express=require("express")
const router=express.Router()
const postController=require('../../controllers/postesController')
const verifyJwt=require('../../middelware/verifyJwt')

router.route('/')
        .get(postController.getAllPosts)
        .post(verifyJwt, postController.addNewposte)
        .put(verifyJwt,postController.updatPost)
        .delete(verifyJwt,postController.deletePost)
router.route("/:id")
        .get(postController.getOnePost)


        module.exports=router