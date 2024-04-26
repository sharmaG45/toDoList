const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerModel = require('./models/registerModel');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/CustomerDB")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.post('/register', (req, res) => {
  customerModel.create(req.body)
    .then(customer => res.json(customer))
    .catch(err => res.status(400).json(err));
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    customerModel.findOne({ email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password Incorrect");
                }
            } else {
                res.json("No data existed");
            }
        })
        .catch(err => {
            console.error("Error finding user:", err);
            res.status(500).json("Internal Server Error");
        });
});

let items = []

app.get('/home', (req, res) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    var today = new Date()
    let day = today.toLocaleDateString("en-US", options)
    res.render("list", { hello: day, newListitem: items })
})

app.post('/home', (req, res) => {
    let item = req.body.newItems
    items.push({id:Math.random(),text:item})
    // const filePath = path.join(__dirname, "data.json");
    res.redirect('/')
})


app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
