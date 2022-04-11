import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Classess = (props) => (
  <tr>
    <td>{props.classess._id}</td>
    <td>{props.classess.coursecode}</td>
    <td>{props.classess.classname}</td>
    <td>{props.classess.section}</td>
    <td
      style={{ cursor: "pointer" }}
      onClick={() => {
        props.deleteClassess(props.classess._id);
      }}
    >
      {/* <Link to={"/edit/"+props.student._id}>edit</Link> | <a href="#" onClick={() => { props.deleteStudent(props.student._id) }}>delete</a> */}
      {/* <Link to={"/edit/" + props.classess._id}></Link>{" "} */}
      delete
    </td>
  </tr>
);
export default class TableClass extends Component {
  constructor(props) {
    super(props);

    this.deleteClassess = this.deleteClassess.bind(this);

    this.state = { classess: [] };
  }

  //sb classess show krwaye ga, classess ki array bana raha ha
  componentDidMount() {
    axios
      .get("/classrooms/")
      .then(({ data: { data } }) => {
        this.setState({ classess: data });
      })
      .catch((error) => {
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message);
      });
  }

  deleteClassess(id) {
    axios
      .delete("/classrooms/" + id)
      .then(() => {
        this.setState({
          classess: this.state.classess.filter((el) => el._id !== id),
        });
        alert("Class room removed successfuly!");
      })
      .catch((error) => {
        error.response.data.msg
          ? alert(error.response.data.msg)
          : alert(error.message);
      });
  }

  classessList() {
    return this.state.classess.map((currentclassess) => {
      return (
        <Classess
          classess={currentclassess}
          deleteClassess={this.deleteClassess}
          key={currentclassess._id}
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
              <th>Class ID</th>
              <th>Course Code</th>
              <th>Class Name</th>
              <th>Section</th>

              <th>Action</th>
              {/* <th>
              <i class="material-icons">delete</i>
            </th> */}
            </tr>
          </thead>

          <tbody>{this.classessList()}</tbody>

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
