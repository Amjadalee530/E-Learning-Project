import axios from "axios";
import { useEffect, useState } from "react";
import uniqBy from "lodash.uniqby";

const Attendance = (props) => {
  const [attendanceList, setAttendanceList] = useState(null);
  const [loading, setLoading] = useState(false);
  async function fecthAttendance() {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await axios.get(
        `http://localhost:5000/attendance/${props.course._id}/${
          JSON.parse(localStorage.getItem("user")).id
        }`
      );
      let attendanceList = [];
      if (data) {
        data.attendanceRecord.forEach((a) => {
          const d = new Date(a.date).toLocaleDateString();
          attendanceList.push({
            ...a,
            date: d,
          });
        });
      }
      attendanceList = attendanceList.reverse();
      attendanceList = uniqBy(attendanceList, "date");
      attendanceList = attendanceList.reverse();
      setAttendanceList({ ...data, attendanceRecord: attendanceList });
      setLoading(false);
    } catch (error) {
      if (error?.response?.data?.msg) alert(error.response.data.msg);
      else alert(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    if (props.course) {
      fecthAttendance();
    }
  }, []);
  return (
    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="card">
              <div className="card-header card-header-primary">
                <h4 className="card-title ">Attendance List </h4>
              </div>

              {!loading && attendanceList ? (
                <>
                  <p className="card-category">
                    Here is a list of all Your Attendance.
                  </p>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className=" text-primary">
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Presence</th>
                          </tr>
                        </thead>

                        <tbody>
                          {attendanceList.attendanceRecord
                            // .sort(
                            //   (a, b) =>
                            //     new Date(b.createdAt) - new Date(a.createdAt)
                            // )
                            .map((att, i) => (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{new Date(att.date).toDateString()}</td>
                                <td>
                                  {att.attendanceStatus === "present" ? (
                                    <h6 style={{ color: "green" }}>P</h6>
                                  ) : (
                                    <h6 style={{ color: "red" }}>A</h6>
                                  )}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                "Attendance Sheet is updated yet."
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
