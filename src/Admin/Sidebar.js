import React from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalofAddClass from "./Components/ModalofAddClass";

export default function Sidebar() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="../assets/img/sidebar-1.jpg"
      >
        <div className="logo">
          <Link
            to="/admindashboard"
            style={{ fontWeight: "bold", marginTop: "3px", fontSize: "36px" }}
          >
            EduTech
          </Link>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li className="nav-item active ">
              <Link className="nav-link" to="/admindashboard">
                <i className="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manageclassbyadmin">
                <i className="material-icons">people</i>
                <p>Manage Class</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/assign-teacher-to-class">
                <i className="material-icons">people</i>
                <p>Assign Teacher to Class</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-student-to-class">
                <i className="material-icons">people</i>
                <p>Add Student to Class</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/manage-student-by-admin">
                <i className="material-icons">people</i>
                <p>Manage Student & Class</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-student-by-admin">
                <i className="material-icons">people</i>
                <p>Add Student </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-teacher-by-admin">
                <i className="material-icons">people</i>
                <p>Add Teacher</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#">
                <button
                  className="nav-link btn btn-primary"
                  onClick={() => setModalShow(true)}
                >
                  <i
                    style={{ margin: "auto", paddingRight: "7px" }}
                    className="material-icons"
                  >
                    person_add
                  </i>
                  <p style={{ marginRight: "17px" }}>Add ClassName</p>
                </button>
              </Link>
              <ModalofAddClass
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
