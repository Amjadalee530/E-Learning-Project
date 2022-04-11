import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./Admin/Menu.js";

import Studentlogin from "./Student/Studentlogin.js";
import StuProfile from "./Student/StuProfile.js";
import Studentsignup from "./Student/Studentsignup.js";
import StudentDashboard from "./Student/StudentDashboard.js";
import JoinClassByStudent from "./Student/JoinClassByStudent";
import ChangepassStu from "./Student/ChangepassStu";
import AttemptAssignmentByStu from "./Student/AttemptAssignmentByStu";
import AttemptExamByStu from "./Student/AttemptExamByStu";
import AttemptQuizByStu from "./Student/AttemptQuizByStu";
import JoinAudioMeetingByStu from "./Student/JoinAudioMeetingByStu";
import JoinVideoMeetingByStu from "./Student/JoinVideoMeetingByStu";
import JoinChatMeetingByStu from "./Student/JoinChatMeetingByStu";
import NotificationsStu from "./Student/NotificationsStu";

import Teacherlogin from "./Teacher/Teacherlogin.js";
import TeacherProfile from "./Teacher/TeacherProfile.js";
import Teachersignup from "./Teacher/Teachersignup.js";
import TeacherDashboard from "./Teacher/TeacherDashboard.js";
import Changepasstea from "./Teacher/Changepasstea.js";
import CclassByTeacher from "./Teacher/CclassByTeacher";
import ListAllClassesByTea from "./Teacher/ListAllClassesByTea";
import ManageStuByTeacher from "./Teacher/ManageStuByTeacher";
import AddstuByTeacher from "./Teacher/AddstuByTeacher";
import DeletestuByTeacher from "./Teacher/DeletestuByTeacher";
import CreatAssignmentByTeacher from "./Teacher/CreatAssignmentByTeacher";
import CreatExamByTeacher from "./Teacher/CreatExamByTeacher";
import CreatQuizByTeacher from "./Teacher/CreatQuizByTeacher";
import CreatSubgroupByTeacher from "./Teacher/CreatSubgroupByTeacher";
import UploadAssessmentByTeacher from "./Teacher/UploadAssessmentByTeacher";
import EvaluteStuByTeacher from "./Teacher/EvaluteStuByTeacher";
import AddMarks from "./Teacher/AddMarks";
import ListstubyTeacher from "./Teacher/ListstubyTeacher";
import ClassDetails from "./Teacher/ClassDetails";

import Login from "./Admin/AdminLogin.js";
import Signup from "./Admin/Signup.js";
import Dashboard from "./Admin/Dashboard.js";
import ManageuserByAdmin from "./Admin/ManageuserByAdmin";
import ManageStuByAdmin from "./Admin/ManageStuByAdmin";
import ManageTeaByAdmin from "./Admin/ManageTeaByAdmin";
import ManageClassbyAdmin from "./Admin/ManageClassbyAdmin";
import AddStuByAdmin from "./Admin/AddStuByAdmin";
import DeleteStuByAdmin from "./Admin/DeleteStuByAdmin";
import AddteaByAdmin from "./Admin/AddteaByAdmin";
import DeleteTeaByAdmin from "./Admin/DeleteTeaByAdmin";
import CclassByAdmin from "./Admin/CclassByAdmin";
import ListAllclassesByAdmin from "./Admin/ListAllclassesByAdmin";
import Changepass from "./Admin/Changepass";
import Notifications from "./Admin/Notifications";
import AddStudentToClass from "./Admin/AddStudentToClass";
import AssignTeacherToClass from "./Admin/AssignTeacherToClass";
import ManageStudentAndClass from "./Admin/ManageStudentAndClass";
import ClassDetailsForStudent from "./Student/ClassDetailsForStudent";
import ShowStudentSubmission from "./Teacher/ShowStudentSubmission";
import UserProfile from "./UserProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Login} />

        <Route path="/stuprofile" exact component={StuProfile} />
        <Route path="/studentsignup" exact component={Studentsignup} />
        <Route path="/studentdashboard" exact component={StudentDashboard} />
        <Route path="/joinclassbystu" exact component={JoinClassByStudent} />
        <Route
          path="/attemptassignmentbystu"
          exact
          component={AttemptAssignmentByStu}
        />
        <Route path="/attemptexambystu" exact component={AttemptExamByStu} />
        <Route path="/attemptquizbystu" exact component={AttemptQuizByStu} />
        <Route
          path="/joinaudiomeetingbystu"
          exact
          component={JoinAudioMeetingByStu}
        />
        <Route
          path="/joinvideomeetingbystu"
          exact
          component={JoinVideoMeetingByStu}
        />
        <Route
          path="/joinchatmeetingbystu"
          exact
          component={JoinChatMeetingByStu}
        />
        <Route path="/changepassstu" exact component={ChangepassStu} />
        <Route path="/notificationsstu" exact component={NotificationsStu} />

        <Route path="/teachersignup" exact component={Teachersignup} />
        <Route path="/teaprofile" exact component={TeacherProfile} />
        <Route path="/teacherdashboard" exact component={TeacherDashboard} />
        <Route path="/changepasstea" exact component={Changepasstea} />
        <Route path="/createclassbyteacher" exact component={CclassByTeacher} />
        <Route
          path="/listallclassesbyteacher"
          exact
          component={ListAllClassesByTea}
        />
        <Route
          path="/managestubyteacher"
          exact
          component={ManageStuByTeacher}
        />
        <Route path="/addstubyteacher" exact component={AddstuByTeacher} />
        <Route
          path="/deletestubyteacher"
          exact
          component={DeletestuByTeacher}
        />
        <Route
          path="/creatassignmentbyteacher"
          exact
          component={CreatAssignmentByTeacher}
        />
        <Route
          path="/createxambyteacher"
          exact
          component={CreatExamByTeacher}
        />
        <Route
          path="/creatquizbyteacher"
          exact
          component={CreatQuizByTeacher}
        />
        <Route
          path="/createsubgroupbyteacher"
          exact
          component={CreatSubgroupByTeacher}
        />
        <Route
          path="/uploadassessmentbyteacher"
          exact
          component={UploadAssessmentByTeacher}
        />
        <Route
          path="/evalutestudentbyteacher"
          exact
          component={EvaluteStuByTeacher}
        />
        <Route path="/addmarks" exact component={AddMarks} />
        <Route path="/liststubyteacher" exact component={ListstubyTeacher} />
        <Route path="/classdetails/:id" exact component={ClassDetails} />
        <Route
          path="/classdetailsforstudents/:id"
          exact
          component={ClassDetailsForStudent}
        />
        <Route path="/profile" component={UserProfile} />
        <Route
          path="/show-student-submission/:id"
          component={ShowStudentSubmission}
        />
        <Route path="/adminsignup" exact component={Signup} />
        <Route path="/admindashboard" exact component={Dashboard} />
        <Route path="/manageuserbyadmin" exact component={ManageuserByAdmin} />
        <Route
          path="/add-student-by-admin"
          exact
          component={ManageStuByAdmin}
        />
        <Route
          path="/add-teacher-by-admin"
          exact
          component={ManageTeaByAdmin}
        />
        <Route
          path="/manage-student-by-admin"
          exact
          component={ManageStudentAndClass}
        />
        <Route
          path="/manageclassbyadmin"
          exact
          component={ManageClassbyAdmin}
        />
        <Route
          path="/assign-teacher-to-class"
          exact
          component={AssignTeacherToClass}
        />
        <Route
          path="/add-student-to-class"
          exact
          component={AddStudentToClass}
        />
        <Route path="/addstubyadmin" exact component={AddStuByAdmin} />
        <Route path="/deletestubyadmin" exact component={DeleteStuByAdmin} />
        <Route path="/addteabyadmin" exact component={AddteaByAdmin} />
        <Route path="/deleteteabyadmin" exact component={DeleteTeaByAdmin} />
        <Route path="/createclassbyadmin" exact component={CclassByAdmin} />
        <Route
          path="/listallclassesbyadmin"
          exact
          component={ListAllclassesByAdmin}
        />
        <Route path="/changepass" exact component={Changepass} />
        <Route path="/notifications" exact component={Notifications} />
      </div>
    </Router>
  );
}

export default App;
