const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("todo", todoSchema);
module.exports = Todo;
