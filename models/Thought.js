//import dayjs, mongoose, and the reaction schema
const dayjs = require("dayjs");
const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

//create the thoughtSchema
const thoughtSchema = new Schema(
  {
    //thought text is a required string between 1 and 280 characters
    thoughttext: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    //creation date which uses the getter function for dayjs to format the date
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    //required username for person who created the thought
    username: {
      type: String,
      required: true,
    },
    //display the reactions from the imported reaction schema
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

//format the date for the getter method
function formatDate(createdAt) {
  return dayjs(createdAt).format("MMM DD hh:mm A");
}

//create the model
const Thought = model("thought", thoughtSchema);
//export the module to the app
module.exports = Thought;
