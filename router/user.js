const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/User")




router.get("/", (req, res)=>{
    User.find((err, found)=>{
        if(!err)
            res.send(found)
        else{
            res.send(err)
        }
    })
})

router.post('/', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.send(err)
    })
})




// router.post("/login",async (req, res)=>{
//     try{
//         const user = await User.findByCredentials(req.body.username, req.body.password)
//         const token = await user.generateAuthToken()
//         res.status(200).send({user: user, token: token})
//     }
//     catch(e){
//         console.log(e)
//         res.status(400).send()
//     }
    
// })


module.exports = router