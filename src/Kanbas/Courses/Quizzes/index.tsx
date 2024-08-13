import QuizzesControls from "./QuizzesControls";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheck from "../Assignments/GreenCheck";
import React, {MouseEvent, useEffect, useState} from 'react';
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuizAction from "./QuizAction";
import * as client from "./client";
import { setQuizzes } from "./quizzesReducer";
import * as userClient from "../../Account/client";
import { setCurrentUser } from "../../Account/accountReducer";
import { AiOutlineStop } from "react-icons/ai";

export default function Quizzes () {
    const { cid } = useParams();
    const { quizzes } = useSelector((state:any)=>state.quizzesReducer);
    const { currentUser } = useSelector((state:any) => state.accountReducer);
    const dispatch = useDispatch();

    const currentQuiz = quizzes.filter((q:any) => q.course===cid);
    const ConvertToDate = (date:any) =>{
      if(date instanceof Date) {
        return date;
      } else {
        return new Date(date);
      }
    }

    const fetchQuizzes = async() => {
      const quizzes = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(quizzes))
    }


    const fetchProfile = async () => {
      const account = await userClient.profile();
      setCurrentUser(account);
    }  
    const initialContextMenu = {
      show: false,
      x: 0,
      y: 0,
    }
    const [contextMenu, setContextMenu] = useState(initialContextMenu);
    const [quiz_Id, setQuizId] = useState("");
    const [course_Id, setCourseId] = useState("");
    
    const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
      e.preventDefault();

      const {pageX, pageY} = e
      setContextMenu({show: true, x: pageX, y: pageY});
    }

    const contextMenuClose = () => setContextMenu(initialContextMenu);
   

    useEffect(()=> {
      fetchQuizzes();
      fetchProfile ();
    },[])

    return (
      <div>        
        {currentUser.role==="FACULTY"&&
        <>
        <QuizzesControls course_id={cid}/>
        <ul id="wd-wd-quizzes" className="list-group rounded-0">
          <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title wd-title p-3 ps-2 bg-gray">
              <IoMdArrowDropdown className="me-2 fs-3"/>
              <strong>Assginment Quizzes</strong>
            </div>
            
            {currentQuiz && currentQuiz.length > 0 && <>
            <ul className="wd-inquizzes list-group rounded-0">
              {quizzes
                 .filter((quiz: any) => quiz.course === cid)
                 .map((quiz: any) => (
                <li className="wd-assignment list-group-item p-3 ps-1 bordeh3r-left">
                 <div className="container-grid">                
                    <div className="col static-element"><BsGripVertical className="me-2 fs-3 centered-element" /></div>  
                    <div className="col static-element"><GiNotebook className="me-2 fs-3 text-success centered-element" /></div>
                    <div className="col static-element">
                      <span className="vertical-centered">
                        <Link key={quiz._id} to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quizz-link nounderline">
                        {quiz.title} </Link>
                        <div>
                          <span className="assignment-date d-flex">
                            
                            <span className="text-danger space-ele-right">{new Date(quiz.due).getTime()<new Date().getTime()? "Closed":
                            (new Date(quiz.available).getTime()<new Date().getTime() && new Date(quiz.due).getTime()>new Date().getTime() ?
                            "Available":`Not available until ${ConvertToDate(quiz.available).toLocaleString('default', {month:'long'})} 
                            ${ConvertToDate(quiz.available).getDate()+1} 
                            ${ConvertToDate(quiz.available).getFullYear()}`)}</span>| 
          
                            <strong className="space-ele-left space-sm-right"> Available</strong> 
                            <span className="space-ele-right"> {ConvertToDate(quiz.available).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(quiz.available).getDate()+1} {" "} 
                              {ConvertToDate(quiz.available).getFullYear()} {"at"} {"12:00AM"}</span>|
                            <strong className="space-ele-left space-sm-right">Due</strong>
                            <span className="space-ele-right">{ConvertToDate(quiz.due).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(quiz.due).getDate()+1} {" "} 
                              {ConvertToDate(quiz.due).getFullYear()} {"at"} {"11:59PM"}</span>| 
                            <span className="space-ele-left space-sm-right">{quiz.points===0?"0":quiz.points}{" "}pts</span>|
                            <span className="space-ele-left">{quiz.noOfQuestions===0?"0":quiz.noOfQuestions}{" "}question(s)</span>
                          
                            {currentUser.role==="STUDENT"&& <span className="space-ele-left">
                              Scores: 0 out of {quiz.points.toString()}{" "}points</span>}
                            
                          </span> 
                        </div> 
                      </span>
                    </div>  
                    <div className="col static-element">
                      {quiz.publish&&<GreenCheck />}
                      {!quiz.publish&&<AiOutlineStop className="text-danger fw-500"/>}        
                    </div>
                    <div className="col static-element" onClick = {(e)=>{handleContextMenu(e); setQuizId(quiz._id); setCourseId(quiz.course)}}>
                        <IoEllipsisVertical className="position-relative fs-4 mx-3 mt-2" />  
                    </div>
                  </div>   
                </li>
              ))}
            </ul> 
            </>} 
          </li>
          {(!currentQuiz || currentQuiz.length === 0) && <h3>Click Add Quiz button at the top to create quiz</h3>}
        </ul>
        </>
        }
        {contextMenu.show && <QuizAction x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} 
                                         quizId={quiz_Id} courseId={course_Id}/>}
        {currentUser.role === "STUDENT" && 
        <ul id="wd-wd-quizzes" className="list-group rounded-0">
          <li className="wd-quizzes list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title wd-title p-3 ps-2 bg-gray">
              <IoMdArrowDropdown className="me-2 fs-3"/>
              <strong>Assginment Quizzes</strong>
            </div>
            {quizzes
                 .filter((quiz: any) => (quiz.course === cid&&quiz.publish))
                 .map((quiz: any) => (
                <li className="wd-assignment list-group-item p-3 ps-1 bordeh3r-left">
                 <div className="container-grid">                
                    <div className="col static-element"><BsGripVertical className="me-2 fs-3 centered-element" /></div>  
                    <div className="col static-element"><GiNotebook className="me-2 fs-3 text-success centered-element" /></div>
                    <div className="col static-element">
                      <span className="vertical-centered">
                        <Link key={quiz._id} to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quizz-link nounderline">
                        {quiz.title} </Link>
                        <div>
                          <span className="assignment-date d-flex">
                            <span className="text-danger space-ele-right">{new Date(quiz.due).getTime()<new Date().getTime()? "Closed":
                            (new Date(quiz.available).getTime()<new Date().getTime() && new Date(quiz.due).getTime()>new Date().getTime() ?
                            "Available":`Not available until ${ConvertToDate(quiz.available).toLocaleString('default', {month:'long'})} 
                            ${ConvertToDate(quiz.available).getDate()+1} 
                            ${ConvertToDate(quiz.available).getFullYear()}`)}</span>| 
          
                            <strong className="space-ele-left space-sm-right"> Available</strong> 
                            <span className="space-ele-right"> {ConvertToDate(quiz.available).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(quiz.available).getDate()+1} {" "} 
                              {ConvertToDate(quiz.available).getFullYear()} {"at"} {"12:00AM"}</span>|
                            <strong className="space-ele-left space-sm-right">Due</strong>
                            <span className="space-ele-right">{ConvertToDate(quiz.due).toLocaleString('default', {month:'long'})} 
                              {" "} {ConvertToDate(quiz.due).getDate()+1} {" "} 
                              {ConvertToDate(quiz.due).getFullYear()} {"at"} {"11:59PM"}</span>| 
                            <span className="space-ele-left space-sm-right">{quiz.points===0?"0":quiz.points}{" "}pts</span>|
                            <span className="space-ele-left">{quiz.noOfQuestions===0?"0":quiz.noOfQuestions}{" "}question(s)</span>
                          </span> 
                        </div> 
                      </span>
                    </div>  
                  </div>   
                </li>
              ))}
          </li>
        </ul>
        }
      </div>
      
    );
}