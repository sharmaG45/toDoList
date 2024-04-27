const dbConfig=require('../configs/mongoose.js')
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.Products = require("./registerModel.js")(mongoose);

module.exports = db;