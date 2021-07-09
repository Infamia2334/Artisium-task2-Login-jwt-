const User = require("../../models/User")

 const getData = (req, res)=>{
    User.find((err, found)=>{
        if(!err)
            res.send(found)
        else{
            res.send(err)
        }
    })
}

module.exports = getData