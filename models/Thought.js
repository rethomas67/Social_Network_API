const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    //username unique and required
    thoughtText: {
      type: String,
      required: true,
      trim: true,
    },
    //email unique and required
    email: {
      type: String,
      unique: true,
      required: true,
      //validate the email with regex
      match: [
        /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9+.-]+\.([a-zA-Z]{2,5})$/,
        "Email is not valid!",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
