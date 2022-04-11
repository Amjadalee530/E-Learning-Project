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

export default class ModalofAddClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      // classid: '',
      coursecode: "",
      classname: "",
      section: "",
      // noofparticipents:'',
      users: [],
    };
    // this.onChangeClassID = this.onChangeClassID.bind(this);
    this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
    this.onChangeClassName = this.onChangeClassName.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    // this.onChangeNoOfParticipents = this.onChangeNoOfParticipents.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // onChangeClassID(e) {
  //   this.setState({
  //     classid: e.target.value
  //   })
  // }
  onChangeCourseCode(e) {
    this.setState({
      coursecode: e.target.value,
    });
  }

  onChangeClassName(e) {
    this.setState({
      classname: e.target.value,
    });
  }

  onChangeSection(e) {
    this.setState({
      section: e.target.value,
    });
  }
  // onChangeNoOfParticipents(e) {
  //   this.setState({
  //       noofparticipents: e.target.value
  //   })
  // }

  handleSubmit(e) {
    e.preventDefault();
    const classess = {
      // classid: this.state.classid,
      coursecode: this.state.coursecode,
      classname: this.state.classname,
      section: this.state.section,
      // noofparticipents:this.state.noofparticipents,
    };
    // //database pr data sent ker rhy ha
    axios
      .post("/classrooms/add", classess)
      .then((res) => {
        document.location.reload(true);
        alert("Class room added successfully");
      })
      .catch((err) =>
        err.response.data.msg
          ? alert(err.response.data.msg)
          : alert(err.message)
      );
  }
  onHide() {
    this.setState({ modalShow: false });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton onClick={this.props.onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              Class Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title">Add Class</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Class ID</label>
                        <input type="text" className="form-control" 
                           value={this.state.classid}
                        onChange={this.onChangeClassID}
                        />
                      </div>
                    </div> */}

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Course Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.coursecode}
                          onChange={this.onChangeCourseCode}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">
                          Course Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={this.state.classname}
                          onChange={this.onChangeClassName}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="bmd-label-floating">Section</label>
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.section}
                          onChange={this.onChangeSection}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="clearfix"></div>
                  <button
                    // onSubmit={this.handleSubmit}
                    // onClick={this.props.onHide}
                    // type="submit"
                    className="btn btn-primary pull-right"
                  >
                    Add Class
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
