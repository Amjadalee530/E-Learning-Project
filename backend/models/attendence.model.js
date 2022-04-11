const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true,
    // unique: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Classroom",
    required: true,
    // unique: true,
  },
  attendanceRecord: [
    {
      attendanceStatus: {
        type: String,
        required: true,
        enum: ["absent", "present"],
      },
      date: Date,
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
