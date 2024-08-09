import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function QuizzesControls({course_id}: {course_id: any;}) {
  const cid = course_id;
  
  return (
    <div id="wd-quizzes-controls" className="text-nowrap lowest-width pb-2 quizz-control-border">
      
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-quizz-butt me-1 float-end px-2 ms-1"> 
        <IoEllipsisVertical className="position-relative me-0" /> 
      </button>
      <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger float-end">
        <Link key={`/Kanbas/Courses/${cid}/Quizzes/0/edit`} to={`/Kanbas/Courses/${cid}/Quizzes/0/edit`} id="wd-add-quiz"
        className = "add-assignment-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
         Quiz
        </Link>
      </button>
      <div className="btn btn-lg me-1 float-front has-search ps-0">
        <input type="text" className="form-control ps-1" placeholder="Search for Quiz" />
      </div>        
    </div>  

  );
}