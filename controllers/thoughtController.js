const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
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
  async createThought(req, res) {
    try {
      console.log(req.body.userid);
      const thought = await Thought.create(req.body);
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

  async updateThought(req, res) {
    try {
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
  async deleteThought(req, res) {
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
};
