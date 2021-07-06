const express = require("express")
const router = express.Router()
const User = require("../models/User")


router.get("/", (req, res)=>{
    res.render("signin")
})

router.post("/",async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user: user, token: token})
    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
    
})

module.exports = router
