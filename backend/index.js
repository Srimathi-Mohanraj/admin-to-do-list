const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config();

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


const mongoURI = process.env.MONGO_URI;
console.log("Connecting to MongoDB:", mongoURI?.slice(0, 25)); // debug line

mongoose.connect(mongoURI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB Atlas Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    if (err.message.includes("ENOTFOUND")) {
      console.log("⚠️ Check your internet, cluster hostname, or try non-SRV string.");
    }
  });


const Staff = mongoose.model("Staff",
    {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        contact: { type: Number, required: true },
    }, "staff")



app.get('/api/staff', function (req, res) {
  Staff.find()
    .then(function (data) {
      console.log(data)
      res.json(data)
    })
    .catch(function (err) {
      console.error("Error fetching staff:", err)
      res.status(500).json({ error: 'Server error' })
    })
})


app.post('/api/staff', function (req, res) {
  var newstaff = req.body

  const newStaff = new Staff({
    id: newstaff.id,
    name: newstaff.name,
    email: newstaff.email,
    contact: newstaff.contact
  })

  newStaff.save()
    .then(function (data) {
      console.log("Saved Successfully", data)
      res.status(201).json(data)
    })
    .catch(function (err) {
      console.error("Save failed:", err)
      res.status(500).json({ error: 'Save failed' })
    })
})


app.get('/api/staff/:id', async function (req, res) {
  const id = req.params.id;
  try {
    
    let doc = null;
    try {
      doc = await Staff.findById(id);
    } catch (e) {
   
    }

   
    if (!doc) {
      const numericId = parseInt(id, 10);
      if (!Number.isNaN(numericId)) {
        doc = await Staff.findOne({ id: numericId });
      }
    }

    if (!doc) return res.status(404).json({ error: 'Staff not found' });
    return res.json(doc);
  } catch (err) {
    console.error('Read single staff failed:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});




app.put('/api/staff/:id', async function (req, res) {
  const id = req.params.id;
  const { name, email, contact } = req.body;

  try {
  
    let updated = null;
    try {
      updated = await Staff.findByIdAndUpdate(id, { name, email, contact }, { new: true });
    } catch (e) {
     
    }

    if (!updated) {
      const numericId = parseInt(id, 10);
      if (!Number.isNaN(numericId)) {
        updated = await Staff.findOneAndUpdate({ id: numericId }, { name, email, contact }, { new: true });
      }
    }

    if (!updated) return res.status(404).json({ error: 'Staff not found' });
    return res.json(updated);
  } catch (err) {
    console.error('Update failed:', err);
    return res.status(500).json({ error: 'Update failed' });
  }
});


// DELETE 
app.delete('/api/staff/:id', async function (req, res) {
  const id = req.params.id;

  try {
   
    const deleted = await Staff.findByIdAndDelete(id);

    if (deleted) {
      console.log('Deleted Staff', deleted);
      return res.json(deleted);
    }

  
    const numericId = parseInt(id, 10);
    if (!Number.isNaN(numericId)) {
      const deletedByNumeric = await Staff.findOneAndDelete({ id: numericId });
      if (deletedByNumeric) {
        console.log('Deleted Staff by numeric id', deletedByNumeric);
        return res.json(deletedByNumeric);
      }
    }

   
    res.status(404).json({ error: 'Staff not found' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
