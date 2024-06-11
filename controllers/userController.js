const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  //get all users
  async getUsers(req, res) {
    //get the users and return the json result
    try {
      const users = await User.find();
      const userObj = {
        users,
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //get user by id
  async getUser(req, res) {
    //get a user by the request paramter user_id and return the json result
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //add a new user
  async createUser(req, res) {
    //add the contents of the request body to a new record
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a user
  async updateUser(req, res) {
    try {
      //filter by the user_Id and update the user record with the content in the request body
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      //filter by the user_id parameter and remove the record
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //a self join to the user model. Adds another user as a friend
  async addFriend(req, res) {
    try {
      //filters by user_id parameter and adds a friend by the friend_id parameter
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  //delete a friend
  async deleteFriend(req, res) {
    try {
      //filters by the user_id parameter and removes by the friend_id parameter
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.status(200).json(friend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
