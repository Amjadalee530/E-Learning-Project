import React, { useEffect, useState } from "react";
import ModalofAddAssignment from "./ModalofAddAssignment";
import AssignmentTable from "./AssignmentTable";

export default function Classactivity(props) {
  const [modalShow1, setModalShow1] = React.useState(false);
  const [course, setCourse] = React.useState({});
  useEffect(() => {
    setCourse(props.course);
  }, [props]);
  const onPropChange = (latestData) => {
    console.log("parent prop", latestData);
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
            <i class="material-icons">add</i> Add Assignment
          </button>
          <ModalofAddAssignment
            addAssignment={onPropChange}
            course={course}
            show={modalShow1}
            onHide={() => setModalShow1(false)}
          />
        </div>
      </div>

      <AssignmentTable assignments={course} />
    </div>
  );
}
