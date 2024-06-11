const router = require("express").Router();
//import the CRUD methods from the thoughtController
const {
  createThought,
  getThoughts,
  getThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

//get or post routes to /api/thoughts
router.route("/").get(getThoughts).post(createThought);
// get by thoughtId update by thoughtId or delete by thoughtId routes
// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

//route to add a reaction
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);
//route to delete a reaction
// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
