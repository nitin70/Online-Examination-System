const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/examDB");
    console.log("DB Connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;