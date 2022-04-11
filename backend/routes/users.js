const router = require("express").Router();
const upload = require("multer")();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = require("models/Account");
const Student = require("models/student.model");
const Teacher = require("models/teacher.model");
const { persistImages } = require("../utils/persistFiles");
require("dotenv").config();

const generateAuthToken = async (payload) => {
  return jwt.sign(
    {
      id: payload.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "10 days",
    }
  );
};

router.post("/login", async (req, res) => {
  //1) check if email and password is entered
  if (!req.body.username || !req.body.password)
    return res
      .status(404)
      .send({ success: false, msg: "Please provide username and password" });

  //2)  check if user exists and password is correct
  try {
    let account = await Account.findOne({ username: req.body.username });
    if (account && bcrypt.compareSync(req.body.password, account.password)) {
      const token = await generateAuthToken(account);
      return res.send({
        success: true,
        token,
        data: account,
      });
    }
    account = await Student.findOne({ username: req.body.username });
    if (account && bcrypt.compareSync(req.body.password, account.password)) {
      const token = await generateAuthToken(account);
      return res.send({
        success: true,
        token,
        data: account,
      });
    }
    account = await Teacher.findOne({ username: req.body.username });
    if (account && bcrypt.compareSync(req.body.password, account.password)) {
      const token = await generateAuthToken(account);
      return res.send({
        success: true,
        token,
        data: account,
      });
    }
    return res.status(400).send({ success: false, msg: "Invalid credentials" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(404)
      .send({ success: false, msg: "username and password is required." });
  const userExists = await Account.findOne({ role: "admin" });
  if (userExists)
    return res.status(400).send({
      success: false,
      msg: "admin already exists no other admin can be created!",
    });
  try {
    const admin = new Account({
      username,
      password: await bcrypt.hash(password, 12),
      role: "admin",
    });
    await admin.save();
    res.status(201).send({ success: true });
  } catch (e) {
    res.status(400).send({ success: false, msg: e });
  }
});

router.put("/update-me/:id", upload.single("avatar"), async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .send({ success: false, msg: "user id is required" });
    if (!req.body.role)
      return res
        .status(400)
        .send({ success: false, msg: "user role is required" });
    if (req.file) {
      req.body.avatar = await persistImages(req.file, "users");
    }
    switch (req.body.role) {
      case "admin":
        const user = await Account.findByIdAndUpdate(req.params.id, req.body);
        user.password = undefined;
        return res.send({ success: true, data: user });
      case "student":
        const std = await Student.findByIdAndUpdate(req.params.id, req.body);
        std.password = undefined;
        return res.send({ success: true, data: std });
      case "teacher":
        const tchr = await Teacher.findByIdAndUpdate(req.params.id, req.body);
        tchr.password = undefined;
        return res.send({ success: true, data: tchr });
      default:
        return res
          .status(500)
          .send({ success: false, msg: "something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});
router.put("/update-password/:id", async (req, res) => {
  return res.send({ params: req.params, body: req.body });
  try {
    if (!req.params.id)
      return res
        .status(400)
        .send({ success: false, msg: "user id is required" });
    if (!req.body.role)
      return res
        .status(400)
        .send({ success: false, msg: "user role is required" });
    const update = { password: req.body.password };
    switch (req.body.role) {
      case "admin":
        const user = await Account.findOneAndUpdate(
          { _id: req.params.id, password: req.body.currentPassword },
          update
        );
        user.password = undefined;
        return res.send({ success: true, data: user });
      case "student":
        const std = await Student.findOneAndUpdate(
          { _id: req.params.id, password: req.body.currentPassword },
          update
        );
        std.password = undefined;
        return res.send({ success: true, data: std });
      case "teacher":
        const tchr = await Teacher.findOneAndUpdate(
          { _id: req.params.id, password: req.body.currentPassword },
          update
        );
        tchr.password = undefined;
        return res.send({ success: true, data: tchr });
      default:
        return res
          .status(500)
          .send({ success: false, msg: "something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: error.message });
  }
});

module.exports = router;
