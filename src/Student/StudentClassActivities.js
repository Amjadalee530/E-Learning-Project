import React from "react";
import ExamTable from "./ExamTable";
import AssignmentTable from "./AssignmentTable";
import QuizTable from "./QuizTable";
// import ModalofAddAssignment from "../Teacher/components/ModalofAddAssignment";
// import ModalofAddExam from "../Teacher/components/ModalofAddExam";
// import ModalofAddQuiz from "../Teacher/components/ModalofAddQuiz";
//   const [modalShow, setModalShow] = React.useState(false);
//   const [modalShow1, setModalShow1] = React.useState(false);
//   const [modalShow2, setModalShow2] = React.useState(false);

export default function StudentClassActivities(props) {
  return (
    <div>
      <div class="content">
        <div class="container-fluid">
          <div
            class="row mt-4"
            style={{ marginRight: "-25px", marginLeft: "-30px" }}
          ></div>

          <div class="row mt-4">
            <div
              class="col-sm-6"
              style={{ "justify-content": "left", "align-items": "left" }}
            >
              <QuizTable quizes={props.course} />
            </div>

            <div
              class="col-sm-6"
              style={{ "justify-content": "left", "align-items": "left" }}
            >
              <AssignmentTable assignments={props.course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
