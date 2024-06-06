const router = require("express").Router();
const {
  createThought,
  /*getUsers,
  getUser,
  updateUser,
  deleteUser,*/
} = require("../../controllers/thoughtController");

router.route("/").post(createThought);
//router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
