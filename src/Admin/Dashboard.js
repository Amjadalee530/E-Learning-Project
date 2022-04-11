import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";

//import { Fade } from "react-awesome-reveal";

import { Link } from "react-router-dom";
import axios from "axios";

// import Zoom from 'react-reveal/Zoom';
// import Flip from 'react-reveal/Flip';
// import Bounce from 'react-reveal/Bounce';

// import Roll from 'react-reveal/Roll';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      images: [
        "https://img.freepik.com/free-vector/students-classroom-flat-vector-illustration_74855-6663.jpg?size=626&ext=jpg",
        "https://image.shutterstock.com/z/stock-vector-vector-illustration-business-man-study-in-online-course-the-mentor-explain-in-online-class-computer-1496233118.jpg",
        "https://c8.alamy.com/comp/2C3KEYG/online-training-teacher-explain-a-student-in-computer-video-education-and-courses-learning-digital-vector-illustration-2C3KEYG.jpg",
        "https://cdn5.vectorstock.com/i/1000x1000/90/24/education-online-students-with-laptop-watching-vector-30289024.jpg",
        "https://cdn2.vectorstock.com/i/1000x1000/52/11/online-education-concept-distant-training-courses-vector-30565211.jpg",
      ],
    };
  }
  componentDidMount() {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).role !== "admin") {
      this.props.history.goBack();
    }
    axios
      .get("/classrooms/")
      .then(({ data: { data } }) => {
        this.setState({ classes: data });
      })
      .catch((error) => {
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message);
      });
  }
  render() {
    return (
      <div>
        <div class="wrapper">
          <Sidebar />
          <div class="main-panel">
            <Navbar name="Admin Dashboard" />

            <div class="content">
              <div class="container-fluid">
                <div class="row flex-wrap">
                  {this.state.classes.map((currentclass) => {
                    return (
                      <div class="col-lg-4 col-md-4 col-sm-6">
                        <div
                          class="card card-stats"
                          style={{ height: "325px", width: "325px" }}
                        >
                          <div class="card-header card-header-success card-header-icon">
                            <div class="card-icon" style={{ width: "100px" }}>
                              <i class="material-icons">
                                <h3>{currentclass.section}</h3>
                              </i>
                            </div>
                            <p class="card-category">
                              {currentclass.coursecode}
                            </p>
                            <h3 class="card-title">{currentclass.classname}</h3>
                          </div>

                          <div class="card-footer">
                            <div class="stats">
                              <i class="material-icons">date_range</i>
                              <img
                                src="https://c8.alamy.com/comp/2C3KEYG/online-training-teacher-explain-a-student-in-computer-video-education-and-courses-learning-digital-vector-illustration-2C3KEYG.jpg"
                                style={{ height: "160px", width: "283px" }}
                                alt="classroom_image"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div class="row">
                <div class="row">
                  <div class="col-lg-6 col-md-12">
                    <div class="card">
                      <div class="card-header card-header-tabs card-header-primary">
                        <div class="nav-tabs-navigation">
                          <div class="nav-tabs-wrapper">
                            <span class="nav-tabs-title">Tasks:</span>
                            <ul class="nav nav-tabs" data-tabs="tabs">
                              <li class="nav-item">
                                <a
                                  class="nav-link active"
                                  href="#profile"
                                  data-toggle="tab"
                                >
                                  <i class="material-icons">bug_report</i> Bugs
                                  <div class="ripple-container"></div>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  href="#messages"
                                  data-toggle="tab"
                                >
                                  <i class="material-icons">code</i> Website
                                  <div class="ripple-container"></div>
                                </a>
                              </li>
                              <li class="nav-item">
                                <a
                                  class="nav-link"
                                  href="#settings"
                                  data-toggle="tab"
                                >
                                  <i class="material-icons">cloud</i> Server
                                  <div class="ripple-container"></div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="tab-content">
                          <div class="tab-pane active" id="profile">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          checked
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Sign contract for "What are conference
                                    organizers afraid of?"
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Lines From Great Russian Literature? Or
                                    E-mails From My Boss?
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Flooded: One year later, assessing what was
                                    lost and what was found when a ravaging rain
                                    swept through metro Detroit
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          checked
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Create 4 Invisible User Experiences you
                                    Never Knew About
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="tab-pane" id="messages">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          checked
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Flooded: One year later, assessing what was
                                    lost and what was found when a ravaging rain
                                    swept through metro Detroit
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Sign contract for "What are conference
                                    organizers afraid of?"
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="tab-pane" id="settings">
                            <table class="table">
                              <tbody>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Lines From Great Russian Literature? Or
                                    E-mails From My Boss?
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          checked
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Flooded: One year later, assessing what was
                                    lost and what was found when a ravaging rain
                                    swept through metro Detroit
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div class="form-check">
                                      <label class="form-check-label">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          value=""
                                          checked
                                        />
                                        <span class="form-check-sign">
                                          <span class="check"></span>
                                        </span>
                                      </label>
                                    </div>
                                  </td>
                                  <td>
                                    Sign contract for "What are conference
                                    organizers afraid of?"
                                  </td>
                                  <td class="td-actions text-right">
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Edit Task"
                                      class="btn btn-primary btn-link btn-sm"
                                    >
                                      <i class="material-icons">edit</i>
                                    </button>
                                    <button
                                      type="button"
                                      rel="tooltip"
                                      title="Remove"
                                      class="btn btn-danger btn-link btn-sm"
                                    >
                                      <i class="material-icons">close</i>
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                    <div class="card">
                      <div class="card-header card-header-warning">
                        <h4 class="card-title">Employees Stats</h4>
                        <p class="card-category">
                          New employees on 15th September, 2016
                        </p>
                      </div>
                      <div class="card-body table-responsive">
                        <table class="table table-hover">
                          <thead class="text-warning">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Country</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Dakota Rice</td>
                              <td>$36,738</td>
                              <td>Niger</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Minerva Hooper</td>
                              <td>$23,789</td>
                              <td>Curaçao</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Sage Rodriguez</td>
                              <td>$56,142</td>
                              <td>Netherlands</td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Philip Chaney</td>
                              <td>$38,735</td>
                              <td>Korea, South</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <div class="fixed-plugin">
          <div class="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown">
              <i class="fa fa-cog fa-2x"> </i>
            </a>
            <ul class="dropdown-menu">
              <li class="header-title"> Sidebar Filters</li>
              <li class="adjustments-line">
                <a
                  href="javascript:void(0)"
                  class="switch-trigger active-color"
                >
                  <div class="badge-colors ml-auto mr-auto">
                    <span
                      class="badge filter badge-purple"
                      data-color="purple"
                    ></span>
                    <span
                      class="badge filter badge-azure"
                      data-color="azure"
                    ></span>
                    <span
                      class="badge filter badge-green"
                      data-color="green"
                    ></span>
                    <span
                      class="badge filter badge-warning"
                      data-color="orange"
                    ></span>
                    <span
                      class="badge filter badge-danger"
                      data-color="danger"
                    ></span>
                    <span
                      class="badge filter badge-rose active"
                      data-color="rose"
                    ></span>
                  </div>
                  <div class="clearfix"></div>
                </a>
              </li>
              <li class="header-title">Images</li>
              <li class="active">
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-1.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-2.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-3.jpg" alt="" />
                </a>
              </li>
              <li>
                <a class="img-holder switch-trigger" href="javascript:void(0)">
                  <img src="../assets/img/sidebar-4.jpg" alt="" />
                </a>
              </li>
              <li class="button-container">
                <a
                  href="https://www.creative-tim.com/product/material-dashboard"
                  target="_blank"
                  class="btn btn-primary btn-block"
                >
                  Free Download
                </a>
              </li>

              <li class="button-container">
                <a
                  href="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
                  target="_blank"
                  class="btn btn-default btn-block"
                >
                  View Documentation
                </a>
              </li>
              <li class="button-container github-star">
                <a
                  class="github-button"
                  href="https://github.com/creativetimofficial/material-dashboard"
                  data-icon="octicon-star"
                  data-size="large"
                  data-show-count="true"
                  aria-label="Star ntkme/github-buttons on GitHub"
                >
                  Star
                </a>
              </li>
              <li class="header-title">Thank you for 95 shares!</li>
              <li class="button-container text-center">
                <button id="twitter" class="btn btn-round btn-twitter">
                  <i class="fa fa-twitter"></i> &middot; 45
                </button>
                <button id="facebook" class="btn btn-round btn-facebook">
                  <i class="fa fa-facebook-f"></i> &middot; 50
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
}
