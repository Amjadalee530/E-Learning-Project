import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import TeacherFooter from "./TeacherFooter";
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";

const ShowStudentSubmission = (props) => {
  const history = useHistory();
  const location = useLocation();
  // console.log("Show Std Assginment", location.search.split("=")[1]);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({});
  useEffect(() => {
    axios
      .get("/classrooms/" + props.match.params.id)
      .then(({ data: { data: _data } }) => {
        setLoading(true);
        setPayload(_data);
        setLoading(false);
      })
      .catch((err) => {
        if (err?.response?.data?.msg) alert(err.response.data.msg);
        else alert(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="wrapper ">
        <TeacherSidebar />
        <div className="main-panel">
          <TeacherNavbar name="Student Assignments List" />
          {!loading ? (
            <>
              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-6">
                      <h3>{payload.coursecode}</h3>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-6">
                      <img
                        src="http://localhost:3000/sidebar-3.jpg"
                        style={{ height: "200px", width: "300px" }}
                        alt="classNameroom_image"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <button
                    onClick={() => history.goBack()}
                    className="btn btn-link ml-3"
                  >
                    Go Back
                  </button>
                  <div className="col-lg-12 col-md-12 col-sm-6">
                    <StudentAssignmentList
                      courseId={props.match.params.id}
                      list={payload.studentSubmission || []}
                      assId={location.search.split("=")[1]}
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
      <div className="fixed-plugin">
        <div className="dropdown show-dropdown">
          <a href="#" data-toggle="dropdown">
            <i className="fa fa-cog fa-2x"> </i>
          </a>
          <ul className="dropdown-menu">
            <li className="header-title"> Sidebar Filters</li>
            <li className="adjustments-line">
              <a
                href="javascript:void(0)"
                className="switch-trigger active-color"
              >
                <div className="badge-colors ml-auto mr-auto">
                  <span
                    className="badge filter badge-purple"
                    data-color="purple"
                  ></span>
                  <span
                    className="badge filter badge-azure"
                    data-color="azure"
                  ></span>
                  <span
                    className="badge filter badge-green"
                    data-color="green"
                  ></span>
                  <span
                    className="badge filter badge-warning"
                    data-color="orange"
                  ></span>
                  <span
                    className="badge filter badge-danger"
                    data-color="danger"
                  ></span>
                  <span
                    className="badge filter badge-rose active"
                    data-color="rose"
                  ></span>
                </div>
                <div className="clearfix"></div>
              </a>
            </li>
            <li className="header-title">Images</li>
            <li className="active">
              <a
                className="img-holder switch-trigger"
                href="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-1.jpg" alt="" />
              </a>
            </li>
            <li>
              <a
                className="img-holder switch-trigger"
                href="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-2.jpg" alt="" />
              </a>
            </li>
            <li>
              <a
                className="img-holder switch-trigger"
                href="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-3.jpg" alt="" />
              </a>
            </li>
            <li>
              <a
                className="img-holder switch-trigger"
                href="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-4.jpg" alt="" />
              </a>
            </li>
            <li className="button-container">
              <a
                href="https://www.creative-tim.com/product/material-dashboard"
                target="_blank"
                className="btn btn-primary btn-block"
              >
                Free Download
              </a>
            </li>

            <li className="button-container">
              <a
                href="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
                target="_blank"
                className="btn btn-default btn-block"
              >
                View Documentation
              </a>
            </li>
            <li className="button-container github-star">
              <a
                className="github-button"
                href="https://github.com/creativetimofficial/material-dashboard"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star ntkme/github-buttons on GitHub"
              >
                Star
              </a>
            </li>
            <li className="header-title">Thank you for 95 shares!</li>
            <li className="button-container text-center">
              <button id="twitter" className="btn btn-round btn-twitter">
                <i className="fa fa-twitter"></i> &middot; 45
              </button>
              <button id="facebook" className="btn btn-round btn-facebook">
                <i className="fa fa-facebook-f"></i> &middot; 50
              </button>
              <br></br>
              <br></br>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

function StudentAssignmentList({ list, assId, courseId }) {
  const [ass, setAss] = useState([]);
  const [obtainMarks, setObtainMarks] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (list && list.length) {
      setAss(
        list.filter(
          (a) => a.assignments && a.assignments.assignment._id === assId
        )
      );
    }
    setLoading(false);
  }, []);
  const handleSubmit = (e, assignmentObject, student) => {
    e.preventDefault();
    if (!obtainMarks || obtainMarks < 0)
      return alert(
        "Obtain Marks should not be less than 0.(Minimum value is 0)"
      );
    if (!obtainMarks || obtainMarks > assignmentObject.totalMarks)
      return alert(
        "Obtain Marks should not be greater than Total Marks.(" +
          assignmentObject.totalMarks +
          ")"
      );
    const body = {};
    body["course"] = {
      courseId,
      obtainMarks,
      studentId: student._id,
      title: assignmentObject.title,
      totalMarks: assignmentObject.totalMarks,
    };
    axios
      .post("http://localhost:5000/grades", body)
      .then((res) => {
        if (res.status === 201) {
          alert("Marks submitted successfully");
          document.getElementById("obtainMarks").value = "";
          setObtainMarks();
        }
      })
      .catch((er) =>
        er?.response?.data?.msg
          ? alert(er.response.data.msg)
          : alert(er.message)
      );
  };
  return loading ? (
    "Loading..."
  ) : (
    <>
      {/* <h2 style={{ marginLeft: "300px" }}>Assignments</h2> */}
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-sm-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Assignment List </h4>
                  <p class="card-category">
                    Here is a list of all Assignments Submitted
                  </p>
                </div>
                {ass.length ? (
                  <table class="table">
                    <thead class=" text-primary">
                      <tr>
                        <th>RollNo</th>
                        <th>St.Name</th>
                        <th>Assignment Title</th>
                        <th>Assignment</th>
                        <th>Status</th>
                        <th>Obtain Marks</th>
                        <th>Total Marks</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {ass
                        .sort(
                          (a, b) =>
                            new Date(b.assignments.submittedAt) -
                            new Date(a.assignments.submittedAt)
                        )
                        .map((obj, i) => (
                          <tr key={i}>
                            <td>{obj.submittedBy.rollno}</td>
                            <td>
                              {obj.submittedBy.firstname}{" "}
                              {obj.submittedBy.lastname}
                            </td>
                            <td>{obj.assignments.assignment.title}</td>
                            <td>
                              <a
                                href={
                                  "http://localhost:5000" +
                                  obj.assignments.assignment.filePath
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download File
                              </a>
                            </td>
                            <td>
                              {new Date(
                                obj.assignments.assignment.deadline
                              ).getTime() <
                              new Date(obj.assignments.submittedAt).getTime()
                                ? "Late Submission"
                                : "On-time submission"}
                            </td>
                            <td>
                              <input
                                id="obtainMarks"
                                type="number"
                                min="0"
                                max={obj.assignments.assignment.totalMarks}
                                onChange={(e) => setObtainMarks(e.target.value)}
                              />
                            </td>
                            <td>{obj.assignments.assignment.totalMarks}</td>
                            <td>
                              <button
                                type="submit"
                                onClick={(e) =>
                                  handleSubmit(
                                    e,
                                    obj.assignments.assignment,
                                    obj.submittedBy
                                  )
                                }
                                className="btn btn-outline-success"
                              >
                                Submit Marks
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  "No Assignments Submitted yet"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowStudentSubmission;
