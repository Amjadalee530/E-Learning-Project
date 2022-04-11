import React, { Component } from "react";
import axios from "axios";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { Button, Input } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";

export default class ModalofAddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      firstname: "",
      lastname: "",
      rollno: "",
      username: "",
      password: "",
      users: [],
    };

    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeRollno = this.onChangeRollno.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeFirstname(e) {
    this.setState({
      firstname: e.target.value,
    });
  }
  onChangeLastname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }
  onChangeRollno(e) {
    this.setState({
      rollno: e.target.value,
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      rollno: this.state.rollno,
      username: this.state.username,
      password: this.state.password,
    };
    // //database pr dtata sent ker rhy ha
    axios
      .post("http://localhost:5000/students/add", student)
      .then((res) => {
        document.location.reload(true);
        alert("Student added successfully");
      })
      .catch((err) =>
        err.response.data.msg
          ? alert(err.response.data.msg)
          : alert(err.message)
      );

    // // window.location = '/';
  }
  onHide() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={this.props.onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Student Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Add Details</h4>
              <p className="card-category">Complete your Details</p>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">First Name</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        value={this.state.firstname}
                        onChange={this.onChangeFirstname}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Last Name</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        value={this.state.lastname}
                        onChange={this.onChangeLastname}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Roll No</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        value={this.state.rollno}
                        onChange={this.onChangeRollno}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Username</label>
                      <input
                        type="text"
                        required
                        class="form-control"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Password</label>
                      <input
                        type="text"
                        class="form-control"
                        required
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
                  </div>
                </div>

                <div className="clearfix"></div>

                <button type="submit" className="btn btn-primary pull-right">
                  Add Student
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button>
        <Link to="/managestubyadmin">
            <button onSubmit={this.onSubmit} onClick={this.props.onHide} type="submit" className="btn btn-primary pull-right">Add Student</button>
        </Link>
       </Button>
        </Modal.Footer> */}
      </Modal>
    );
  }
}
