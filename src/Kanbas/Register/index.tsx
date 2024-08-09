import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./registerReducer";
import * as client from "./client";
import { setAssignments } from "../Courses/Assignments/assignmentsReducer";
import { useEffect } from "react";

export default function RegisterCourses({courses}:{courses:any[]}) {
    const { currentUser } = useSelector((state:any) => state.accountReducer);     
    const { enrollments } =useSelector((state:any) => state.registerReducer);
    const dispatch = useDispatch();
    const fetchEnrollments = async() => {
      const enrollments = await client.fetchAllEnrollments();
      dispatch(setEnrollments(enrollments));
    }
    useEffect(()=>{
      fetchEnrollments();
    },[])
   
    console.log(enrollments)
    const currentEnrollments = enrollments.filter((e:any)=>e.user===currentUser.loginId);
    console.log(currentEnrollments)

   
   

    const createEnrollment = async(enrollment:any) => {
      const newEnrollment = await client.createEnrollment(enrollment);
      dispatch(addEnrollment(newEnrollment));
    }
    const removeEnrollment = async(cid:string, uid:string) => {
      await client.deleteEnrollment(cid, uid);
      dispatch(deleteEnrollment({user:uid, course:cid}))
    }
    const registeredCourses: any[] = [];
    for(let i = 0; i < currentEnrollments.length; i++) {
      let c = currentEnrollments[i].course;
      registeredCourses.push(courses.find((cs:any)=>cs.number===c));
    }

    const unregisteredCourse = courses.filter((c:any)=>!registeredCourses.find((rc:any)=>rc.number===c.number));
   
   

    return (
        <div id="wd-dashboard-courses" className="row">
        <h2>Unregistered Courses</h2>  
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {unregisteredCourse.map((course:any) => (
            <div className="wd-dashboard-course col margin-element" style={{ width: "300px"}}>
                <div className="card rounded-3 overflow-hidden" style={{height:"100%"}}>
                   <img src="/images/reactjs.jpg" height="{160}" />
                   <div className="card-body">
                      <span className="wd-dashboard-course-link" style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                        {course.name} 
                      </span> 
                      <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                       {course.description}</p>
                      <button onClick={() => {
                                createEnrollment({_id:"0", user:currentUser.loginId, course:course.number}); 
                              }}
                              className="btn btn-warning me-2 float-end">
                              Register  
                      </button>
                   </div> 
                </div> 
            </div>
          ))}
        </div>
        <h2 className="mt-4">Registered Courses</h2>  
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {registeredCourses.map((course:any) => (
            <div className="wd-dashboard-course col margin-element" style={{ width: "300px"}}>
                <div className="card rounded-3 overflow-hidden" style={{height:"100%"}}>
                   <img src="/images/reactjs.jpg" height="{160}" />
                   <div className="card-body">
                      <span className="wd-dashboard-course-link" style={{textDecoration: "none", color: "navy", fontWeight: "bold"}}>
                        {course.name} 
                      </span> 
                      <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                       {course.description}</p>
                      <button onClick={() => {
                               removeEnrollment(course.number, currentUser.loginId);
                               }} className="btn btn-danger float-end"
                               id="wd-delete-course-click">
                               Unregister
                      </button>
                   </div> 
                </div> 
            </div>
          ))}
        </div> 
      </div>
    )
}