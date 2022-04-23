//  contains name and array of groups
const { Schema, model } = require("mongoose");

const interestSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});

const Interest = model("Interest", interestSchema);

module.exports = Interest;
