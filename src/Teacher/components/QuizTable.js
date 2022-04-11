import React from "react";

export default function QuizTable(props) {
  const [quizes, setQuizes] = React.useState([]);
  React.useEffect(() => {
    if (props?.quizes?.course_material?.quizes) {
      setQuizes(props.quizes.course_material.quizes);
    }
  }, []);
  return (
    <div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="card">
                <div className="card-header card-header-primary">
                  <h4 className="card-title ">Quiz List </h4>
                </div>
                {quizes.length ? (
                  <>
                    <p className="card-category">
                      Here is a list of all Quizes
                    </p>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table">
                          <thead className=" text-primary">
                            <tr>
                              <th>No.</th>
                              <th>Title</th>
                              <th>Date</th>
                              <th>Section</th>
                              <th>Start Time</th>
                              <th>End Time</th>
                            </tr>
                          </thead>

                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Operator Overloading </td>
                              <td>12/12/21</td>
                              <td>8A</td>
                              <td>1:00 PM</td>
                              <td>1:30 PM </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  "No Quiz Uploaded"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
