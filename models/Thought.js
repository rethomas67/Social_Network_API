const dayjs = require("dayjs");
const { Schema, model } = require("mongoose");
const dayJS = require("dayjs");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    //username unique and required
    thoughttext: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    //email unique and required
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

function formatDate(createdAt) {
  return dayjs(createdAt).format("MMM DD hh:mm A");
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
