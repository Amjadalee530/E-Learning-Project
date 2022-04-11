const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classroomSchema = new Schema({
  coursecode: { type: String, required: true },
  classname: { type: String, required: true },
  section: { type: String, required: true },
  teacher: { type: mongoose.Types.ObjectId, ref: "Teacher" },
  students: [{ type: mongoose.Types.ObjectId, ref: "Student" }],
});
//================================================================================================================================================
// virtual populate
classroomSchema.virtual("result", {
  ref: "StudentSubmission",
  foreignField: "classRoom",
  localField: "_id",
});
const Class = mongoose.model("Classroom", classroomSchema);

module.exports = Class;
