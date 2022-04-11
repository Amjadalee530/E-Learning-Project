import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Button, Input } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalofAddStudent from "./Components/ModalofAddStudent";
import TableStudent from "./Components/TableStudent";

export default function ManageStuByAdmin() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div>
      <div class="wrapper ">
        <Sidebar />
        <div class="main-panel">
          <Navbar name="Manage Student" />

          <div class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12 col-sm-12">
                  <div class="card">
                    <div class="card-header card-header-primary">
                      <h4 class="card-title ">Student List </h4>
                      <button
                        class="btn btn-primary"
                        onClick={() => setModalShow(true)}
                      >
                        <i class="material-icons">person_add</i> Add Student
                      </button>
                      <ModalofAddStudent
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />

                      <p class="card-category"> </p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <TableStudent />
                      </div>
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
          <Link to="#" data-toggle="dropdown">
            <i class="fa fa-cog fa-2x"> </i>
          </Link>
          <ul class="dropdown-menu">
            <li class="header-title"> Sidebar Filters</li>
            <li class="adjustments-line">
              <Link to="javascript:void(0)" class="switch-trigger active-color">
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
              </Link>
            </li>
            <li class="header-title">Images</li>
            <li class="active">
              <Link
                className="img-holder switch-trigger"
                to="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-1.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link
                className="img-holder switch-trigger"
                to="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-2.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link
                className="img-holder switch-trigger"
                to="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-3.jpg" alt="" />
              </Link>
            </li>
            <li>
              <Link
                className="img-holder switch-trigger"
                to="javascript:void(0)"
              >
                <img src="../assets/img/sidebar-4.jpg" alt="" />
              </Link>
            </li>
            <li class="button-container">
              <Link
                to="https://www.creative-tim.com/product/material-dashboard"
                target="_blank"
                class="btn btn-primary btn-block"
              >
                Free Download
              </Link>
            </li>

            <li className="button-container">
              <Link
                to="https://demos.creative-tim.com/material-dashboard/docs/2.1/getting-started/introduction.html"
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
              <button id="twitter" class="btn btn-round btn-twitter">
                <i className="fa fa-twitter"></i> &middot; 45
              </button>
              <button id="facebook" class="btn btn-round btn-facebook">
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
