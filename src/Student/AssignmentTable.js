import axios from "axios";
import React from "react";

export default function AssignmentTable(props) {
  const [assignments, setAssignments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [file, setFile] = React.useState();
  React.useEffect(() => {
    if (props?.assignments?.course_material?.assignments) {
      setAssignments(props.assignments.course_material.assignments);
    }
  }, []);
  const handleSubmit = async (e, assignment) => {
    e.preventDefault();
    if (!file) return alert("Please upload assignment file");
    try {
      setLoading(true);
      const courseId = props.assignments._id;
      const body = new FormData();
      body.append(
        "studentId",
        localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).id
          : null
      );
      body.append("assignment", file);
      body.append("assignmentObject", JSON.stringify(assignment));
      const res = await axios.post(
        "/student-submit/assignment/" + courseId,
        body
      );
      if (res.status === 201) {
        setFile(null);
        alert("Assignment submitted");
      }
      setLoading(false);
    } catch (error) {
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else alert(error.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-sm-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Assignment List </h4>
                  <p class="card-category">Here is a list of all Assignments</p>
                </div>
                <h3>{loading ? "Submitting..." : ""}</h3>
                {assignments.length ? (
                  <>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <tr>
                              <th>No.</th>
                              <th>Title</th>
                              <th>Assignment</th>
                              <th>Start Date</th>
                              <th>Deadline</th>
                              <th>Upload Assignment</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {assignments
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              .map((assignment, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{assignment.title}</td>
                                  <td>
                                    <a
                                      href={
                                        "http://localhost:5000" +
                                        assignment.filePath
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Download File
                                    </a>
                                  </td>
                                  <td>
                                    {new Date(
                                      assignment.createdAt
                                    ).toLocaleString()}
                                  </td>
                                  <td>
                                    {new Date(
                                      assignment.deadline
                                    ).toLocaleString()}
                                  </td>
                                  <td>
                                    <input
                                      type="file"
                                      accept=".pdf,.docx,.pptx"
                                      name="img"
                                      onChange={(e) =>
                                        setFile(e.target.files[0])
                                      }
                                      id="img"
                                    />
                                  </td>
                                  <td>
                                    <button
                                      type="submit"
                                      onClick={(e) =>
                                        handleSubmit(e, assignment)
                                      }
                                    >
                                      Submit
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  "No Assignments given Yet."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
