import axios from "axios";
import { useEffect, useState } from "react";

const AcademinRecord = (props) => {
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState([]);
  useEffect(() => {
    setLoading(true);
    if (props?.course?._id) {
      axios
        .get(
          `http://localhost:5000/grades/${props?.course?._id}/${
            JSON.parse(localStorage.getItem("user")).id
          }`
        )
        .then(({ data: { data } }) => {
          console.log(data);
          setLoading(true);
          setRecord(data);
          setLoading(false);
        })
        .catch((err) => {
          if (err?.response?.data?.msg) alert(err.response.data.msg);
          else alert(err.message);
          setLoading(false);
        });
    }
  }, []);
  return loading ? (
    "Loading..."
  ) : (
    <>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12 col-lg-12 col-sm-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Your Academic Record</h4>
                  <p class="card-category">
                    Here is a list of all your Academic Record
                  </p>
                </div>
                {record.length ? (
                  <table class="table">
                    <thead class=" text-primary">
                      <tr>
                        <ht>#</ht>
                        <th>Assignment Title</th>
                        <th>Obtain Marks</th>
                        <th>Total Marks</th>
                        {/* <th>Status</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {record
                        .sort(
                          (a, b) =>
                            new Date(b.updatedAt) - new Date(a.updatedAt)
                        )
                        .map(({ course }, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{course.title}</td>
                            <td>{course.obtainMarks}</td>
                            <td>{course.totalMarks}</td>
                            <td>
                              {/* {new Date(
                                obj.assignments.assignment.deadline
                              ).getTime() <
                              new Date(obj.assignments.submittedAt).getTime()
                                ? "Late Submission"
                                : "On-time submission"} */}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  "No Result Submitted yet"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcademinRecord;
