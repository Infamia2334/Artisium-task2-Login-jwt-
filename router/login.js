const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const User = require("../models/User")
const auth = require("../middleware/auth")

const Plc = require("../server")




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
   
            // const data = await Plc.find({}, {data: 1, inserted_time: 1, _id: 0}).sort({$natural: -1}).limit(1)
            
            //     let result = JSON.stringify(data[0])
                
            //     let d = JSON.parse(result)
            //     let p = d["data"]
            //      res.render("live", {PLC:p})
                // res.status(200).json({
                //     status: "success",
                //     data: p
                // })
                
            // }); 
    try{
        await Plc.find({},{data:1, _id: 0, inserted_time: 1}, (err, found)=>{
            // options:{
            //     limit: 10
            // }
            if(!err){
                // console.log(found)
                var d
                if(found.length){
                    var keys = []
                    var data_values = []
                    found.forEach(e => {
                    
                    let result = JSON.stringify(e)
                    // var result = JSON.stringify(found[e])
                    console.log(result)
                    d = JSON.parse(result)
                    console.log(d.data.temperature)
                    
                    for(var k in d.data){
                        keys.push(k)
                        data_values.push(d.data[k])
                    }
                    
                    
                    });
                    console.log(keys)
                    console.log(data_values)
                    // res.send(found)
                    res.render("live", {PLC:found, data_keys: keys, data_values: data_values})
                }
                else{
                    console.log("no data in db")
                }
                
            }
            else{
                res.send(err)
            }
        }).limit(10)
        // res.render("live", {PLC: found})
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router
