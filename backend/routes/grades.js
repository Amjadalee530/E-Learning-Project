const router = require("express").Router();
const Grades = require("../models/grades.model");

router.get("/:courseId/:stdId", async (req, res) => {
  try {
    console.log(req.params);
    const docs = await Grades.find({
      "course.courseId": req.params.courseId,
      "course.studentId": req.params.stdId,
    });
    res.send({ success: true, data: docs });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.course)
      return res
        .status(404)
        .send({ success: false, msg: "course object is required for grades." });
    await Grades.findOneAndUpdate(
      {
        "course.courseId": req.body.course.courseId,
        "course.studentId": req.body.course.studentId,
        "course.title": req.body.course.title,
        "course.totalMarks": req.body.course.totalMarks,
      },
      { "course.obtainMarks": req.body.course.obtainMarks },
      { upsert: true }
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

module.exports = router;
