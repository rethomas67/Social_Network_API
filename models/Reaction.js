const dayjs = require("dayjs");
const { Schema, Types } = require("mongoose");
dayJS = require("dayjs");

const assignmentSchema = new Schema(
  {
    //username unique and required
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLengt: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    //email unique and required
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function formatDate(createdAt) {
  return dayjs(createdAt).format("MMM DD hh:mm A");
}

module.exports = assignmentSchema;
