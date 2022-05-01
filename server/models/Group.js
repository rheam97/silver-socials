// constains name, description, users (memmbers), and posts
//  contains name and array of groups
const { Schema, model } = require("mongoose");

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
  },
  image: {
    type: String
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      }
  ]
});

const Group = model("Group", groupSchema);

module.exports = Group;
