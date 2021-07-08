const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
    tokens: {
        type: [{
            token: {
                type: String,
                required: true
            }
        }]
    }
})


userSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id: user.id.toString()}, process.env.TOKEN_SECRET, {
        // expiresIn: process.env.TOKEN_LIFE
    })

    user.tokens = user.tokens.concat({token: token})
    await user.save()
    return token
}


userSchema.statics.findByCredentials = async (username, password)=>{
    const user = await User.findOne({username: username})

    if(!user){
        throw new Error("Unable to find User, cannot login")
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("Cannot Login")
    }

    return user
}

//Hashing before saving
userSchema.pre("save", async function(next){
    const user = this
    
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = new mongoose.model("User", userSchema)
module.exports = User