import React from "react";

export default function AssignmentTable(props) {
  const [assignments, setAssignments] = React.useState([]);
  React.useEffect(() => {
    if (props?.assignments?.course_material?.assignments) {
      setAssignments(props.assignments.course_material.assignments);
    }
  }, []);
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
                {assignments.length ? (
                  <>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <tr>
                              <th>No.</th>
                              <th>Title</th>

                              <th>Start Date</th>
                              <th>Deadline</th>
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
                                    {new Date(
                                      assignment.createdAt
                                    ).toLocaleString()}
                                  </td>
                                  <td>
                                    {new Date(
                                      assignment.deadline
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  "No Assignments Uploaded Yet."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
