import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Teacher = (props) => (
  <tr>
    <td>{props.teacher.firstname}</td>
    <td>{props.teacher.lastname}</td>
    <td>{props.teacher.username}</td>
    <td>{props.teacher.qualification}</td>
    <td>{props.teacher.department}</td>
    <td>{props.teacher.password}</td>
    <td
      style={{ cursor: "pointer" }}
      onClick={() => {
        props.deleteTeacher(props.teacher.id);
      }}
    >
      {/* <Link to={"/edit/"+props.student._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStudent(props.student._id) }}>delete</a> */}
      {/* <Link to={"/edit/" + props.teacher._id}></Link>{" "} */}
      delete
    </td>
  </tr>
);
export default class TableTeacher extends Component {
  constructor(props) {
    super(props);

    this.deleteTeacher = this.deleteTeacher.bind(this);

    this.state = { teachers: [] };
  }

  //sb students show krwaye ga, students ki array bana raha ha
  componentDidMount() {
    axios
      .get("/teachers/")
      .then(({ data: { data } }) => {
        this.setState({ teachers: data });
      })
      .catch((err) => {
        err.response.data.msg
          ? alert(err.response.data.msg)
          : alert(err.message);
      });
  }

  deleteTeacher(id) {
    axios
      .delete("/teachers/" + id)
      .then((res) => {
        document.location.reload(true);
        alert("Teacher added successfully");
      })
      .catch((err) =>
        err.response.data.msg
          ? alert(err.response.data.msg)
          : alert(err.message)
      );

    this.setState({
      teachers: this.state.teachers.filter((el) => el._id !== id),
    });
  }

  teacherList() {
    return this.state.teachers.map((currentteacher) => {
      return (
        <Teacher
          teacher={currentteacher}
          deleteTeacher={this.deleteTeacher}
          key={currentteacher._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className=" text-primary">
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Username</th>
              <th>Qualification</th>
              <th>Department</th>
              <th>Password</th>
              <th>Action</th>
              {/* <th>
              <i class="material-icons">delete</i>
            </th> */}
            </tr>
          </thead>

          <tbody>{this.teacherList()}</tbody>

          {/* <tr>
              <td>
                1
                          </td>
              <td>
                Dakota Rice
                          </td>
              <td>
                Niger
                          </td>
              <td>
                Oud-Turnhout
                          </td>
              <td class="text-primary">
                $36,738
                          </td>
              <td><Link to="/managestubyadmin" class="btn btn-danger">
                <i class="material-icons">delete</i> Delete
                        </Link></td>
            </tr> */}
        </table>
      </div>
    );
  }
}
