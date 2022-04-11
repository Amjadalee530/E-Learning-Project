const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  rollno: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  avatar: String,
  password: { type: String, required: true },
  role: { type: String, default: "student" },
});
studentSchema.set(
  "toJSON",
  {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.password;
    },
  },
  { timestamps: true }
);
//================================================================================================================================================
// virtual populate
studentSchema.virtual("classes", {
  ref: "Classroom",
  foreignField: "students",
  localField: "_id",
});
// virtual populate
studentSchema.virtual("attendances", {
  ref: "Attendance",
  foreignField: "student",
  localField: "_id",
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
