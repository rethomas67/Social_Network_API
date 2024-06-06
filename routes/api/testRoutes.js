const router = require("express").Router();
const { createTest } = require("../../controllers/testController");

router.route("/").post(createTest);

module.exports = router;
