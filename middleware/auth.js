const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next)=> {
    try{
        // const token = req.cookies("Authorization").replace("Bearer", "").trim()
        const token = req.cookies.token
        console.log(token)
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findOne({ _id: decoded._id, "tokens.token": token })


        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()

    } catch(err){
        console.log(err)
        res.status(401).send({ error: "Error when authenticating"})
    }
}


module.exports = auth