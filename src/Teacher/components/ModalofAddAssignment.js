import React, { Component } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "./styles.css";
import "react-datepicker/dist/react-datepicker.css";
export default class ModalofAddAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", deadline: "", file: null, totalMarks: 0 };
  }

  onHide() {
    this.setState({ modalShow: false });
  }
  submitRequest = async (cb) => {
    if (!this.state.file) return alert("Please select a file");
    const form = new FormData();
    form.append("title", this.state.title);
    form.append("deadline", this.state.deadline);
    form.append("totalMarks", this.state.totalMarks);
    form.append("assignment", this.state.file);
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:5000/course-material/upload-assignment/" +
          this.props.course._id,
        form
      );
      this.props.addAssignment(data);
      this.setState({ file: null });
      this.setState({ totalMarks: 0 });
      this.setState({ title: "" });
      this.setState({ deadline: "" });
      cb();
    } catch (error) {
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else alert(error.message);
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.submitRequest(() => alert("Assignment uploaded successfuly"));
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
            Uplaod Assignment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div
              className="card-header card-header-primary"
              // style={{ zIndex: "1 !important" }}
            >
              <h4 className="card-title">Add Assignment Details</h4>
              <p className="card-category">Enter your Details</p>
            </div>
            <div className="card-body">
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
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Deadline</label>
                          <DatePicker
                            selected={this.state.deadline}
                            onChange={(date) =>
                              this.setState({ deadline: date })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          class="form-group"
                          style={{
                            position: "initial",
                            marginBottom: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <input
                            style={{ marginLeft: "18px", marginTop: "12px" }}
                            type="file"
                            accept=".pdf,.docx,.pptx"
                            name="img"
                            onChange={(e) =>
                              this.setState({ file: e.target.files[0] })
                            }
                            id="img"
                            required
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            style={{ marginLeft: "18px", marginTop: "8px" }}
                            className="bmd-label-floating"
                          >
                            Total Marks
                          </label>
                          <input
                            style={{ marginLeft: "18px", marginTop: "0px" }}
                            required
                            className="form-control"
                            type="number"
                            id="total-marks"
                            name="total-marks"
                            min="1"
                            onChange={(e) =>
                              this.setState({ totalMarks: e.target.value })
                            }
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ marginTop: "30px" }}
                >
                  Add Assignment
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
