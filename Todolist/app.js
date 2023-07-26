const express = require("express");
const app = express();
const errorHander = require("./middlewares/errorhander");

//
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// import routes
const userRoutes = require("./routes/auth.route");
const todoRoutes = require("./routes/todo.routes");

app.use("/api/v1", userRoutes);
app.use("/api/v1", todoRoutes);

// gobal error handle
app.use(errorHander);

module.exports = app;
