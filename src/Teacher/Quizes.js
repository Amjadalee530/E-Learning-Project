import React, { useEffect } from "react";
import NewQuizTable from "./components/QuizNewTable";
import QuizModal from "./QuizModal";

export default function Quizes(props) {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [course, setCourse] = React.useState({});
  useEffect(() => {
    setCourse(props.course);
  }, [props]);
  const onPropChange = (latestData) => {
    setCourse({ ...props.course, course_material: { ...latestData } });
  };
  return (
    <div class="container-fluid">
      <div
        class="row mt-4"
        style={{ marginRight: "-25px", marginLeft: "-30px" }}
      >
        <div
          class="col-sm-6"
          style={{ "justify-content": "left", "align-items": "left" }}
        >
          <button
            style={{ marginLeft: "427px" }}
            class="btn btn-primary btn-round"
            onClick={() => setModalShow1(true)}
          >
            <i class="material-icons">add</i> Add Quiz
          </button>
          <QuizModal
            addQuiz={onPropChange}
            course={course}
            show={modalShow1}
            onHide={() => setModalShow1(false)}
          />
        </div>
      </div>

      <NewQuizTable quizes={course} />
    </div>
  );
}
