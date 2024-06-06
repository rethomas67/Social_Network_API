const { Schema, model } = require("mongoose");

const testSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
      maxLength: 25,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const Test = model("test", testSchema);

module.exports = Test;
