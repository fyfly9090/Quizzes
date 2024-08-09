import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import registerReducer, { addEnrollment, deleteEnrollment, setEnrollments } from "../Register/registerReducer";
import RegisterCourses from "../Register";
import { useEffect, useState } from "react";
import * as client from "../Register/client"


export default function Dashboard({ courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, error }: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void; error: string})
  {  
     const { currentUser } = useSelector((state:any) => state.accountReducer);
     const { enrollments } = useSelector((state:any) => state.registerReducer);

     const fetchEnrollments = async() => {
     const enrollments = await client.fetchAllEnrollments();
      dispatch(setEnrollments(enrollments));
     }
   
     const currentEnrollments = enrollments.filter((e:any)=>e.user===currentUser._id&&currentUser._id);
     
     const registeredCourses = [];
     for(let i = 0; i < currentEnrollments.length; i++) {
      let c = currentEnrollments[i].course;
      registeredCourses.push(courses.find((cs:any)=>cs.number===c));
     }

     const [courseNum, setCourseNum] = useState("");
     const dispatch = useDispatch();
     const createEnrollment = async(enrollment:any) => {
      const newEnrollment = await client.createEnrollment(enrollment);
      dispatch(addEnrollment(newEnrollment));
    }
    const removeEnrollment = async(cid:string, uid:string) => {
      await client.deleteEnrollment(cid, uid);
      dispatch(deleteEnrollment({user:uid, course:cid}))
    }
     useEffect(()=>{
      fetchEnrollments();
      
     },[])
     return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr/>
            {(currentUser.role==="STUDENT")&&
              <>
              <a href="#/Kanbas/Register">Register Courses</a>
              <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                {registeredCourses.map((rc:any)=> (
                  <div className="wd-dashboard-course col margin-element" style={{ width: "300px"}}>
                    <Link key={course._id} to={`/Kanbas/Courses/${rc.number}/Home`} className="text-decoration-none">
                    <div className="card rounded-3 overflow-hidden" style={{height:"100%"}}>
                     <img src="/images/reactjs.jpg" height="{160}" />
                     <div className="card-body">
                        <span className="wd-dashboard-course-link" style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                          {rc.name} 
                        </span> 
                        <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                         {rc.description}</p>
                     </div> 
                    </div> 
                    </Link>
                  </div>
                ))}
                </div>
              </div>
              </>  }
           { (currentUser.role==="FACULTY") &&
            <>
            <h5>New Course
              {error && <div className="wd-error alert alert-danger">{error}</div>}
              <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={()=>{addNewCourse();createEnrollment({user:currentUser._id,course:courseNum})}} > Add </button>
              <button className="btn btn-warning float-end me-2"
                onClick={updateCourse} id="wd-update-course-click">
                Update
              </button>   
            </h5><br />
            <input value={course.number} className="form-control mb-2" 
                   onChange={(e) => {setCourse({...course, number:e.target.value});setCourseNum(e.target.value)}}/>
            <input value={course.name} className="form-control mb-2" 
                   onChange={(e) => setCourse({...course, name:e.target.value})}/>
            <textarea value={course.description} className="form-control"
                   onChange={(e) => setCourse({...course, description:e.target.value})}/><hr />
            <h2 id="wd-dashboard-published">Published Courses ({registeredCourses.length})</h2> <hr/>
            
            <div id="wd-dashboard-courses" className="row">
              <div className="row row-cols-1 row-cols-md-5 g-4">
                {registeredCourses.map((course) => (
                  <>
                  {course && 
                  (<div className="wd-dashboard-course col margin-element" style={{ width: "300px"}}>
                    <Link key={course._id} to={`/Kanbas/Courses/${course.number}/Home`} className="text-decoration-none">
                      <div className="card rounded-3 overflow-hidden" style={{height:"100%"}}>
                         <img src="/images/reactjs.jpg" height="{160}" />
                         <div className="card-body">
                            <span className="wd-dashboard-course-link" style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                              {course.name} 
                            </span> 
                            <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                             {course.description}</p>
                            <Link to={`/Kanbas/Courses/${course.number}/Home`}className="btn btn-primary">Go</Link>
                            <button onClick={(event) => {
                                     event.preventDefault();
                                     deleteCourse(course._id);
                                     removeEnrollment(course._id, currentUser._id)
                                     }} className="btn btn-danger float-end"
                                     id="wd-delete-course-click">
                                     Delete
                            </button>
                            <button onClick={(event) => {
                                      event.preventDefault();
                                      setCourse(course); 
                                    }}
                                    className="btn btn-warning me-2 float-end">
                                    Edit  
                            </button>
                         </div> 
                      </div>
                    </Link>    
                  </div>)
                }
                </>
                ))}
              </div>
            </div>
            </>
            }
        </div>
    );
}

