const express=require('express')
const router=express.Router()
const refreshAcces=require('../controllers/refreshTokenController')


router.post('/',refreshAcces.refreshAccesToken)


module.exports=router