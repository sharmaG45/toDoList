const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = require('./models')
db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch(error => {
  console.error("MongoDB connection error:", error);
});

require('./routes/route')(app)

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
