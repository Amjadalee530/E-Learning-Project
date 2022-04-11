import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import StudentMaterial from "./StudentMaterial";
import QuizTable from "./QuizTable";
import AssignmentTable from "./AssignmentTable";
import "../Admin/form.css";
import Attendance from "./Attendance";
import { Link, useHistory } from "react-router-dom";
import AcademinRecord from "./AcademicRecord";
function ControlledTabs(props) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (props?.course) {
      setLoading(false);
    } else setLoading(true);
  }, []);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
        <Tab eventKey="activity" title="Assignments ">
          <AssignmentTable assignments={props.course} />
        </Tab>
        <Tab eventKey="quizes" title="Quizes ">
          <QuizTable quizes={props.course} />
        </Tab>
        <Tab eventKey="material" title="Lectures ">
          <StudentMaterial course={props.course} />
        </Tab>
        <Tab eventKey="Announcements" title="Announcements ">
          <Announcements course={props.course} />
        </Tab>
        <Tab eventKey="Attendance" title="Attendance ">
          <Attendance course={props.course} />
        </Tab>
        <Tab eventKey="Academic Record" title="Academic Record ">
          <AcademinRecord course={props.course} />
        </Tab>
      </Tabs>
    </>
  );
}

export default function ClassDetailsForStudent(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();
  const [courseName, setCourseName] = useState("");
  useEffect(() => {
    axios
      .get("/classrooms/" + props.match.params.id)
      .then(({ data: { data } }) => {
        setLoading(true);
        setCourseName(data.coursecode);
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
        <div className="wrapper ">
          <StudentSidebar />
          <div className="main-panel">
            <StudentNavbar name="Student Dashboard" />

            {!loading ? (
              <>
                <div className="content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-2 col-md-2 col-sm-6">
                        <h3>{courseName || "Loading..."}</h3>
                      </div>
                      <div className="col-lg-9 col-md-9 col-sm-6">
                        <img
                          src="https://image.shutterstock.com/z/stock-vector-vector-illustration-business-man-study-in-online-course-the-mentor-explain-in-online-class-computer-1496233118.jpg"
                          style={{ height: "200px", width: "300px" }}
                          alt="classroom_image"
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
                      <ControlledTabs course={course} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              "Loading.."
            )}
          </div>
        </div>

        <div className="fixed-plugin">
          <div className="dropdown show-dropdown">
            <Link to="#" data-toggle="dropdown">
              <i className="fa fa-cog fa-2x"> </i>
            </Link>
            <ul className="dropdown-menu">
              <li className="header-title"> Sidebar Filters</li>
              <li className="adjustments-line">
                <Link to="#" className="switch-trigger active-color">
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
                </Link>
              </li>
              <li className="header-title">Images</li>
              <li className="active">
                <Link className="img-holder switch-trigger" to="#">
                  <img src="../assets/img/sidebar-1.jpg" alt="" />
                </Link>
              </li>
              <li>
                <Link className="img-holder switch-trigger" to="#">
                  <img src="../assets/img/sidebar-2.jpg" alt="" />
                </Link>
              </li>
              <li>
                <Link className="img-holder switch-trigger" to="#">
                  <img src="../assets/img/sidebar-3.jpg" alt="" />
                </Link>
              </li>
              <li>
                <Link className="img-holder switch-trigger" to="#">
                  <img src="../assets/img/sidebar-4.jpg" alt="" />
                </Link>
              </li>
              <li className="button-container">
                <a
                  href="https://www.creative-tim.com/product/material-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                >
                  Free Download
                </a>
              </li>

              <li className="button-container">
                <a
                  href="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
                  target="_blank"
                  rel="noopener noreferrer"
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
      </div>
    </div>
  );
}

const Announcements = (props) => {
  const [course, setCourse] = useState({});
  useEffect(() => {
    setCourse(props.course);
  }, []);

  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <AnnouncementList course={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

function AnnouncementList({ course }) {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title ">Announcements List </h4>
              </div>
              {course &&
              course.course_material &&
              course.course_material.announcements.length ? (
                <>
                  <p className="card-category">
                    Here is a list of all Announcements
                  </p>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Announcement Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {course.course_material.announcements
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            .map((lecture, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{lecture.title}</td>
                                <td>{lecture.description}</td>
                                <td>
                                  {new Date(lecture.createdAt).toDateString()}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                "No Announcements Available yet."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
