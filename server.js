const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: true, useCreateIndex: true}).then(()=>console.log("Connected to DB successfully")).catch(err => console.log(err))
app.use(express.json())



app.get('/', (req, res)=> {
    res.send("Welcome, please login with API")
})

const userRoute = require("./router/user")

app.use("/User", userRoute)



app.listen(port, ()=> console.log(`Server started on port ${port}`))

