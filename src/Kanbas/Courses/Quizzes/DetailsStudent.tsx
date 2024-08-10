import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import * as userClient from "../People/client";

export default function DetailsStudent() {
   const { cid,qid } = useParams();
   const { currentUser } = useSelector((state:any) => state.accountReducer);
   const [noOfAttempts, setNoOfAttempts] = useState(currentUser.quizzesTaken.numberOfAttempts); 
   const currentQuiz = {};
   const saveUser = async () => {
    const updatedUser = { ...currentUser, quizzesTaken: {...currentQuiz, quiz: qid, numberOfAttempts: noOfAttempts} };
    await userClient.updateUser(updatedUser);
  };

   return (
    <div className="align-center pt-5">
        <button className="btn btn-danger mt-3 align-center p-3 px-5" onClick = {()=>setNoOfAttempts(noOfAttempts+1)}>
          <Link className= "text-decoration-none text-white font-size-xx-large" key={qid} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`}>
            Take the Quiz
          </Link>
        </button>
    </div>
   ) 
}