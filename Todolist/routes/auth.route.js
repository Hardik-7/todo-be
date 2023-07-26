const router = require("express").Router();

// import controllers
const { signup, signin } = require("../controllers/auth.controller");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;
