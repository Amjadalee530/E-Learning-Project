import axios from "axios";
import React from "react";

export default function QuizTable(props) {
  const [quizes, setQuizes] = React.useState([]);
  const [file, setFile] = React.useState();

  React.useEffect(() => {
    if (props?.quizes?.course_material?.quizes) {
      setQuizes(props.quizes.course_material.quizes);
    }
  }, []);

  const handleSubmit = async (e, quiz) => {
    e.preventDefault();
    if (!file) return alert("Please upload quiz file");
    try {
      //  setLoading(true);
      const courseId = props.quizes._id;
      const body = new FormData();
      body.append(
        "studentId",
        localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).id
          : null
      );
      body.append("quiz", file);
      body.append("quizObject", JSON.stringify(quiz));
      const res = await axios.post("/student-submit/quiz/" + courseId, body);
      if (res.status === 201) {
        setFile(null);
        alert("Quiz submitted");
      }
      //  setLoading(false);
    } catch (error) {
      if (error?.response?.data?.msg) {
        alert(error.response.data.msg);
      } else alert(error.message);
      //  setLoading(false);
    }
  };

  // const timeRemaining = (end) => {
  //   let endTime = new Date(end) / 1000;
  //   let elapsed = new Date() / 1000;
  //   let totalSec = endTime - elapsed;
  //   let h = parseInt(totalSec / 3600);
  //   // var m = parseInt( totalSec / 60 ) % 60;
  //   // var s = parseInt(totalSec % 60, 10);
  //   return h + " hours remaining. ";
  // };
  // setClock();
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
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <tr>
                              <th>No.</th>
                              <th>Title</th>
                              <th>Quiz Form</th>
                              {/* <th>Start Date</th> */}
                              <th>Deadline</th>
                              {/* <th>Status</th> */}
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
                                      Open
                                    </a>
                                  </td>
                                  {/* <td>
                                    {new Date(quiz.createdAt).toLocaleString()}
                                  </td> */}
                                  <td>
                                    {new Date(quiz.deadline).toLocaleString()}
                                  </td>
                                  {/* <td>
                                    {new Date(quiz.deadline).getTime() <
                                    new Date(quiz.createdAt).getTime()
                                      ? "Expired"
                                      : timeRemaining(quiz.deadline)}
                                  </td> */}
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
