import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { Link } from "react-router-dom";
import axios from "axios";
import ManageStudentModal from "./Components/ManageStudentModal";

export default function ManageStudentAndClass() {
  const [modalShow, setModalShow] = React.useState(false);
  const [classes, setClasses] = useState([]);
  const [classRoom, setClassRoom] = useState({});

  useEffect(() => {
    axios
      .get("/classrooms/")
      .then(({ data: { data } }) => {
        setClasses(data);
      })
      .catch((error) =>
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message)
      );
  }, []);
  const handleClick = (classroom) => {
    setClassRoom(classroom);
    setModalShow(true);
  };
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-panel">
        <Navbar name="Manage Students And Classes" />

        <div className="content">
          <div className="container-fluid">
            <div className="row flex-wrap">
              {classes.map((currentclass) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick(currentclass)}
                    className="col-lg-4 col-md-4 col-sm-6"
                  >
                    <div
                      className="card card-stats"
                      style={{ height: "325px", width: "325px" }}
                    >
                      <div className="card-header card-header-success card-header-icon">
                        <div className="card-icon" style={{ width: "100px" }}>
                          <i className="material-icons">
                            <h3>{currentclass.section}</h3>
                          </i>
                        </div>
                        <p className="card-category">
                          {currentclass.coursecode}
                        </p>
                        <h3 className="card-title">{currentclass.classname}</h3>
                      </div>

                      <div className="card-footer">
                        <div className="stats">
                          <i className="material-icons">date_range</i>
                          <img
                            src="https://image.shutterstock.com/z/stock-vector-vector-illustration-business-man-study-in-online-course-the-mentor-explain-in-online-class-computer-1496233118.jpg"
                            style={{ height: "160px", width: "283px" }}
                            alt="classroom_image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <ManageStudentModal
                show={modalShow}
                classRoom={classRoom}
                onHide={() => setModalShow(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
