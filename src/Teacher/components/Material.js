import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Admin/form.css";

const Material = (props) => {
  const [file, setFile] = useState();
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    setCourse(props.course);
  }, []);

  const submitRequest = async (cb) => {
    if (!file) return alert("Please select a lecture");
    const form = new FormData();
    form.append("title", title);
    form.append("lecture", file);
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:5000/course-material/upload-lecture/" + course._id,
        form
      );
      setCourse({ ...course, course_material: { ...data } });
      setFile(null);
      setTitle("");
      cb();
    } catch (error) {
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else alert(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRequest(() => alert("lecture successfully uploaded"));
  };
  return (
    <div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div
              style={{ marginTop: "14px" }}
              className="col-md-12 col-lg-12 col-sm-12"
            >
              <div className="form-group form-file-upload form-file-multiple">
                {/* <input type="file" multiple="" className="inputFileHidden" /> */}
                <form onSubmit={handleSubmit} className="container">
                  <div className="form-group">
                    <label for="title">Lecture Title</label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                      id="title"
                      required
                    />
                  </div>
                  <div class="form-group" style={{ height: "40px" }}>
                    <input
                      type="file"
                      accept=".pdf,.docx,.pptx"
                      name="img"
                      onChange={(e) => setFile(e.target.files[0])}
                      id="img"
                      required
                    />
                  </div>

                  <button className="btn btn-default">Add Lecture</button>
                </form>
              </div>
            </div>
          </div>
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
                <h4 className="card-title ">Lectures List </h4>
              </div>
              {course &&
              course.course_material &&
              course.course_material.lectures.length ? (
                <>
                  <p className="card-category">
                    Here is a list of all Lectures
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

export default Material;
