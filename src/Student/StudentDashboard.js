import React, { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import StudentFooter from "./StudentFooter";
import { useHistory } from "react-router";
import axios from "axios";

export default function StudentDashboard() {
  const [classes, setClasses] = useState([]);

  const history = useHistory();
  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).role !== "student") {
      history.goBack();
    }
    axios
      .get("/students/" + JSON.parse(user).id)
      .then(({ data: { data } }) => {
        setClasses(data.classes);
      })
      .catch((error) =>
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message)
      );
  }, []);
  return (
    <div>
      <div className="wrapper ">
        <StudentSidebar />
        <div className="main-panel">
          <StudentNavbar name="Student Dashboard" />
          <div className="content">
            <div className="container-fluid">
              {classes.length ? (
                <div className="row flex-wrap">
                  {classes.map((currentclass) => {
                    return (
                      <div
                        key={currentclass._id}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(
                            "classdetailsforstudents/" + currentclass._id
                          )
                        }
                        className="col-lg-4 col-md-4 col-sm-6"
                      >
                        <div
                          className="card card-stats"
                          style={{ height: "325px", width: "325px" }}
                        >
                          <div className="card-header card-header-success card-header-icon">
                            <div
                              className="card-icon"
                              style={{ width: "100px" }}
                            >
                              <i className="material-icons">
                                <h3>{currentclass.section}</h3>
                              </i>
                            </div>
                            <p className="card-category">
                              {currentclass.coursecode}
                            </p>
                            <h3 className="card-title">
                              {currentclass.classname}
                            </h3>
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
                  {/* <ManageStudentModal
                  show={modalShow}
                  classRoom={classRoom}
                  onHide={() => setModalShow(false)}
                /> */}
                </div>
              ) : (
                "You are not  enrolled in any Course."
              )}
            </div>
          </div>
          {/* <StudentFooter /> */}
        </div>
      </div>
    </div>
  );
}
