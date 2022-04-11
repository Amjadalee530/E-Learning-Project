const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: String,

    qualification: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "teacher" },
  },
  { timestamps: true }
);
teacherSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.password;
  },
});
//================================================================================================================================================
// virtual populate
teacherSchema.virtual("classes", {
  ref: "Classroom",
  foreignField: "teacher",
  localField: "_id",
});
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
