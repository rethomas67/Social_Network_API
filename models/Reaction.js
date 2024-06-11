//import the dayjs for formatting dates
const dayjs = require("dayjs");
//pull in mongoose to handle mongo nosql operations
const { Schema, Types } = require("mongoose");

//create the reaction schema
const reactionSchema = new Schema(
  {
    // rectionId type is a unique hex identifier
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    //the reaction text with a max length of 280 and required
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    //user name of reaction creator, required
    userName: {
      type: String,
      required: true,
    },
    //the reaction creation date.  Uses a getter function formatDate to allow dayjs to format the date
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

module.exports = reactionSchema;
