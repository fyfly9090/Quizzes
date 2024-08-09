import GradesControls from "./GradesControls";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { useParams } from "react-router";
import * as db from "../../Database";
import AllStudents from "./AllStudents";

export default function Grages() {
  const {cid} = useParams() as {cid: string};

  const assignments = db.assignments;
  const assignments_course = assignments.filter((assignment: any) => assignment.course === cid);

  const enrollments = db.enrollments;
 /*  const users = db.users; */
  const usersID = enrollments.filter((enrollment: any) => enrollment.course === cid);

  
    return (
        <div id="grades-page">
          <ul className="list-group rounded-0">
            <li className="list-group-item border-0"><GradesControls /></li>
            <li className="list-group-item border-0 pt-0">
              <div className="row ">
                <div className="col-sm-8 pe-1">
                  <label htmlFor="student-name" className="form-label fw-bold font-size-md text-nowrap">Student Names</label>
                  <div className="input-group" id="student-name">
                    <span className="input-group-text transparent-element border-right-0"><PiMagnifyingGlassLight /></span>
                    <input className="form-control input-width" placeholder="Search Students"/>
                    <span className="input-group-text transparent-element border-left-0">
                    <IoIosArrowDown className="position-relative mx-2 " style={{ bottom: "1px" }}/>
                    </span>
                  </div>              
                </div>
                <div className="col-sm-8 pr-1">
                  <label htmlFor="student-name" className="form-label fw-bold font-size-md text-nowrap">Assignment Names</label>
                  <div className="input-group" id="student-name">
                    <span className="input-group-text transparent-element border-right-0"><PiMagnifyingGlassLight /></span>
                    <input className="form-control input-width" placeholder="Search Assingments"/>
                    <span className="input-group-text transparent-element border-left-0">
                    <IoIosArrowDown className="position-relative mx-2 " style={{ bottom: "1px" }}/>
                    </span>
                  </div>              
                </div>            
              </div> 
            </li>
            <li className="list-group-item border-0 pt-0">
              <div className="font-size-large py-2 btn-apply-style">
                <FiFilter className="position-relative mx-1 font-size-larger" style={{ bottom: "1px" }}/>
                Apply Filters
              </div>
            </li>
            <li className="list-group-item border-0 pt-0 table-responsive">
              <div id="grade-table" className="table-responsive">
                <table className="table table-bordered list-table-border ">
                  <thead>
                    <tr>
                    <th className="align-left bg-color">Student Name</th>
                      {assignments_course && assignments_course.map(assign => (
                        <th className="table-content bg-color"><div>{assign.title}</div><div>Out of {assign.points}</div></th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                      {usersID && usersID.map(stu => (
                        <AllStudents uid={stu.user} assignments={assignments_course}/>
                      ))}
                  </tbody>
                </table>

              </div>
            </li>
          </ul>

        </div>
    );
}