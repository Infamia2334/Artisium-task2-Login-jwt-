const express = require("express")
const router = express.Router()
const User = require("../models/User")
const auth = require("../middleware/auth")

router.get("/", (req, res)=>{
    res.render("signin")
})

router.post("/",async (req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.username, req.body.password)
        //generating auth token
        const token = await user.generateAuthToken()
      
        console.log({user: user, token: token})
        //Setting cookie
        res.cookie("token", token, {maxAge: process.env.TOKEN_LIFE * 1000})
        if(user){
            res.redirect("/login/dashboard")
        }
        res.end()

    }
    catch(e){
        console.log(e)
        res.status(400).send()
    }
    
})

router.get("/dashboard", auth, async (req, res)=>{
    try{
      
        res.render("live")
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router
