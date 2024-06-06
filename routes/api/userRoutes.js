const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getUser);

module.exports = router;
