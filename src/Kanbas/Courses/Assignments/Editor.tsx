import { LuCalendarDays } from "react-icons/lu";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { addAssignment, updateAssignment } from "./assignmentsReducer";
import { useSelector, useDispatch } from "react-redux";  
import * as client from "./client";



export default function AssignmentEditor(){
  const params = useParams();
  const id = params.id === "0" ? new Date().getTime().toString() : params.id;
  const cid = params.cid;
  const [assignmentName, setAssignmentName] = useState("");
  const { assignments } = useSelector((state:any) => state.assignmentsReducer);
  const dispatch = useDispatch(); 
  
  const createAssignment = async(assignment: any) => {
    const newAssginment = await client.createAssignment(cid as string, assignment);
    dispatch(addAssignment(newAssginment));
  }

  const saveAssignment = async(assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  }
  
  console.log(assignments)
  let cur = assignments.find((a:any) => a._id===id);
  let title = "New Assignment";
  let description = "New Assignment Description";
  let points = 100;
  let dueDate = "";
  let availableDate = "";
  
  if(cur && cur.title  && cur.description && cur.points && 
    cur.due && cur.available) {
      title=cur.title;
      description = cur.description;
      points = cur.points;
      dueDate = cur.due;
      availableDate = cur.available;
    }

  
  const [newTitle, setNewTitle] = useState(title==="New Assignment" ? "New Assignment": title);
  const [newDescription, setNewDescription] = useState(description==="New Assignment Description" ? 
                                                                      "New Assignment Description": description);
  const [newPoints, setNewPoints] = useState(points=== 100? 100:points);
  const [newDueDate, setNewDueDate] = useState(dueDate===""? "":dueDate);
  const [newAvailableDate, setNewAvailableDate] = useState(availableDate===""? "":availableDate);



  return (
    <div id="a2-css-styling-form">
      <div className="mb-3">
            <label htmlFor="input1" className="form-label">
              Assignment Name
            </label>
            <input className="form-control" id="input1" value={newTitle} 
                   onChange={(e) => setNewTitle(e.target.value)}/>
            <label htmlFor="input1" className="form-label" />
            <textarea className="form-control hide-resize" onChange={(e)=>setNewDescription(e.target.value)}>
              {newDescription}
            </textarea>   
          </div>
          <div className="mb-3 row">  
            <label htmlFor="points1" className="col-sm-4 col-form-label pt-0 label-element">Points</label>
            <div className="col-sm-8">
            <input id="points1" className="form-control hide-resize" type="number" value={newPoints}
                    onChange={(e) => setNewPoints(e.target.valueAsNumber)} />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label pt-0 label-element">Asginment Group</label>
            <div className="col-sm-8"> 
              <select id="wd-group" className="form-control form-select">
                <option value="QIZZE">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option selected>
                   ASSIGNMENTS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </div>
          </div> 
          <div className="mb-3 row">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label pt-0 label-element">Display Grade as</label>
            <div className="col-sm-8"> 
              <select id="wd-group" className="form-control form-select">
                <option value="EXACTGRADE">Exact Grade</option>
                <option selected>
                 Percentage</option>
              </select>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label pt-0 label-element">Submission Type</label>
            <div className="col-sm-8"> 
              <fieldset className="border p-3">
                <select id="wd-group" className="form-control form-select">
                  <option value="PAPER">Hardcopy</option>
                  <option selected>
                     Online</option>
                </select> 
                <legend className="col-form-label col-sm-2 w-auto py-3">
                  <strong>Online Entry Options</strong>
                </legend>
                <div className="form-check pb-3">
                  <input className="form-check-input" type="checkbox" id="r1"/>
                  <label className="form-check-label" htmlFor="r1">
                    Text Entry
                  </label>
                </div> 
                <div className="form-check pb-3">
                  <input className="form-check-input" type="checkbox" id="r1" checked/>
                  <label className="form-check-label" htmlFor="r1">
                    Website URL
                  </label>
                </div> 
                <div className="form-check pb-3">
                  <input className="form-check-input" type="checkbox" id="r1"/>
                  <label className="form-check-label" htmlFor="r1">
                    Media Recordings
                  </label>
                </div>  
                <div className="form-check pb-3">
                  <input className="form-check-input" type="checkbox" id="r1"/>
                  <label className="form-check-label" htmlFor="r1">
                    Student Annotation
                  </label>
                </div> 
                <div className="form-check pb-4">
                  <input className="form-check-input" type="checkbox" id="r1"/>
                  <label className="form-check-label" htmlFor="r1">
                    File Uploads
                  </label>
                </div> 
              </fieldset>    
            </div>
          </div>
          <div className="mb-element row">
            <label htmlFor="wd-group" className="col-sm-4 col-form-label pt-0 label-element">Assign</label>
            <div className="col-sm-8">
              <fieldset className="border p-3">
                <div>
                  <legend className="col-form-label col-sm-2 w-auto pt-2 pd-0 fw-bold">Assgin to</legend>
                  <fieldset className ="border p-1">
                    <button className ="button-style">
                      <span className="px-2">Everyone</span> 
                      <span className="ps-3 pe-1">x</span>
                    </button>
                  </fieldset>
                </div>
                <div className="pt-3">
                  <label className="fw-bold pt-2" htmlFor="duedate">Due</label>
                  <div className="input-group" id="duedate">
                    <input type="date" className="form-control" value={newDueDate} 
                           onChange ={(e) => setNewDueDate(e.target.value)}  />
                           
           
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-form-label pe-1">
                    <label className="fw-bold pt-2" htmlFor="startdate">Available from</label>
                      <div className="input-group pe-2" id="startdate">
                        <input type="date" className="form-control" value={newAvailableDate} 
                               onChange={(e) => setNewAvailableDate(e.target.value)} />
            
                      </div>
                  </div>
                  <div className="col-sm-6 col-form-label ps-1"> 
                    <label className="fw-bold pt-2" htmlFor="untildate">Until</label>
                    <div className="input-group pe-0" id="untildate">
                      <input type="date" className="form-control"  value = {newDueDate} onChange={(e) => setNewDueDate(e.target.value)}/>
      
                    </div>
                  </div>
                </div>
              </fieldset>       
            </div>
          </div>
          <div className="mb-3 tp-border text-nowrap ">
            <button className="btn btn-danger float-end mt-2" 
               onClick={() => params.id==="0"? createAssignment({ _id: id, title: newTitle, description: newDescription, 
                points: newPoints, due: newDueDate, available: newAvailableDate, course: cid }) : 
                saveAssignment({_id:id, title:newTitle, description:newDescription, points: newPoints,
                  due: newDueDate, available: newAvailableDate, course: cid})} > 
              <Link key={id} to={`/Kanbas/Courses/${cid}/Assignments`} className="wd-assignment-link add-assignment-btn ">
                Save
              </Link>                    
            </button>           
            
            <button className="btn btn-light float-end mt-2 me-1">
              <Link key={id} to={`/Kanbas/Courses/${cid}/Assignments`} className="wd-assignment-link cancel-assignment-btn">
                Cancel
              </Link> 
            </button>
          </div>
    </div>
);}
