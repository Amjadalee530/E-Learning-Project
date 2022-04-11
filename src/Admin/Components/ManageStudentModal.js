import React from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export default function ManageStudentModal(props) {
  return (
    <div>
      <Modal
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Student List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <div className="card">
                    <div className="card-header card-header-primary">
                      <h4 className="card-title ">Student List </h4>
                      <p className="card-category">
                        {" "}
                        {props?.classRoom?.students?.length
                          ? "Here is a list of all Students"
                          : "No students enrolled in this class yet!"}
                      </p>
                    </div>
                    {props?.classRoom?.students?.length ? (
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table">
                            <thead className=" text-primary">
                              <th>ID</th>
                              <th>FirstName</th>
                              <th>Last Name</th>
                              <th>Roll No</th>
                              <th>Username</th>
                              <th>
                                <i className="material-icons">delete</i>
                              </th>
                            </thead>
                            <tbody>
                              {props.classRoom.students.map((std) => (
                                <tr key={std.id}>
                                  <td>{std.id}</td>
                                  <td>{std.firstname}</td>
                                  <td>{std.lastname}</td>
                                  <td>{std.rollno}</td>
                                  <td className="text-primary">
                                    {std.username}
                                  </td>
                                  <td className="btn btn-danger">
                                    <i className="material-icons">delete</i>{" "}
                                    Delete
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <Link to="add-student-to-class">
                        click here to enroll students in this course.
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
