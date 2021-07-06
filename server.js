const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")


const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: true, useCreateIndex: true}).then(()=>console.log("Connected to DB successfully")).catch(err => console.log(err))
app.use(express.json())

app.use(express.static("public"))
app.use("/css", express.static(__dirname  + "public/styles"))

app.get('/', (req, res)=> {
    res.send("Welcome, please login with API")
})

app.set("views", "./views")
app.set("view engine", "ejs")

const userRoute = require("./router/user")



app.use("/User", userRoute)



app.listen(port, ()=> console.log(`Server started on port ${port}`))

