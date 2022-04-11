import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../Admin/form.css";

const Announcements = (props) => {
  const [description, setDescription] = useState();
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  useEffect(() => {
    setCourse(props.course);
  }, []);

  const submitRequest = async (cb) => {
    const body = { title, description };
    console.log("A", course);
    try {
      const {
        data: { data },
      } = await axios.post(
        "http://localhost:5000/course-material/upload-announcements/" +
          course._id,
        body
      );

      console.log("DATA", data);
      setCourse({ ...course, course_material: { ...data } });
      setDescription("");
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
    await submitRequest(() => alert("Announcement successfully added"));
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
                <form onSubmit={handleSubmit} className="container">
                  <div className="form-group">
                    <label for="title">Announcement Title</label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-control"
                      id="title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="ann">Announcement Description</label>
                    <textarea
                      rows="7"
                      type="text"
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                      id="ann"
                      required
                    />
                  </div>

                  <button className="btn btn-default">Add Announcement</button>
                </form>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <AnnouncementList course={course} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function AnnouncementList({ course }) {
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title ">Announcements List </h4>
              </div>
              {course &&
              course.course_material &&
              course.course_material.announcements.length ? (
                <>
                  <p className="card-category">
                    Here is a list of all Announcements
                  </p>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Announcement Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {course.course_material.announcements
                            .sort(
                              (a, b) =>
                                new Date(b.createdAt) - new Date(a.createdAt)
                            )
                            .map((lecture, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{lecture.title}</td>
                                <td>{lecture.description}</td>
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
                "No Announcements Available yet."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
