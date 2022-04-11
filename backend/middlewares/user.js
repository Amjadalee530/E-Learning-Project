exports.checkAvatar = (req, res, next) => {
  if (!req.file) return next();
  // check if user hasn't provided a photo then go to next middleware of the stack
  if (!req.file.detectedFileExtension.match(/\.(png|jpeg|jpg)$/)) {
    return res.status(404).send({
      success: false,
      msg: "Please upload only png, jpeg and jpg formates.",
    }); // 415 is http status code  for unsupported media type
  }

  next();
};
