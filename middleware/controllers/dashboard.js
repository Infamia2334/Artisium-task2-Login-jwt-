const Plc = require("../../server")
const moment = require("moment")


const dateFormat = "YYYY-MM-DD HH:mm"

const dashboard = async (req, res)=>{
   
    try{
        await Plc.find({},{data:1, _id: 0, inserted_time: 1}, (err, found)=>{

            if(!err){
                // console.log(found)
                var d
                var date
                var dateTime
                if(found.length){
                    var keys = []
                    var data_values = []
                    found.forEach(e => {
                     
                    
                    let result = JSON.stringify(e)
                    
                    // var result = JSON.stringify(found[e])
                    console.log(result)
                    d = JSON.parse(result)
                    console.log(d.data.temperature)
                    
                    for(var k in d.data){
                        keys.push(k)
                        data_values.push(d.data[k])
                        date = new Date(e.inserted_time)
                        console.log(date)
                        dateTime = moment(date).format(dateFormat)
                    }
                    
                    
                    });
                    console.log(keys)
                    console.log(data_values)
                    // res.send(found)
                    res.render("live", {timestamp: dateTime, data_keys: keys, data_values: data_values})
                }
                else{
                    console.log("no data in db")
                }
                
            }
            else{
                res.send(err)
            }
        }).limit(10)
        // res.render("live", {PLC: found})
    }
    catch(err){
        res.send(err)
    }
}

module.exports = dashboard
