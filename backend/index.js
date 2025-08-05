const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(cors())
app.use(express.json())

const stafflist = [{
    "id": 1,
    "name": "Srimathi",
    "gmail": "srimathi@gmail.com",
    "contact": "1234567890"
},
{
    "id": 2,
    "name": "Janani",
    "gmail": "janani@gmail.com",
    "contact": "1234567890"
},
{
    "id": 3,
    "name": "Saranya",
    "gmail": "saranya@gmail.com",
    "contact": "1234567890"
}]

mongoose.connect("mongodb://127.0.0.1:27017/office").then(function () {
    console.log("Database connected...")
}).catch(function () {
    console.log("Datbase connected failed")
})

const Staff = mongoose.model("Staff",
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: Number, required: true },
    }, "stafflist")



app.get('/staff', function (req, res) {

    Staff.find().then(
        function (data) {
            console.log(data)
            res.send(data)
        })
        .catch(function () {
            console.log("Error")
        })
})

app.post("/staff", function (req, res) {

    var newstaff = req.body

    const newStaff = new Staff(
        {
            id: newstaff.id,
            name: newstaff.name,
            email: newstaff.email,
            contact: newstaff.contact
        }
    )
    newStaff.save().then(function (data) {
        console.log("Saved Successfully " + data)
        res.send(data)
    })
        .catch(function (err) {
            console.log(err)
        })

})

app.get('/read/:id', function (req, res) {

    const Id = parseInt(req.params.id)

    Staff.findOne({ id: Id }).then(
        function (data) {
            if (data) {
                console.log(data)
                res.send(data)
            } else {
                res.send("Staff not found")
            }

        })
        .catch(function () {
            console.log("Error")
        })
})


app.put("/update/:id", function (req, res) {
   const Id = parseInt(req.params.id);
    const { name, email, contact } = req.body

    Staff.findOneAndUpdate(
        { id: Id },
        { name, email, contact },
        { new: true }

    ).then(function(data){
console.log("updated "+ data)
res.send(data)
    })
    .catch(function(err){
        console.log(err)
    })

})

app.delete('/delete/:id',function(req,res)
{
    const Id = parseInt(req.params.id)

    Staff.findOneAndDelete({ id: Id })
    .then(function(data){
        if(data){
  console.log("Deleted Staff "+data)
        res.send(data)
        }else{
            console.log("Staff not found")
        }
      })
      .catch(function(err)
    {
        console.log("Deleted Staff "+ err)
    })
})

app.listen(5000, function () {
    console.log("Server Started...")
})