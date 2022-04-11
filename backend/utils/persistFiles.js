const { promisify } = require("util");
const fs = require("fs");
const pipeline = promisify(require("stream").pipeline);
exports.persistDocFiles = async (file, dir) => {
  const fileName =
    file.originalName.split(".")[0] +
    Math.floor(Math.random() * 1000) +
    file.detectedFileExtension;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/files/${dir}/${fileName}`)
  );
  return `/files/${dir}/${fileName}`;
};
exports.persistImages = async (file, dir) => {
  const fileName =
    file.originalName.split(".")[0] +
    Math.floor(Math.random() * 1000) +
    file.detectedFileExtension;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/images/${dir}/${fileName}`)
  );
  return `/images/${dir}/${fileName}`;
};
