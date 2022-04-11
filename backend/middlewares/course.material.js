const Course = require("models/classroom.model");
exports.checkCourse = async (req, res, next) => {
  try {
    if (!(await Course.findById(req.params.courseId))) {
      return res
        .status(404)
        .send({ success: false, msg: "course does not exists" });
    }
    next();
  } catch (error) {
    return res.status(404).send({ success: false, msg: error.message });
  }
};
exports.checkFile = (req, res, next) => {
  if (!req.file)
    return res.status(404).send({
      success: false,
      msg: "File file is required.",
    });
  // check if user hasn't provided a photo then go to next middleware of the stack
  if (!req.file.detectedFileExtension.match(/\.(pdf|pptx|docx)$/)) {
    return res.status(404).send({
      success: false,
      msg: "Please upload only pdf, ppt and word files.",
    }); // 415 is http status code  for unsupported media type
  }
  req.dir = req.file.detectedFileExtension.substr(
    1,
    req.file.detectedFileExtension.length
  );
  next();
};
