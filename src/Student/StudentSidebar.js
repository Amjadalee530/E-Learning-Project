import React from "react";
import { Link } from "react-router-dom";

export default function StudentSidebar() {
  return (
    <div>
      <div
        class="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="../assets/img/sidebar-1.jpg"
      >
        <div class="logo">
          <Link
            to="#"
            class="simple-text logo-normal"
            style={{ fontWeight: "bold" }}
          >
            Edu Tech
          </Link>
        </div>
        <div class="sidebar-wrapper">
          <ul class="nav">
            <li class="nav-item active  ">
              <Link class="nav-link" to="/studentdashboard">
                <i class="material-icons">dashboard</i>
                <p>Dashboard</p>
              </Link>
            </li>

            <li class="nav-item ">
              <Link class="nav-link" to="/studentdashboard">
                <i class="material-icons">upload</i>
                <p>Upload Assignment</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link" to="/studentdashboard">
                <i class="material-icons">upload</i>
                <p>Upload Quiz</p>
              </Link>
            </li>
            <li class="nav-item ">
              <Link class="nav-link" to="/studentdashboard">
                <i class="material-icons">upload</i>
                <p>Upload Exam</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
