const express=require('express')
const router=express.Router()
const logoutController=require('../controllers/logeoutController')


router.post('/',logoutController.handelLogout)


module.exports=router