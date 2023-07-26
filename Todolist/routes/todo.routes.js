const router = require("express").Router();
const { checkAuth } = require("../middlewares/auth");

const {
  addTodo,
  listTodo,
  singleTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo.controller");

// check auth
router.use(checkAuth);

router.route("/todo").post(addTodo);

router.route("/todos").get(listTodo);

router.route("/todo/:id").get(singleTodo).patch(updateTodo).delete(deleteTodo);

module.exports = router;
