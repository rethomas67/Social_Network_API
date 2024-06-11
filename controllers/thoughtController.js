const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  //return all thoughts as json
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //get a thought by id and return the json response
  async getThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //post a thought to mongo
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      //get the userId and push the thought_id to the user model
      const user = await User.findByIdAndUpdate(
        req.body.userid,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true }
      );
      return res.status(200).json({ thought, user });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a thought
  async updateThought(req, res) {
    try {
      //filter by the requests id parameter and update the data with the body
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //remove a thougth
  async deleteThought(req, res) {
    //filter by the thought_id and remove it from the model
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //add reactions to the reactions column
  async addReaction(req, res) {
    try {
      //filters by thought_id then appends to the reaction schema a new reaction
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //remove a reaction
  async deleteReaction(req, res) {
    try {
      //filter by thought_id, then pulls or removes the reaction by reactionid
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
