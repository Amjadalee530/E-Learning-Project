import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function AdminLogin() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  React.useEffect(() => {
    if (localStorage.getItem("user")) {
      if (localStorage.getItem("admin_token")) {
        history.push("admindashboard");
      } else if (localStorage.getItem("student_token")) {
        history.push("studentdashboard");
      } else if (localStorage.getItem("teacher_token")) {
        history.push("teacherdashboard");
      }
    }
    return () => {
      // on unmount do clean states
      setUsername("");
      setPassword("");
    };
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!username || !password)
      return alert("username and password is required!");
    try {
      const { data } = await Axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      if (data.success) {
        switch (data.data.role) {
          case "admin":
            localStorage.setItem("admin_token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.data));
            return history.push("/admindashboard");
          case "student":
            localStorage.setItem("student_token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.data));
            return history.push("/studentdashboard");
          case "teacher":
            localStorage.setItem("teacher_token", JSON.stringify(data.token));
            localStorage.setItem("user", JSON.stringify(data.data));
            return history.push("/teacherdashboard");
          default:
            return alert("Something went wrong, please try again.");
        }
      }
    } catch (error) {
      if (error?.response?.data?.msg) alert(error.response.data.msg);
      else alert(error.message);
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-5 p-5">
          <img
            src="https://i.ibb.co/LncvYsG/edu-tech-1.jpg"
            style={{ height: "25%", width: "29%" }}
            alt="logo"
          />

          <h2 className="name animated bounceIn"> Login </h2>
          <br></br>
          <div className="card text-center">
            <div className="card-body ">
              <form
                onSubmit={submitForm}
                className="text-center"
                style={{ color: "#757575" }}
              >
                <div className="md-form mt-3">
                  <input
                    type="text"
                    value={username}
                    id="username"
                    className="form-control"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="md-form mt-3">
                  <input
                    type="password"
                    value={password}
                    id="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="btn btn-info btn-rounded"
                  style={{ fontWeight: "bold" }}
                  // type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <img
            src="https://miro.medium.com/max/994/1*jwA-xx-16cVLVsxPNeJSkg.jpeg"
            alt="Login Form Pic"
          />
        </div>
      </div>
    </div>
  );
}
