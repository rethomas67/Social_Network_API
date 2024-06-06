const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //username unique and required
    username: {
      type: String,
      unique: true,
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
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
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

userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model("user", userSchema);

module.exports = User;
