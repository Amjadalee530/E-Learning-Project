const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseMaterialSchema = new Schema({
  course: { type: mongoose.Types.ObjectId, required: true, ref: "Classroom" },
  lectures: [
    {
      title: String,
      createdAt: { type: Date, default: Date.now },
      filePath: String,
    },
  ],
  quizes: [
    {
      title: String,
      link: String,
      deadline: {
        type: Date,
        required: [true, "quiz should have a deadline."],
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  announcements: [
    {
      title: String,
      description: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  assignments: [
    {
      title: String,
      deadline: {
        type: Date,
        required: [true, "assignment should have a deadline."],
      },
      totalMarks: {
        type: Number,
        // required: [true, "assignment should have total marks."],
      },
      createdAt: { type: Date, default: Date.now },
      filePath: String,
    },
  ],
});

const Course = mongoose.model("CourseMaterial", courseMaterialSchema);

module.exports = Course;
