const mongoose = require("mongoose")



const conn2 = mongoose.createConnection("mongodb://172.105.40.182:27017/plc",{ user: "plc_1",
pass: "767FWGF43a",
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false}).then(() => {
    console.log("Connceted to plc mongo db Successfully!");
});



module.exports = conn2