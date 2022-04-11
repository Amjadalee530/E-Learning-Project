const router = require("express").Router();
const bcrypt = require("bcryptjs");
let Student = require("../models/student.model");

router.route("/").get((req, res) => {
  Student.find()
    .then((students) =>
      res.json({
        success: true,
        data: students,
      })
    )
    .catch((err) => res.status(400).json({ success: false, msg: err.message }));
});

router.route("/add").post(async (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const rollno = req.body.rollno;
  const username = req.body.username;
  const password = req.body.password;
  const newStudent = new Student({
    firstname,
    lastname,
    rollno,
    username,
    role: "student",
  });
  newStudent.password = await bcrypt.hash(password, 12);
  newStudent
    .save()
    .then(() => res.send({ success: true, data: newStudent }))
    .catch((err) => res.status(400).send({ success: false, msg: err.message }));
});

router.route("/:id").get((req, res) => {
  Student.findById(req.params.id)
    .populate("classes")
    .populate("attendancess")
    .then((student) => res.send({ success: true, data: student }))
    .catch((err) => res.status(400).send({ success: false, msg: err.message }));
});

router.route("/:id").delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(400).json({ success: false, msg: err.message }));
});

router.route("/update/:id").post((req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      student.firstname = req.body.firstname;
      student.lastname = req.body.lastname;
      student.rollno = req.body.rollno;
      student.email = req.body.email;
      student.password = req.body.password;

      student
        .save()
        .then(() => res.json("Student updated!"))
        .catch((err) =>
          res.status(400).json({ success: false, msg: err.message })
        );
    })
    .catch((err) => res.status(400).json({ success: false, msg: err.message }));
});

module.exports = router;
