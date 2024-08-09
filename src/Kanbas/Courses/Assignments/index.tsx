import AssignmentsControls from "./AssignmentControls";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheck from "./GreenCheck";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { setAssignments, deleteAssignment } from "./assignmentsReducer";
import { FaTrash } from "react-icons/fa";
import AssignmentDelete from "./AssignmentDelete";
import * as client from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state:any) => state.assignmentsReducer);
    const [deleteId, setDeleteId] = useState<string>("");
    const dispatch = useDispatch(); 
    const ConvertToDate = (date:any) =>{
        if(date instanceof Date) {
          return date;
        } else {
          return new Date(date);
        }
    }
    const fetchAssignments = async() => {
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    }

    const removeAssignment = async(assignmentId: string) => {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };
   
    useEffect(() => {
      fetchAssignments();
    }, [])
    return (
      <div>
        <AssignmentsControls course_id={cid}/><br /><br />
        <ul id="wd-assignments" className="list-group rounded-0">
          <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title wd-title p-3 ps-2 bg-gray">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2 fs-3"/>
              <strong>ASSIGNMENTS</strong>
              <AssignmentsControlButtons />  
            </div>
            <ul className="wd-inassignments list-group rounded-0">
              {assignments
                 .filter((assignment: any) => assignment.course === cid)
                 .map((a: any) => (
                <li className="wd-assignment list-group-item p-3 ps-1 border-left">
                 <div className="container-grid">                
                    <div className="col static-element"><BsGripVertical className="me-2 fs-3 centered-element" /></div>  
                    <div className="col static-element"><GiNotebook className="me-2 fs-3 text-success centered-element" /></div>
                    <div className="col static-element">
                      <span className="vertical-centered">
                      <Link key={a._id} to={`/Kanbas/Courses/${cid}/Assignments/${a._id}`} className="wd-assignment-link nounderline">
                      {a.title} </Link>
                        <div> 
                          <span className="assignment-date d-flex">
                            <span className="text-danger space-ele-right">Multiple Modules</span>| 
                            <strong className="space-ele-left space-sm-right"> Not available until</strong> 
                            <span className="space-ele-right">{ConvertToDate(a.available).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(a.available).getDate()+1} {" "} 
                              {ConvertToDate(a.available).getFullYear()} {"at"} {"12:00AM"}</span>|
                              
                            <strong className="space-ele-left space-sm-right">Due</strong>
                            <span className="space-ele-right">{ConvertToDate(a.due).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(a.due).getDate()+1} {" "} 
                              {ConvertToDate(a.due).getFullYear()} {"at"} {"11:59AM"}</span>| 
                            <span className="space-ele-left">{a.points}{" "}pts</span>
                          </span> 
                        </div> 
                      </span>
                    </div>
                    <div className="col static-element delete-asst mt-2 pt-1">
                      <FaTrash data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" onClick={() => setDeleteId(a._id)}/>
                           <AssignmentDelete dialogTitle="Delete assignment" 
                            deleteAssignment={() =>{
                              removeAssignment(deleteId)
                              }}/>
                    </div> 
                    <div className="col static-element mt-3"><GreenCheck /></div>
                    <div className="col static-element"><IoEllipsisVertical className="fs-4 centered-right" /></div>
              
                  </div>   
                </li>
              ))}
            </ul>  
          </li>
        </ul>
      </div>

    );
    
}