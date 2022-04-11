const router = require("express").Router();
const CourseMaterial = require("models/course.material.model");
const { checkCourse, checkFile } = require("../middlewares/course.material");
const { persistDocFiles } = require("../utils/persistFiles");
const upload = require("multer")();

router.get("/:courseId", async (req, res) => {
  try {
    const courseMaterial = await CourseMaterial.findById(
      req.params.courseId
    ).populate("course");
    return res.send({ success: true, data: courseMaterial });
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

router.post(
  "/upload-lecture/:courseId",
  upload.single("lecture"),
  checkCourse,
  checkFile,
  async (req, res) => {
    try {
      if (!req.body.title)
        return res
          .status(404)
          .send({ success: false, msg: "lecture title is required" });
      const courseMaterial = await CourseMaterial.findOne({
        course: req.params.courseId,
      });
      //
      if (!courseMaterial) {
        const newDoc = new CourseMaterial();
        newDoc.course = req.params.courseId;
        newDoc.lectures.push({
          title: req.body.title,
          filePath: await persistDocFiles(req.file, req.dir),
        });
        const c = await newDoc.save();
        return res.send({ success: true, data: c });
      } else {
        courseMaterial.lectures.push({
          title: req.body.title,
          filePath: await persistDocFiles(req.file, req.dir),
        });
      }
      const c = await courseMaterial.save();
      return res.send({ success: true, data: c });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  }
);
router.post(
  "/upload-assignment/:courseId",
  upload.single("assignment"),
  checkCourse,
  checkFile,
  async (req, res) => {
    console.log(req.body);
    try {
      if (!req.body.title || !req.body.deadline || !req.body.totalMarks)
        return res.status(404).send({
          success: false,
          msg: "assignment title,deadline and total marks are required",
        });
      const courseMaterial = await CourseMaterial.findOne({
        course: req.params.courseId,
      });
      //
      // const today = new Date();
      const deadline = req.body.deadline;
      //  new Date(
      //   today.setDate(today.getDate() + parseInt(req.body.deadline))
      // );
      if (!courseMaterial) {
        const newDoc = new CourseMaterial();
        newDoc.course = req.params.courseId;
        newDoc.assignments.push({
          title: req.body.title,
          totalMarks: parseInt(req.body.totalMarks),
          deadline,
          filePath: await persistDocFiles(req.file, req.dir),
        });
        const c = await newDoc.save();
        return res.send({ success: true, data: c });
      } else {
        courseMaterial.assignments.push({
          title: req.body.title,
          totalMarks: parseInt(req.body.totalMarks),
          deadline,
          filePath: await persistDocFiles(req.file, req.dir),
        });
      }
      const c = await courseMaterial.save();
      return res.send({ success: true, data: c });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  }
);
router.post(
  "/upload-quiz/:courseId",
  // upload.single("quiz"),
  checkCourse,
  // checkFile,
  async (req, res) => {
    console.log(req.body);
    try {
      if (!req.body.title || !req.body.deadline || !req.body.link)
        return res.status(404).send({
          success: false,
          msg: "quiz title,deadline is required",
        });
      const courseMaterial = await CourseMaterial.findOne({
        course: req.params.courseId,
      });
      //
      const deadline = req.body.deadline;
      if (!courseMaterial) {
        const newDoc = new CourseMaterial();
        newDoc.course = req.params.courseId;
        newDoc.quizes.push({
          title: req.body.title,
          deadline,
          link: req.body.link,
        });
        const c = await newDoc.save();
        return res.send({ success: true, data: c });
      } else {
        courseMaterial.quizes.push({
          title: req.body.title,
          deadline,
          link: req.body.link,
        });
      }
      const c = await courseMaterial.save();
      return res.send({ success: true, data: c });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  }
);
router.post(
  "/upload-announcements/:courseId",
  // upload.single("quiz"),
  checkCourse,
  // checkFile,
  async (req, res) => {
    try {
      if (!req.body.title || !req.body.description)
        return res.status(404).send({
          success: false,
          msg: "announcement title,description is required",
        });
      const courseMaterial = await CourseMaterial.findOne({
        course: req.params.courseId,
      });

      if (!courseMaterial) {
        const newDoc = new CourseMaterial();
        newDoc.course = req.params.courseId;
        newDoc.announcements.push({
          title: req.body.title,
          description: req.body.description,
        });
        const c = await newDoc.save();
        return res.send({ success: true, data: c });
      } else {
        courseMaterial.announcements.push({
          title: req.body.title,
          description: req.body.description,
        });
      }
      const c = await courseMaterial.save();
      return res.send({ success: true, data: c });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  }
);

module.exports = router;
