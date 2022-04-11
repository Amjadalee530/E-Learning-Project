const router = require("express").Router();
const bcrypt = require("bcryptjs");
let Teacher = require("../models/teacher.model");

router.route("/").get((req, res) => {
  Teacher.find()
    .then((teachers) =>
      res.json({
        success: true,
        data: teachers,
      })
    )
    .catch((err) => res.status(400).json({ success: false, msg: err.message }));
});

router.route("/add").post(async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const qualification = req.body.qualification;
  const department = req.body.department;
  const password = req.body.password;
  const newTeacher = new Teacher({
    firstname,
    lastname,
    username,
    qualification,
    department,
    role: "teacher",
  });
  newTeacher.password = await bcrypt.hash(password, 12);
  newTeacher
    .save()
    .then(() => res.json({ success: true, data: newTeacher }))
    .catch((err) => res.status(400).json({ success: false, msg: err.message }));
});

router.route("/:id").get((req, res) => {
  Teacher.findById(req.params.id)
    .populate("classes")
    .then((teacher) => res.send({ success: true, data: teacher }))
    .catch((err) => res.status(400).send({ success: false, msg: err.message }));
});

router.route("/:id").delete((req, res) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then(() => res.json("Teacher deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Teacher.findById(req.params.id)
    .then((teacher) => {
      teacher.firstname = req.body.firstname;
      teacher.lastname = req.body.lastname;
      teacher.email = req.body.email;
      teacher.qualification = req.body.qualification;
      teacher.department = req.body.department;
      teacher.password = req.body.password;

      teacher
        .save()
        .then(() => res.json("Teacher updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
