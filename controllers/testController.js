const { ObjectId } = require("mongoose").Types;
const { Test } = require("../models");

module.exports = {
  async createTest(req, res) {
    try {
      console.log(req.body);
      const test = await Test.create(req.body);
      res.json(test);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
