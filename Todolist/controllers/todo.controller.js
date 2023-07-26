const Todo = require("../models/todo.model");
const catchAsync = require("../utils/catchAsync");
const moment = require("moment");

//create todo list
exports.addTodo = catchAsync(async (req, res, next) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !moment(dueDate, "YYYY-MM-DD").isValid()) {
    return next({
      statusCode: 400,
      message: "Please enter valid data !",
    });
  }
  if (!moment(dueDate).isSameOrAfter(moment().format("YYYY-MM-DD"))) {
    return next({
      statusCode: 400,
      message: "please enter a valid date",
    });
  }
  req.body.userId = req.user;
  const todo = await Todo.create(req.body);
  return res.status(201).json({
    success: true,
    message: "Added todo successfully",
    data: todo,
  });
});

// list todo
exports.listTodo = catchAsync(async (req, res, next) => {
  const { dueDate } = req.query;
  const todos = await Todo.find({
    userId: req.user,
    ...(dueDate && { dueDate }),
  }).sort({ dueDate: 1 });
  if (!todos.length) {
    return next({
      statusCode: 404,
      message: "Data not found!",
    });
  }
  return res.status(200).json({
    success: true,
    data: todos,
    message: "Get todo list successfully",
  });
});

// get todo by id
exports.singleTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next({
      statusCode: 400,
      message: "Id required!",
    });
  }
  const todo = await Todo.findOne({
    userId: req.user,
    _id: id,
  });
  if (!todo) {
    return next({
      statusCode: 404,
      message: "Data not found!",
    });
  }
  return res.status(200).json({
    success: true,
    data: todo,
    message: "Get todo successfully",
  });
});

// update todo by id
exports.updateTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  //   const { dueDate } = req.body;

  if (!id) {
    return next({
      statusCode: 400,
      message: "Id required!",
    });
  }
  let todo = await Todo.findOne({
    userId: req.user,
    _id: id,
  });
  if (!todo) {
    return next({
      statusCode: 404,
      message: "Data not found!",
    });
  }
  todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({
    success: true,
    data: todo,
    message: "update todo successfully",
  });
});

// delete todo by id
exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next({
      statusCode: 400,
      message: "Id required!",
    });
  }
  let todo = await Todo.findOne({
    userId: req.user,
    _id: id,
  });
  if (!todo) {
    return next({
      statusCode: 404,
      message: "Data not found!",
    });
  }
  await Todo.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "remove todo successfully",
  });
});
