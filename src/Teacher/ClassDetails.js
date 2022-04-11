import React, { useEffect, useState } from "react";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
import TeacherFooter from "./TeacherFooter";
import QuizList from "./QuizList";
import Quizes from "./Quizes";
import AssignmentList from "./AssignmentList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import Material from "./components/Material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Classactivity from "./components/Classactivity";
import axios from "axios";
import Announcements from "./components/Announcements";
import { useHistory } from "react-router";

function ControlledTabs(props) {
  console.log("ControlledTabs=>", props);
  return (
    <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
      <Tab eventKey="activity" title="Assignments ">
        <Classactivity course={props.course} />
      </Tab>
      <Tab eventKey="quizes" title="Quizes ">
        <Quizes course={props.course} />
      </Tab>
      <Tab eventKey="material" title="Lectures ">
        <Material course={props.course} />
      </Tab>
      <Tab eventKey="announcements" title="Announcements">
        <Announcements course={props.course} />
      </Tab>
      <Tab eventKey="people" title="Students Attendance">
        <Attendence course={props.course} studentList={props.studentList} />
      </Tab>
    </Tabs>
  );
}

export default function ClassDetails(props) {
  const history = useHistory();
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();
  const [courseName, setCourseName] = useState("");
  useEffect(() => {
    axios
      .get("/classrooms/" + props.match.params.id)
      .then(({ data: { data } }) => {
        setLoading(true);
        setCourseName(data.coursecode);
        setStudentList(
          data.students
            .map((s) => {
              delete s.password;
              delete s.__v;
              return s;
            })
            .sort((a, b) => a.rollno - b.rollno)
        );
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <div>
        <div class="wrapper ">
          <TeacherSidebar />
          <div class="main-panel">
            <TeacherNavbar name="Create Assignment" />
            {!loading ? (
              <>
                <div class="content">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-2 col-md-2 col-sm-6">
                        <h3>{courseName}</h3>
                      </div>
                      <div class="col-lg-9 col-md-9 col-sm-6">
                        <img
                          src="https://image.shutterstock.com/z/stock-vector-vector-illustration-business-man-study-in-online-course-the-mentor-explain-in-online-class-computer-1496233118.jpg"
                          style={{ height: "200px", width: "300px" }}
                          alt="classroom_image"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <button
                      onClick={() => history.goBack()}
                      className="btn btn-link ml-3"
                    >
                      Go Back
                    </button>
                    <div class="col-lg-12 col-md-12 col-sm-6">
                      <ControlledTabs
                        studentList={studentList}
                        course={course}
                      />
                    </div>
                  </div>
                </div>

                <TeacherFooter />
              </>
            ) : (
              "Loading.."
            )}
          </div>
        </div>
        <div class="fixed-plugin">
          <div class="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown">
              <i class="fa fa-cog fa-2x"> </i>
            </a>
            <ul class="dropdown-menu">
              <li class="header-title"> Sidebar Filters</li>
              <li class="adjustments-line">
                <a
                  href="javascript:void(0)"
                  class="switch-trigger active-color"
                >
                  <div class="badge-colors ml-auto mr-auto">
                    <span
                      class="badge filter badge-purple"
                      data-color="purple"
                    ></span>
                    <span
                      class="badge filter badge-azure"
                      data-color="azure"
                    ></span>
                    <span
                      class="badge filter badge-green"
                      data-color="green"
                    ></span>
                    <span
                      class="badge filter badge-warning"
                      data-color="orange"
                    ></span>
                    <span
                      class="badge filter badge-danger"
                      data-color="danger"
                    ></span>
                    <span
                      class="badge filter badge-rose active"
                      data-color="rose"
                    ></span>
                  </div>
                  <div class="clearfix"></div>
                </a>
              </li>
              <li class="header-title">Images</li>
              <li class="active">
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-1.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-2.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-3.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-4.jpg" alt="" />
                </a>
              </li>
              <li class="button-container">
                <a
                  href="https://www.creative-tim.com/product/material-dashboard"
                  target="_blank"
                  class="btn btn-primary btn-block"
                >
                  Free Download
                </a>
              </li>

              <li class="button-container">
                <a
                  href="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
                  target="_blank"
                  class="btn btn-default btn-block"
                >
                  View Documentation
                </a>
              </li>
              <li class="button-container github-star">
                <a
                  class="github-button"
                  href="https://github.com/creativetimofficial/material-dashboard"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star ntkme/github-buttons on GitHub"
                >
                  Star
                </a>
              </li>
              <li class="header-title">Thank you for 95 shares!</li>
              <li class="button-container text-center">
                <button id="twitter" class="btn btn-round btn-twitter">
                  <i class="fa fa-twitter"></i> &middot; 45
                </button>
                <button id="facebook" class="btn btn-round btn-facebook">
                  <i class="fa fa-facebook-f"></i> &middot; 50
                </button>
                <br></br>
                <br></br>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Attendence(props) {
  const [studentList, setStudentList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [attendanceList, setAttendanceList] = useState([]);
  let [v, setV] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setStudentList(props.studentList);
    setLoading(false);
  }, []);

  const markAttendenceReq = async (attendanceList, cb) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/attendance/mark/" + props.course._id,
        attendanceList
      );
      setStartDate(new Date());
      console.log(data);
      cb();
    } catch (error) {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.msg
      )
        alert(error.response.data.msg);
      else alert(error.message);
    }
  };
  const handleChange = (e, stdId) => {
    setAttendanceList([
      ...attendanceList,
      { attendanceStatus: e.target.value, stdId, v, date: startDate },
    ]);
    setV(v + 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalAttendanceList = [];
    // 1. All absents marking(this will happen will teacher won't select students either PRESENT OR ABSENT)
    if (!attendanceList.length) {
      finalAttendanceList = studentList.map((student) => ({
        stdId: student._id,
        attendanceStatus: "absent",
        date: startDate,
      }));

      await markAttendenceReq(finalAttendanceList, () =>
        alert("Attendence has been marked.")
      );
      return;
    } // stop here.
    //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    // 2. Remove all duplicates
    const filteredArr = attendanceList
      .sort((a, b) => b.v - a.v)
      .reduce((acc, current) => {
        const x = acc.find((item) => item.stdId === current.stdId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
    finalAttendanceList = [...filteredArr];
    //3. check which one of those aren't marked by teacher ? if not marked then make them absent by default
    studentList.forEach((student) => {
      const std = filteredArr.find((s) => s.stdId === student._id);
      if (!std) {
        finalAttendanceList.push({
          stdId: student._id,
          attendanceStatus: "absent",
          date: startDate,
        });
      }
    });
    await markAttendenceReq(finalAttendanceList, () =>
      alert("Attendence has been marked.")
    );
    return;
  };
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title ">Student List </h4>
                <p className="card-category"> Here is a list of all Students</p>
              </div>
              <div style={{ marginTop: "20px" }} className="form-group">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              {loading ? (
                "Loading..."
              ) : (
                <div className="card-body">
                  <div className="table-responsive">
                    <form onSubmit={handleSubmit}>
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>FirstName</th>
                            <th>Last Name</th>
                            <th>Roll No</th>
                            <th>Mark Attendance</th>
                            {/* <th>Username</th> */}
                          </tr>
                        </thead>

                        <tbody>
                          {studentList.map((student, i) => (
                            <tr key={i}>
                              <td>{student.firstname}</td>
                              <td>{student.lastname}</td>
                              <td>{student.rollno}</td>
                              {/* <td>{student.username}</td> */}
                              <td>
                                <select
                                  onChange={(e) => handleChange(e, student._id)}
                                  style={{ padding: "4px" }}
                                >
                                  <option value="absent">ABSENT</option>
                                  <option value="present">PRESENT</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <button
                        style={{
                          cursor: studentList.length
                            ? "pointer"
                            : "not-allowed",
                        }}
                        disabled={!studentList.length}
                        className="btn btn-dark"
                      >
                        Submit Attendence
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// function ShowResult({ tab, studentSubmission }) {
//   console.log("submission", studentSubmission);
//   switch (tab) {
//     case "quiz":
//       return <h1>Quizes</h1>;
//     case "assignment":
//       return (
//         <>
//           <h2 style={{ marginLeft: "400px" }}>Assignments</h2>
//           <table class="table">
//             <thead class=" text-primary">
//               <tr>
//                 <th>RollNo</th>
//                 <th>St.Name</th>
//                 <th>Assignment Title</th>
//                 <th>Assignment</th>
//                 <th>Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {studentSubmission
//                 .sort(
//                   (a, b) =>
//                     new Date(b.assignments.submittedAt) -
//                     new Date(a.assignments.submittedAt)
//                 )
//                 .map((obj, i) => (
//                   <tr key={i}>
//                     <td>{obj.submittedBy.rollno}</td>
//                     <td>
//                       {obj.submittedBy.firstname} {obj.submittedBy.lastname}
//                     </td>
//                     <td>{obj.assignments.assignment.title}</td>
//                     <td>
//                       <a
//                         href={
//                           "http://localhost:5000" +
//                           obj.assignments.assignment.filePath
//                         }
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Download File
//                       </a>
//                     </td>
//                     <td>
//                       {new Date(obj.assignments.assignment.deadline).getTime() <
//                       new Date(obj.assignments.submittedAt).getTime()
//                         ? "Late Submission"
//                         : "On-time submission"}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </>
//       );
//     default:
//       return null;
//   }
// }

// function CategoryTab({ category, onClickHandler, tab }) {
//   return (
//     <div onClick={() => onClickHandler(tab)} className="content">
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-sm-12">
//             <div className="card">
//               <div className="card-header card-header-primary">
//                 <h4 className="card-title ">{category}</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
