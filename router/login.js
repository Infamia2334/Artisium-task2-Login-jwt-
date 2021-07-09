const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")

const login = require("../middleware/controllers/login")
const liveData = require("../middleware/controllers/dashboard")




router.get("/", (req, res)=>{
    res.render("signin")
})

router.post("/", login)

router.get("/dashboard", auth, liveData)

router.post("/logout", auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()

    } catch(e){
        res.status(500).send()
    }
})

module.exports = router
