const router = require("express").Router();
const mongoose = require("mongoose");
let classroom = require("../models/classroom.model");
const CourseMaterial = require("../models/course.material.model");
const StudentSubmission = require("../models/student.submission.model");

router.route("/").get(async (req, res) => {
  try {
    const classrooms = await classroom
      .find()
      .populate("teacher")
      // .populate("course_material") // not working 😥
      .populate("students");
    return res.send({ success: true, data: classrooms });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
});

router.route("/add").post((req, res) => {
  const coursecode = req.body.coursecode;
  const classname = req.body.classname;
  const section = req.body.section;

  const newclassroom = new classroom({
    coursecode,
    classname,
    section,
  });

  newclassroom
    .save()
    .then(() => res.json({ success: true, data: newclassroom }))
    .catch((err) => res.status(400).json({ success: true, msg: err.message }));
});

router.route("/:id").get(async (req, res) => {
  try {
    let doc = await classroom.findById(req.params.id).populate("students");
    const result = await CourseMaterial.findOne({ course: doc._id });
    const studentWork = await StudentSubmission.find({ classRoom: doc._id });
    doc = doc.toObject({});
    doc["course_material"] = result;
    doc["studentSubmission"] = studentWork;
    return res.send({ success: true, data: doc });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
});

router.route("/:id").delete((req, res) => {
  classroom
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(400).json({ success: true, msg: err.message }));
});

router.route("/:id").put(async (req, res) => {
  try {
    let update = {};
    if (req.body.teacherId) {
      update.teacher = req.body.teacherId;
    } else if (req.body.studentId) {
      if (
        await classroom.findOne({
          _id: req.params.id,
          students: mongoose.Types.ObjectId(req.body.studentId),
        })
      ) {
        return res.status(400).json({
          success: false,
          msg: "This Student is already added in this class!",
        });
      }
      update = {
        $push: {
          students: req.body.studentId,
        },
      };
      // update.student = req.body.studentId;
    }

    const clsroom = await classroom.findByIdAndUpdate(req.params.id, update);
    if (clsroom)
      return res.send({ success: true, msg: "classroom updated successfully" });
  } catch (error) {
    res.status(400).json({ success: true, msg: error.message });
  }
  // classroom
  //   .findById(req.params.id)
  //   .then((course) => {
  //     classroom.classid = req.body.classid;
  //     classroom.coursecode = req.body.coursecode;
  //     classroom.classname = req.body.classname;
  //     classroom.section = req.body.section;

  //     classroom
  //       .save()
  //       .then(() => res.json("Classroom updated!"))
  //       .catch((err) => res.status(400).json("Error: " + err));
  //   })
  //   .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
