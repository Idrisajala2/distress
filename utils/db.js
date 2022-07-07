const mongoose = require("mongoose");
const url = "mongodb://localhost/Distress";
const url1 =
  "mongodb+srv://idrisolas:Kendrick12@cluster0.ustoh.mongodb.net/disApp?retryWrites=true&w=majority";

mongoose.connect(url1).then(() => {
  console.log("database is now connected...!");
});

module.exports = mongoose;
