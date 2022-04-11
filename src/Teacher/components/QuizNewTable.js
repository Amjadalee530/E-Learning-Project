import React from "react";

export default function NewQuizTable(props) {
  const [quizes, setQuizes] = React.useState([]);
  React.useEffect(() => {
    if (props?.quizes?.course_material?.quizes) {
      setQuizes(props.quizes.course_material.quizes);
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
                  <h4 class="card-title ">Quiz List </h4>
                  <p class="card-category">Here is a list of all Quizes</p>
                </div>
                {quizes.length ? (
                  <>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <tr>
                              <th>No.</th>
                              <th>Title</th>
                              <th>Quiz</th>
                              <th>Start Date</th>
                              <th>Deadline</th>
                            </tr>
                          </thead>

                          <tbody>
                            {quizes
                              .sort(
                                (a, b) =>
                                  new Date(b.createdAt) - new Date(a.createdAt)
                              )
                              .map((quiz, i) => (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{quiz.title}</td>
                                  <td>
                                    <a
                                      href={quiz.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Link
                                    </a>
                                  </td>
                                  <td>
                                    {new Date(quiz.createdAt).toLocaleString()}
                                  </td>
                                  <td>
                                    {new Date(quiz.deadline).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  "No Quizes Uploaded Yet."
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
