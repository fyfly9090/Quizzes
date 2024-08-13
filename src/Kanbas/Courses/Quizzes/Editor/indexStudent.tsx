import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as client from "./MakeQuizz/client"
import { setQuestions } from "./MakeQuizz/TypeOfQuestions/questionsReducer";
import * as quizClient from "./QuizzesTaken/client";
import { setCurrentQuizzes, updateQuizTaken } from "./QuizzesTaken/quizTakenReducer";
import { setCurrentQuiz } from "./QuizzesTaken/inQuizReducer";

export default function StudentQuizDetails() {

  const { questions } = useSelector((state:any) => state.questionsReducer);
  const { quizzesTaken } = useSelector((state:any) => state.quizTakenReducer);
  const { currentUser } = useSelector((state:any) => state.accountReducer);
  const { quizTaken } = useSelector((state:any) => state.quizTakenReducer);
  const {qid} = useParams() as { qid: string};
  const {cid} = useParams();
  const uid = currentUser._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentQuestions, setCurrentQuestions] = useState(questions.filter((q:any) => q.quiz===qid));
  const [inQuiz, setInQuiz] = useState(quizzesTaken.filter((qt:any) => qt.quiz===qid&&qt.user==uid));
  const length = currentQuestions.length;
  const a = 0;



  const fetchQuestions = async() => {
    const questions = await client.findQuestionsByQuiz(qid as string);
    setCurrentQuestions(questions.filter((q:any) => q.quiz===qid))
    dispatch(setQuestions(questions));

  }
  const fetchQuizTaken = async() => {
    const quizzesTaken = await quizClient.fetchQuizTaken();
    dispatch(setCurrentQuizzes(quizzesTaken));
    const quizTaken = quizzesTaken.find((qt:any)=>qt.user===uid&&qt.quiz===qid);
    dispatch(setCurrentQuiz(quizTaken));
    setInQuiz(quizTaken);

    setUserOldAnswers(quizTaken?quizTaken.answers:[]);
    console.log(quizTaken);
    console.log(inQuiz);

  }
  
  const [userOldAnswers, setUserOldAnswers] = useState<any>([]);
  
  
  
  const[i, setIndex] = useState(a);
  const multipleChoice = (aType:string) => {
      if(aType === "MultipleChoices") {
          return true;
      }
  }
  const trueOrFalse = (aType:string) => {
      if(aType === "TrueFalse") {
          return true;
      }
  }
  const fillInBlanks = (aType:string) => {
      if(aType === "FillInBlanks") {
          return true;
      }
  }

  console.log(currentQuestions)
  const [stuPoints, setStuPoints] = useState(a);
  const setStudentPoints = () => {
    let points = 0;
    for(let i = 0; i <currentQuestions.length; i++ ) {
      const answers = currentQuestions[i].answers;
      for(let j = 0; j < answers.length; j++) {
        if(answers[j].type==="Correct Answer" && userOldAnswers[i]===answers[j].value) {
          points=points+parseInt(currentQuestions[i].points);
          break;
        }
      }
    }
    setStuPoints(points);
  }
  console.log(userOldAnswers)

  const userAnswers: any[] = [];
  const setUserAnswers = () => {
  for(let i = 0; i < currentQuestions.length; i++) {
    userAnswers.push(currentQuestions[i].studentAnswer?currentQuestions[i].studentAnswer:"");
  }
 }

 const updateStudentAnswer = (answer:any, i:number) => {
  /* setCurrentQuestions(currentQuestions.map((q:any)=>q._id===question._id? question:q)) */
  let newAnswer = [...userOldAnswers];
  newAnswer[i] = answer;
  setUserOldAnswers(newAnswer);
  setInQuiz({...inQuiz,answers:userOldAnswers})
}


 const saveQuizTaken = async(inQuiz:any) => {
   setUserAnswers();
   const status = await quizClient.updateQuizTaken({...inQuiz, answers: userOldAnswers});
   console.log(inQuiz);
   dispatch(updateQuizTaken(inQuiz));
   navigate(`/Kanbas/Courses/${cid}/Quizzes`)
 }

  
  useEffect(()=>{
    fetchQuestions();
    fetchQuizTaken();
  }, [])


  return (
        <div className="mx-5 px-5">
          {(currentUser.role==="FACULTY")&&
            <div className="fload-end quizz-label font-size-larger">Scores:
              <span className="ms-2">{stuPoints}</span>
            </div>}
           
          {currentQuestions && currentQuestions.length>0 &&
            <>
            <div className="m-5">
              
                <fieldset className="wd-question-display p-3">
                    <legend>
                    {currentQuestions[i].description}
                    </legend>
                    {currentQuestions[i].answers.map((ans:any) => (
                    <>    
                      {multipleChoice(currentQuestions[i].type) &&     
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id={ans._id} value={ans.value} 
                               onClick={()=>{updateStudentAnswer(ans.value, i)}} 
                               checked={ans.value===userOldAnswers[i]}
                        />
                        <label className="form-check-label ps-3" htmlFor={ans._id}>
                            {ans.value}
                        </label>

                      </div>
                      }
                    </>
                    ))
                    }
                    
                    {trueOrFalse(currentQuestions[i].type) &&
                      <>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="rs1" value="true"
                                  onClick={()=>updateStudentAnswer("True", i)
                                                } 
                                  checked={"True"===userOldAnswers[i]}
                          />
                          <label className="form-check-label ps-3" htmlFor="rs1">True</label>
                        </div> 
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="rs2" value="false"
                                 onClick={()=>updateStudentAnswer("False", i)
                                               } 
                                 checked={"False"===userOldAnswers[i]}
                          />
                          <label className="form-check-label ps-3" htmlFor="rs2">False</label>
                        </div>
                     </> 
                    }
                    
                    {fillInBlanks(currentQuestions[i].type) && 
                    <div className="row mb-3">
                       <label htmlFor="r1" className="col-sm-2 col-form-label" >
                         Your Answer </label>
                        <div className="col-sm-10">
                          <input className="form-control" id="r1" 
                          onChange={(e)=> updateStudentAnswer(e.target.value, i)
                                           }
                          value={userOldAnswers[i]}/>
                        </div>
                    </div>
                    }
                </fieldset>
            </div>
            <div className="width-adj">
                <button className="btn btn-secondary" onClick={()=>{setIndex(i-1<0?0:i-1);setStudentPoints()}}>Previous</button>  
                <button className="btn btn-danger float-end ms-2" onClick={()=>saveQuizTaken({...inQuiz})}>Exit</button>  
                <button className="btn btn-primary float-end" onClick={()=>{setIndex(i+1>length-1?length-1:i+1);setStudentPoints()}} >Next</button>
            </div> 
            </>
            }
        </div>
  )

}
