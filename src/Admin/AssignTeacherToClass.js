import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import ModalofAddTeacher from "./Components/ModalofAddTeacher";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AssignTeacherToClass() {
  // const [modalShow, setModalShow] = React.useState(false);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  let [teacherId, setTeacherId] = useState();
  useEffect(() => {
    const url1 = axios.get("/classrooms/");
    const url2 = axios.get("/teachers/");
    axios
      .all([url1, url2])
      .then((responses) => {
        setClasses(responses[0].data.data);
        setTeachers(responses[1].data.data);
      })
      .catch((error) =>
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message)
      );
  }, []);

  const assignTeacherHandle = (classroomId) => {
    if (!teacherId) {
      teacherId = teachers[0].id;
    }
    axios
      .put("/classrooms/" + classroomId, { teacherId })
      .then(({ data }) => {
        if (data.success) {
          alert("Teacher successfully assigned to classroom");
        }
      })
      .catch((error) =>
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message)
      );
  };

  return (
    <div>
      <div className="wrapper ">
        <Sidebar />
        <div className="main-panel">
          <Navbar name="Add Teacher to Class" />

          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="card">
                    <div className="card-header card-header-primary">
                      <h4 className="card-title ">Assign Teacher to Class</h4>
                      {classes.length ? (
                        <div className="content">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-12 col-sm-12">
                                <div className="card">
                                  <div className="card-body">
                                    <div className="table-responsive">
                                      <table className="table">
                                        <thead className=" text-primary">
                                          <th>ID</th>
                                          <th>Course Name</th>
                                          <th>Course Code</th>
                                          <th>Section</th>
                                          <th>Select Teacher</th>
                                          <th>Action</th>
                                        </thead>
                                        <tbody>
                                          {classes.map((cls) => (
                                            <tr key={cls._id}>
                                              <td>{cls._id}</td>
                                              <td>{cls.classname}</td>
                                              <td>{cls.coursecode}</td>
                                              <td>{cls.section}</td>
                                              <td>
                                                <select
                                                  onChange={(e) =>
                                                    setTeacherId(e.target.value)
                                                  }
                                                  style={{ border: "none" }}
                                                >
                                                  {teachers.map((teacher) => (
                                                    <option value={teacher.id}>
                                                      {teacher.firstname}{" "}
                                                      {teacher.lastname}
                                                    </option>
                                                  ))}
                                                </select>
                                              </td>
                                              <td
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  assignTeacherHandle(cls._id)
                                                }
                                              >
                                                Confirm
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p>No Class Room Available</p>
                          <Link to="/manageclassbyadmin">Add Class Room?</Link>
                        </>
                      )}
                      {/* <button
                        className="btn btn-primary"
                        onClick={() => setModalShow(true)}
                      >
                        <i className="material-icons">person_add</i> Add Teacher
                      </button>
                      <ModalofAddTeacher
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <div className="fixed-plugin">
        <div className="dropdown show-dropdown">
          <Link data-toggle="dropdown">
            <i className="fa fa-cog fa-2x"> </i>
          </Link>
          <ul className="dropdown-menu">
            <li className="header-title"> Sidebar Filters</li>
            <li className="adjustments-line">
              <Link className="switch-trigger active-color">
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
              <Link className="img-holder switch-trigger">
                <img src="../assets/img/sidebar-1.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link className="img-holder switch-trigger">
                <img src="../assets/img/sidebar-2.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link className="img-holder switch-trigger">
                <img src="../assets/img/sidebar-3.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link className="img-holder switch-trigger">
                <img src="../assets/img/sidebar-4.jpg" alt="" />
              </Link>
            </li>
            <li className="button-container">
              <Link
                href="https://www.creative-tim.com/product/material-dashboard"
                target="_blank"
                className="btn btn-primary btn-block"
              >
                Free Download
              </Link>
            </li>

            <li className="button-container">
              <Link
                href="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
                target="_blank"
                className="btn btn-default btn-block"
              >
                View Documentation
              </Link>
            </li>
            <li className="button-container github-star">
              <Link
                className="github-button"
                to="https://github.com/creativetimofficial/material-dashboard"
                data-icon="octicon-star"
                data-size="large"
                data-show-count="true"
                aria-label="Star ntkme/github-buttons on GitHub"
              >
                Star
              </Link>
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
  );
}
