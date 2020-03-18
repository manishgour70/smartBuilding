const express = require('express')
require('mongoose')
require('./mongoose')
const User = require('./ACData.js')



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

var schema={Time_Stamp:1,Device_ID:1,Current:1, voltage:1,Power_Factor:1,room_temp:1,Compressor_temp:1,External_temp:1,Current_mode_of_AC:1,timing_clock_of_ac:1,AC_fan:1,Humidity:1,_updated:1,_etag:1}

app.get('', (req, res) => {

User.find({}).then((user) => {
        
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/energygrid/currentDate',function (req, res) {
    
    if(Object.keys(req.query).length === 0)
    {
    var date2=new Date()
    var date1=new Date()
    date1.setDate(date1.getDate()+1)
    }
    else{
    var date2=new Date(req.query.date1)
    var date1=new Date(req.query.date1)
    date1.setDate(date1.getDate()+1)
}
    // console.log('date1')
    // console.log(date1)
    // console.log('date2')
    // console.log(date2)
    
    User.find({"Time_Stamp": {$gt:date2.toISOString(),$lte:date1.toISOString()}},schema).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/energygrid/currentWeek', function (req, res) {
    if(Object.keys(req.query).length !== 0){
    var date2=new Date(req.query.date1)
    var date1=new Date(req.query.date1)
    date1.setDate(date1.getDate()-7)
    console.log('date1')
    console.log(date1)
    console.log('date2')
    console.log(date2)
    }else{
        var date1=new Date();
        date1.setDate(date1.getDate()-7)
        var date2=new Date();
    }
    
    User.find({"Time_Stamp": {$gt:date1.toISOString(),$lte:date2.toISOString()}},schema).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
    
app.get('/energygrid/currentMonth', function (req, res) {
    
    if(Object.keys(req.query).length !== 0){
    
    var date1=new Date(req.query.date1)
    var days=date1.getDate()-1
    
    
    date1.setDate(date1.getDate()-days)
    
    date2=new Date(req.query.date1)
    date2.setDate(date2.getDate()-days)
    date2.setMonth((date2.getMonth())+1)
    console.log('date1')
    console.log(date1)
    console.log(date2)
    console.log('reached1')
    
    }else{
        console.log('reached2') 
        var date1=new Date()
        var days=date1.getDate()-1
        
        
        date1.setDate(date1.getDate()-days)
        
        date2=new Date()
        date2.setDate(date2.getDate()-days)
        date2.setMonth((date2.getMonth())+1)
        console.log('date1')
        console.log(date1)
        console.log(date2)
        console.log('reached1')
       
    }
    
    User.find({"Time_Stamp": {$gte:new Date(date1).toISOString(),$lt:new Date(date2).toISOString()}},schema).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
  
app.get('/energygrid/range', (req, res) => {
    //{Time_Stamp:{gte:currentDate}
//    console.log(req.body())
var date1=new Date(req.query.date1).toISOString()
var date2=new Date(req.query.date2).toISOString()

console.log(date1)
console.log(date2)
User.find({"_created": {"$gte":date1, "$lte":date2}}).then((user) => {
        // User.find({"_created":{"$week":$(new Date(date).toISOString())}}).then((user) => {
            // "_created":{"$gte":new Date(date).toISOString()}}).then((user)

        // console.log(user)
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.post('/all', (req, res) => {
//     const task = new User(req.body)

//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

//var currentDate = new Date();
//var date='2019-11-31T07:21:28.396084+00:00';

// var date = new Date();
// console.log(date);
// date.setDate(date.getDate() -20);
// console.log(date);
// nextDate=date.setDate(date.getDate()-dat);
// var ll=date.setDate(date.getDate()-dat)
// console.log(ll.now())
//var _id = ObjectID.createFromTime(d.getTime() / 1000);
// console.log(_id)

// var today = new Date();
// var first = today.getDate() - today.getDay();
// var firstDayWeek = new Date(today.setDate(first));
// var lastDayWeek = new Date(today.setDate(first + 6));


// User.aggregate([{
//     $project: {
//         date: {
//             $dateFromString: {
//                 dateString: '$date'
//             }
//         }
//     }
// }, {
//     $match: {
//         "date": {
//             $lt: lastDayWeek,
//             $gt: firstDayWeek
//         }
//     }
// }]).then((user) => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })


    //{Time_Stamp:{gte:currentDate}
//    console.log(req.body())
// User.find({"_created":{"$week":$(new Date(date).toISOString())}}).then((user) => {
            // "_created":{"$gte":new Date(date).toISOString()}}).then((user)

