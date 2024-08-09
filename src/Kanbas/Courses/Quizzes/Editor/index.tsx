import { useSelector} from "react-redux";  
import { IoEllipsisVertical } from "react-icons/io5";
import { AiOutlineStop } from "react-icons/ai";
import { Route, Routes, Navigate } from "react-router";
import QuizUpdates from "./MakeQuizz/DetailUpdates";
import TOQ from "./TOQ";
import Questions from "./MakeQuizz/Questions";
import { useParams } from "react-router-dom";

export default function QuizEditor() {
    const { questions } = useSelector((state:any) => state.questionsReducer);
 
       
    let totalPoints = 0;
    const { qid } = useParams();
    const questions_of_quiz = questions.filter((qt:any)=> qt.quiz === qid); 
    for(let i = 0; i < questions_of_quiz.length; i++) {
        totalPoints = totalPoints + parseInt(questions_of_quiz[i].points);
    } 

    const noOfQuestions = questions_of_quiz.length;
    
    return (
      <div id="wd-css-quiz-editor">
         <div className="quiz-edit-border">
           <button id="wd-quizz-edit-btn" className="btn btn-lg btn-quizz-butt me-1 float-end px-2 ms-1"> 
             <IoEllipsisVertical className="position-relative me-0" /> 
           </button>
           <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger float-end publish-quiz-btn">
             <AiOutlineStop className="stop-icon position-relative me-2" style={{ bottom: "1px" }}/>
              Not Published
           </button>
           <span className = "float-end mt-1 ms-3">{totalPoints}</span>
           <span className = "float-end mt-1">Points</span>
         </div>
         <div className="quiz-detail-font-size">
          <TOQ />
          <Routes>
            <Route path="/" element={<Navigate to="Details" />}/>
            <Route path="Details" element = {<QuizUpdates />} />
            <Route path="/Questions" element = {<Questions qPoints={totalPoints} noOfQuestions={noOfQuestions}/>}/>
          </Routes>
         </div>
      </div>
    )




}