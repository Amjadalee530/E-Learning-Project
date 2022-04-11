const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// classRoom:ClassroomObject || only class/course id will be enough,
const studentSubmissionSchema = new Schema({
  submittedBy: { type: Object, required: true },
  classRoom: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Classroom",
  },
  assignments: {
    assignment: { type: Object },
    assignmentPath: String,
    submittedAt: { type: Date },
  },
  // quizes: {
  //   quiz: { type: Object },
  //   quizPath: String,
  //   submittedAt: { type: Date },
  // },
});

const Class = mongoose.model("StudentSubmission", studentSubmissionSchema);

module.exports = Class;
