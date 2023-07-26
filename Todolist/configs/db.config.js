const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const dbConnect = () => {
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
    })
    .then(() => console.log("db connected"));
};

module.exports = dbConnect;
