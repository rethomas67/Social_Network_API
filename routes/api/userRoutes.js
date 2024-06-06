const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
