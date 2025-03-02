const { Schema, model } = require("mongoose");

const subSectionSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    maxLength: 100,
  },
  timeDuration: {
    type: Date,
  },
  description: {
    type: String,
    minlength: 1,
    maxLength: 500,
  },
  videoUrl: {
    type: String,
  },
});

module.exports = model("SubSection", subSectionSchema);
