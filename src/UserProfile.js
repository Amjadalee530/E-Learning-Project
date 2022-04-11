import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const UserProfile = () => {
  const history = useHistory();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("user")) history.goBack();
    return () => {
      setFirstname("");
      setLastname("");
      setUsername("");
      setImagePreview(null);
      setFile(null);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    };
  }, []);

  const handleUpdateMe = async (e) => {
    e.preventDefault();
    try {
      if ((firstname && !lastname) || (!firstname && lastname))
        return alert("Please enter first name and last name.");
      const body = new FormData();
      if (firstname && lastname) {
        body.append("firstname", firstname);
        body.append("lastname", lastname);
      }
      if (username) {
        body.append("username", username);
      }
      body.append("role", JSON.parse(localStorage.getItem("user")).role);
      if (file) {
        body.append("avatar", file);
      }
      const {
        data: { data },
      } = await axios.put(
        "http://localhost:5000/users/update-me/" +
          JSON.parse(localStorage.getItem("user")).id,
        body
      );
      setFirstname("");
      setLastname("");
      setUsername("");
      setImagePreview(null);
      setFile(null);
      localStorage.setItem("user", JSON.stringify(data));
      alert("Your data has been updated.");
      window.location.reload();
    } catch (error) {
      error?.response?.data?.msg
        ? alert(error.response.data.msg)
        : alert(error.message);
    }
  };
  const handleUpdadePassword = async (e) => {
    e.preventDefault();
    try {
      if (!password && !currentPassword && !confirmPassword)
        return alert("all fields are required");
      if (password !== confirmPassword)
        return alert("password and confirm-password should be same.");
      const body = {};

      body["role"] = JSON.parse(localStorage.getItem("user")).role;
      body["currentPassword"] = currentPassword;
      body["password"] = password;
      const {
        data: { data },
      } = await axios.put(
        "http://localhost:5000/users/update-password/" +
          JSON.parse(localStorage.getItem("user")).id,
        body
      );
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      alert("Your password has been updated.");
    } catch (error) {
      error?.response?.data?.msg
        ? alert(error.response.data.msg)
        : alert(error.message);
    }
  };
  return (
    <>
      {/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
      <div className="container">
        <div className="row flex-lg-nowrap">
          <div className="col-12 col-lg-auto mb-3" style={{ width: "200px" }}>
            <div className="card p-3">
              <div className="e-navlist e-navlist--active-bg">
                <ul className="nav">
                  <li className="nav-item">
                    <a className="nav-link px-2 active" href="./overview.html">
                      <i className="fa fa-fw fa-bar-chart mr-1"></i>
                      <span>Overview</span>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link px-2" href="#">
                      <i className="fa fa-fw fa-cog mr-1"></i>
                      <span>Settings</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="row">
              <div className="col mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="e-profile">
                      <div className="row">
                        <div className="col-12 col-sm-auto mb-3">
                          <div className="mx-auto" style={{ width: "140px" }}>
                            <div
                              className="d-flex justify-content-center align-items-center rounded"
                              style={{
                                height: "140px",
                                backgroundColor: "rgb(233, 236, 239)",
                              }}
                            >
                              <img
                                style={{
                                  height: "140px",
                                  width: "140px",
                                }}
                                alt="user-avatar"
                                src={
                                  imagePreview
                                    ? imagePreview
                                    : JSON.parse(localStorage.getItem("user"))
                                        .avatar
                                    ? `http://localhost:5000${
                                        JSON.parse(localStorage.getItem("user"))
                                          .avatar
                                      }`
                                    : "https://image.shutterstock.com/z/stock-vector-vector-illustration-business-man-study-in-online-course-the-mentor-explain-in-online-class-computer-1496233118.jpg"
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className="text-center text-sm-left mb-2 mb-sm-0">
                            <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                              {
                                JSON.parse(localStorage.getItem("user"))
                                  .firstname
                              }{" "}
                              {
                                JSON.parse(localStorage.getItem("user"))
                                  .lastname
                              }
                            </h4>
                            <p className="mb-0">
                              @
                              {
                                JSON.parse(localStorage.getItem("user"))
                                  .username
                              }
                            </p>
                            <input
                              id="imageFile"
                              type="file"
                              hidden
                              onChange={(e) => {
                                setImagePreview(
                                  URL.createObjectURL(e.target.files[0])
                                );
                                setFile(e.target.files[0]);
                              }}
                            />
                            <div className="mt-2">
                              <button
                                onClick={() =>
                                  document.getElementById("imageFile").click()
                                }
                                className="btn btn-primary"
                                type="button"
                              >
                                <i className="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </button>
                            </div>
                          </div>
                          <div className="text-center text-sm-right">
                            <span className="badge badge-secondary">
                              {JSON.parse(localStorage.getItem("user")).role}
                            </span>
                            <div className="text-muted">
                              <small>
                                {JSON.parse(localStorage.getItem("user"))
                                  ?.createdAt
                                  ? new Date(
                                      JSON.parse(
                                        localStorage.getItem("user")
                                      ).createdAt
                                    ).toLocaleDateString()
                                  : "Joined 09 Dec 2017"}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ul className="nav nav-tabs">
                        <li className="nav-item">Settings</li>
                      </ul>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form onSubmit={handleUpdateMe} className="form">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>First Name</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        onChange={(e) =>
                                          setFirstname(e.target.value)
                                        }
                                        placeholder={
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          ).firstname
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Last Name</label>
                                      <input
                                        className="form-control"
                                        onChange={(e) =>
                                          setLastname(e.target.value)
                                        }
                                        type="text"
                                        name="name"
                                        placeholder={
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          ).lastname
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Username</label>
                                      <input
                                        onChange={(e) =>
                                          setUsername(e.target.value)
                                        }
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        placeholder={
                                          JSON.parse(
                                            localStorage.getItem("user")
                                          ).username
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-center mb-3">
                                <button className="btn btn-primary mb-5">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                          <form onSubmit={handleUpdadePassword}>
                            <div className="row">
                              <div className="col-12 mb-3">
                                <div className="mb-2">
                                  <b>Change Password</b>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Current Password</label>
                                      <input
                                        className="form-control"
                                        onChange={(e) =>
                                          setCurrentPassword(e.target.value)
                                        }
                                        type="password"
                                        placeholder="••••••"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>New Password</label>
                                      <input
                                        className="form-control"
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                        type="password"
                                        placeholder="••••••"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>
                                        Confirm{" "}
                                        <span className="d-none d-xl-inline">
                                          Password
                                        </span>
                                      </label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        onChange={(e) =>
                                          setConfirmPassword(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-center">
                                <button className="btn btn-primary">
                                  Save Password
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-3 mb-3">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="px-xl-3">
                      <button
                        onClick={() => {
                          localStorage.clear();
                          history.push("/");
                        }}
                        className="btn btn-block btn-secondary"
                      >
                        <i className="fa fa-sign-out"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title font-weight-bold">Support</h6>
                    <p className="card-text">
                      Get fast, free help from our friendly assistants.
                    </p>
                    <button className="btn btn-primary">Contact Us</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
