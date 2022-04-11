const router = require("express").Router();
let Attendance = require("../models/attendence.model");

router.get("/:courseId/:stdId", async (req, res) => {
  if (!req.params.courseId || !req.params.stdId)
    return res.status(400).send("course id, student id is required");
  try {
    const list = await Attendance.findOne({
      course: req.params.courseId,
      student: req.params.stdId,
    });
    res.send({ success: true, data: list });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
});

router.post("/mark/:courseId", async (req, res) => {
  try {
    // req.body = [
    //   { stdId: 1, status: "absent" }, // old student
    //   { stdId: 2, status: "absent" }, // old student
    //   { stdId: 3, status: "absent" }, // new student
    // ];

    // list = [{ _id: 1 }, { _id: 2 }];
    if (!req.params.courseId)
      return res.status(400).send("course id is required");

    const list = await Attendance.find({ course: req.params.courseId });
    console.log(req.body);
    if (list.length) {
      req.body.forEach(async (att) => {
        const student = list.findIndex((a) => a.student + "" === att.stdId);

        if (student > -1) {
          list[student].attendanceRecord.push({
            attendanceStatus: att.attendanceStatus,
            date: att.date,
          });
          await list[student].save();
        } else {
          const d = new Attendance();
          d.student = att.stdId;
          d.course = req.params.courseId;
          d.attendanceRecord.push({
            attendanceStatus: att.attendanceStatus,
            date: att.date,
          });
          await d.save();
        }
      });
    } else {
      req.body.forEach(async (att) => {
        const d = new Attendance();
        d.student = att.stdId;
        d.course = req.params.courseId;
        d.attendanceRecord.push({
          attendanceStatus: att.attendanceStatus,
          date: att.date,
        });
        await d.save();
      });
    }
    res.send({ success: true, attendenceOf: new Date() });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
  }
});

module.exports = router;
