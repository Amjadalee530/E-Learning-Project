const router = require("express").Router();
const upload = require("multer")();
let StudentSubmission = require("../models/student.submission.model");
let Student = require("../models/student.model");
const { persistDocFiles } = require("../utils/persistFiles");
const { checkFile } = require("../middlewares/course.material");

router.post(
  "/assignment/:classId",
  upload.single("assignment"),
  checkFile,
  async (req, res) => {
    try {
      if (!req.params.classId || !req.body.studentId)
        return res.status(400).send({
          success: false,
          msg: "class,student id is required.",
        });
      const student = await Student.findById(req.body.studentId);
      if (!student)
        return res.status(400).send({
          success: false,
          msg: "Student doesnot exist, something went wrong.",
        });
      // we can query assignment in db here, as well but i left it for now.
      student.password = undefined;
      // const found = await StudentSubmission.findOne({
      //   "submittedBy._id": student._id,
      //   classRoom: req.params.classId,
      // });
      // if (found) {
      //   found.assignments.push({
      //     assignment: JSON.parse(req.body.assignmentObject),
      //     assignmentPath: await persistDocFiles(
      //       req.file,
      //       "student.assignments"
      //     ),
      //   });
      //   await found.save();
      //   return res.sendStatus(201);
      // }
      // const doc = new StudentSubmission();
      // doc.submittedBy = student;
      // doc.classRoom = req.params.classId;
      // doc.assignments.push({
      //   assignment: JSON.parse(req.body.assignmentObject),
      //   assignmentPath: await persistDocFiles(req.file, "student.assignments"),
      // });
      const doc = new StudentSubmission();
      doc.submittedBy = student;
      doc.classRoom = req.params.classId;
      doc.assignments.assignment = JSON.parse(req.body.assignmentObject);
      doc.assignmentPath = await persistDocFiles(
        req.file,
        "student.assignments"
      );
      doc.assignments.submittedAt = new Date();

      await doc.save();
      res.sendStatus(201);
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  }
);
// router.post(
//   "/quiz/:classId",
//   upload.single("quiz"),
//   checkFile,
//   async (req, res) => {
//     try {
//       if (!req.params.classId || !req.body.studentId)
//         return res.status(400).send({
//           success: false,
//           msg: "class,student id is required.",
//         });
//       const student = await Student.findById(req.body.studentId);
//       if (!student)
//         return res.status(400).send({
//           success: false,
//           msg: "Student doesnot exist, something went wrong.",
//         });
//       // we can query assignment in db here, as well but i left it for now.
//       student.password = undefined;
//       // const found = await StudentSubmission.findOne({
//       //   "submittedBy._id": student._id,
//       //   classRoom: req.params.classId,
//       // });
//       // if (found) {
//       //   found.assignments.push({
//       //     assignment: JSON.parse(req.body.assignmentObject),
//       //     assignmentPath: await persistDocFiles(
//       //       req.file,
//       //       "student.assignments"
//       //     ),
//       //   });
//       //   await found.save();
//       //   return res.sendStatus(201);
//       // }
//       // const doc = new StudentSubmission();
//       // doc.submittedBy = student;
//       // doc.classRoom = req.params.classId;
//       // doc.assignments.push({
//       //   assignment: JSON.parse(req.body.assignmentObject),
//       //   assignmentPath: await persistDocFiles(req.file, "student.assignments"),
//       // });
//       const doc = new StudentSubmission();
//       doc.submittedBy = student;
//       doc.classRoom = req.params.classId;
//       doc.quizes.quiz = JSON.parse(req.body.quizObject);
//       doc.quizPath = await persistDocFiles(req.file, "student.quizes");
//       doc.quizes.submittedAt = new Date();
//       await doc.save();
//       res.sendStatus(201);
//     } catch (error) {
//       res.status(500).send({ success: false, msg: error.message });
//     }
//   }
// );
module.exports = router;
