const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gradesSchema = new Schema(
  {
    course: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grades", gradesSchema);
