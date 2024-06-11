//import the CRUD methods from the userController
const router = require("express").Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

//get or post routes to /api/users
router.route("/").get(getUsers).post(createUser);
// get by userId update by userId or delete by userId routes
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);
//route to add or delete a friend
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
