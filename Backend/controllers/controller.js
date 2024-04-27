const customerModel = require('../models/registerModel');
let items = []
exports.login = async (req, res) => {
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
}

exports.register = async (req, res) => {
    customerModel.create(req.body)
        .then(customer => res.json(customer))
        .catch(err => res.status(400).json(err));
}

exports.getHome = async (req, res) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    var today = new Date()
    let day = today.toLocaleDateString("en-US", options)
    res.render("list", { hello: day, newListitem: items })
}

exports.postHome = async (req, res) => {
    let item = req.body.newItems
    items.push({ id: Math.random(), text: item })
    // const filePath = path.join(__dirname, "data.json");
    res.redirect('/')
}