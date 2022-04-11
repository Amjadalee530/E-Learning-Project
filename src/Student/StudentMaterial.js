import React, { useEffect, useState } from "react";
import "../Admin/form.css";

const StudentMaterial = (props) => {
  const [course, setCourse] = useState({});
  useEffect(() => {
    setCourse(props.course);
  }, []);
  return (
    <div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <Lectures course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Lectures({ course }) {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title ">Materials List </h4>
              </div>
              {course &&
              course.course_material &&
              course.course_material.lectures.length ? (
                <>
                  <p className="card-category">
                    Here is a list of all Materials
                  </p>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Lecture</th>
                            <th>Uploaded At</th>
                          </tr>
                        </thead>

                        <tbody>
                          {course.course_material.lectures
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            .map((lecture, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{lecture.title}</td>
                                <td>
                                  <a
                                    href={
                                      "http://localhost:5000" + lecture.filePath
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download File
                                  </a>
                                </td>
                                <td>
                                  {new Date(lecture.createdAt).toDateString()}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                "No Lectures uploaded Yet."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMaterial;
