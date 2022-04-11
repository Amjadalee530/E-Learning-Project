require("rootpath")();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const studentsRouter = require("./routes/students");
const teachersRouter = require("./routes/teachers");
const courseMaterialRouter = require("./routes/course.material");
const classroomsRouter = require("./routes/classrooms");
const studentSubmitRouter = require("./routes/student.submission");
const usersRouter = require("./routes/users");
const attendenceRouter = require("./routes/attendence");
const gradesRouter = require("./routes/grades");

app.use("/students", studentsRouter);
app.use("/teachers", teachersRouter);
app.use("/course-material", courseMaterialRouter);
app.use("/classrooms", classroomsRouter);
app.use("/student-submit", studentSubmitRouter);
app.use("/users", usersRouter);
app.use("/attendance", attendenceRouter);
app.use("/grades", gradesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
