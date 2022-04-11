import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Admin/form.css";
import "./QuizModal.css";
export default class QuizModal extends Component {
  constructor(props) {
    super(props);
    this.state = { link: "", title: "", deadline: "" };
  }

  onHide() {
    this.setState({ modalShow: false });
  }
  submitRequest = async () => {
    const body = {
      title: this.state.title,
      link: this.state.link,
      // startDate: this.state.startDate,
      deadline: this.state.deadline,
    };
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:5000/course-material/upload-quiz/" +
          this.props.course._id,
        body
      );
      this.props.addQuiz(data);
      alert("Quiz Uploaded Successfully.");
      this.setState({ title: "" });
      this.setState({ deadline: "" });
      this.setState({ link: "" });
      // this.setState({ startDate: "" });
    } catch (error) {
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else alert(error.message);
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.submitRequest();
  };
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
            Uplaod Quiz
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Add Quiz Details</h4>
            </div>
            <div className="card-body">
              <p className="card-category text-danger font-weight-bolder">
                Please enter the same details as you will enter in google form.
                <sup>*</sup>
              </p>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Title</label>
                      <input
                        onChange={(e) =>
                          this.setState({ title: e.target.value })
                        }
                        type="text"
                        class="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="bmd-label-floating">Quiz Link</label>
                      <input
                        onChange={(e) =>
                          this.setState({ link: e.target.value })
                        }
                        type="url"
                        class="form-control"
                        required
                      />
                    </div>
                    {/* <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Start</label>
                          <DatePicker
                            selected={this.state.startDate}
                            showTimeSelect
                            dateFormat="Pp"
                            onChange={(date) =>
                              this.setState({ startDate: date })
                            }
                          />
                        </div>
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Deadline</label>
                          <DatePicker
                            selected={this.state.deadline}
                            showTimeSelect
                            dateFormat="Pp"
                            onChange={(date) =>
                              this.setState({ deadline: date })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ float: "left" }}>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: "30px" }}
                  >
                    Add Quiz
                  </button>
                  <a
                    href="https://docs.google.com/forms/u/0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: "absolute",
                      top: "370px",
                      left: "500px",
                    }}
                  >
                    Click here to fill the Quiz form.
                  </a>
                </div>
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
