import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizzesDetails from "./Quizzes/Details";
import QuizEditor from "./Quizzes/Editor";
import { useSelector } from "react-redux";
import DetailsStudent from "./Quizzes/DetailsStudent";
import StudentQuizDetails from "./Quizzes/Editor/indexStudent";


export default function Courses({ courses }: { courses: any[]; }) {
  const {cid} = useParams();
  const course = courses.find((course) => course.number === cid);
  const { currentUser } = useSelector((state:any) => state.accountReducer);
  const { pathname } = useLocation();
    return (
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course?.name} &gt; {pathname.split("/")[4]}</h2>
        <hr />
        <div className="d-flex">
          <div className="d-none d-md-block">
            <CoursesNavigation />
          </div>
          <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Modules" element={<Modules />} />
              <Route path="/Assignments" element={<Assignments />} />
              <Route path="/Assignments/:id" element={<AssignmentEditor/>} />
              <Route path="/People" element={<PeopleTable />} />
              <Route path="/People/:uid" element={<PeopleTable />} />
              <Route path="/Grades" element={<h2>Grades</h2>} />
              <Route path="/Quizzes" element={<Quizzes />} />
              <Route path="/Quizzes/:qid" element={currentUser.role==="FACULTY"?<QuizzesDetails />:<DetailsStudent/>} />
              <Route path="Quizzes/:qid/edit/*" element={currentUser.role==="FACULTY"? <QuizEditor />:<StudentQuizDetails/>} />
              <Route path="/Quizzes/:qid/preview" element={<StudentQuizDetails/>} />
            </Routes>
          </div>
        </div>
      </div>
    );
}

