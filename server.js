const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: true, useCreateIndex: true}).then(()=>console.log("Connected to DB successfully")).catch(err => console.log(err))

// var testConn = undefined
const conn = mongoose.createConnection("mongodb://172.105.40.182:27017/plc",{ user: "plc_1",
pass: "767FWGF43a",
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false})
// .then((res) => {
//     console.log("Connceted to plc mongo db Successfully!");
//     testConn = res
//     return res
// }).catch(err =>{console.log(err)})

const plcSchema = mongoose.Schema({
        modbus: Object,
        inserted_time: Date
    })

const Plc = conn.model("PLC_1", plcSchema)
module.exports = Plc
// console.log(Object.keys(conn))




app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use("/css", express.static(__dirname  + "public/styles"))

app.get('/', (req, res)=> {
    res.send("Welcome, please login with API")
})


app.set("views", "./views")
app.set("view engine", "ejs")

const userRoute = require("./router/user")
const loginRoute = require("./router/login")

// app.use("/controller", controllerRoute)
app.use("/User", userRoute)
app.use("/login", loginRoute)




app.listen(port, ()=> console.log(`Server started on port ${port}`))

