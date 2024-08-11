import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import * as client from "./Editor/QuizzesTaken/client";
import {setCurrentQuizzes, addQuizTaken, updateQuizTaken} from "./Editor/QuizzesTaken/quizTakenReducer";
import { useEffect, useState } from "react";

export default function DetailsStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { cid } = useParams();
   const { qid } = useParams() as { qid: string};
   
   const { currentUser } = useSelector((state:any) => state.accountReducer);
   const { quizzes } = useSelector((state:any)=>state.quizzesReducer);
   const { quizzesTaken } = useSelector((state:any) => state.quizTakenReducer);

   const quiz = quizzes.find((q:any)=>q._id===qid); 
   const uid = currentUser._id;
   const maxiAttempts = quiz?quiz.mul_times:0;

   const fetchQuizTaken = async() => {
     const myQuizzes = await client.fetchQuizTaken();
     dispatch(setCurrentQuizzes(myQuizzes));
   }
   const currentQuiz = quizzesTaken.find((cq:any)=>cq.user===uid&&cq.quiz===qid)

   const createQuizTaken = async(quizTaken:any) => {
     const status = await client.createQuizTaken(quizTaken);
     dispatch(addQuizTaken(quizTaken));
     navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)

   }

   const saveQuizTaken = async(inQuiz:any) => {
    let att = inQuiz.attempts+1;
     const status = await client.updateQuizTaken({...inQuiz,attempts:att});
     dispatch(updateQuizTaken(inQuiz));
     navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)
   }

   const maxiout = () => {
    alert("You have reached maximum attempts!")
  }
   useEffect(()=> {
    fetchQuizTaken();
  },[])
 
   return (
    <div className="align-center pt-5">
        <button className="btn btn-danger mt-3 align-center p-3 px-5" onClick = {()=>maxiAttempts<currentQuiz.attempts?maxiout():(currentQuiz?
          saveQuizTaken({...currentQuiz, attempts: currentQuiz.attempts+1 }):
          createQuizTaken({quiz:qid, user:currentUser._id, attempts: 1}))}>
         {/*  <Link className= "text-decoration-none text-white font-size-xx-large" key={qid} 
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`}> */}
            Take the Quiz
         {/*  </Link> */}
        </button>
    </div>
   ) 
}