
const User = require("../../models/User")


const login = async (req,res)=>{
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
}

module.exports = login