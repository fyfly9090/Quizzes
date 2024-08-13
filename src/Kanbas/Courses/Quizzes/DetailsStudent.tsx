import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import * as client from "./Editor/QuizzesTaken/client";
import * as questionclient from "./Editor/MakeQuizz/client"
import {setCurrentQuizzes, addQuizTaken, updateQuizTaken} from "./Editor/QuizzesTaken/quizTakenReducer";
import { useEffect, useState } from "react";
import { setQuestions } from "./Editor/MakeQuizz/TypeOfQuestions/questionsReducer";

export default function DetailsStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const { cid } = useParams();
   const { qid } = useParams() as { qid: string};
   
   const { currentUser } = useSelector((state:any) => state.accountReducer);
   const { quizzes } = useSelector((state:any)=>state.quizzesReducer);
   const { quizzesTaken } = useSelector((state:any) => state.quizTakenReducer);
   const { questions } = useSelector((state:any) => state.questionsReducer);
   const [currentQuestions, setCurrentQuestions] = useState(questions.filter((q:any) => q.quiz===qid));
   const fetchQuestions = async() => {
    const questions = await questionclient.findQuestionsByQuiz(qid as string);
    setCurrentQuestions(questions.filter((q:any) => q.quiz===qid))
    dispatch(setQuestions(questions));
  }
   const quiz = quizzes.find((q:any)=>q._id===qid); 
   const uid = currentUser._id;
   const maxiAttempts = quiz?quiz.mul_times:0;

   let newAnswers = Array() as string[];
   for(let i = 0; i < currentQuestions.length; i++) {
     newAnswers.push("");
   }

   const fetchQuizTaken = async() => {
     const myQuizzes = await client.fetchQuizTaken();
     dispatch(setCurrentQuizzes(myQuizzes));
   }
   const currentQuiz = quizzesTaken.find((cq:any)=>cq.user===uid&&cq.quiz===qid);
   const userAttempts = currentQuiz?currentQuiz.attempts:0;


   const createQuizTaken = async(quizTaken:any) => {
     const status = await client.createQuizTaken({...quizTaken, answers:newAnswers});
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
    fetchQuestions();
  },[])
 
   return (
    <div className="align-center pt-5">
        <button className="btn btn-danger mt-3 align-center p-3 px-5" onClick = {()=>maxiAttempts<=userAttempts?maxiout():(currentQuiz?
          saveQuizTaken({...currentQuiz, attempts: currentQuiz.attempts+1 }):
          createQuizTaken({quiz:qid, user:currentUser._id, attempts: 1, score:0, answers:newAnswers}))}>
            Take the Quiz
        </button>
    </div>
   ) 
}