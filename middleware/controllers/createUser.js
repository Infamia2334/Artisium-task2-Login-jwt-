const User = require("../../models/User")

const createUser = (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports = createUser
