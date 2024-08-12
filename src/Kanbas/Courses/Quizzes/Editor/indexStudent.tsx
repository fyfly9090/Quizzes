import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import * as client from "./MakeQuizz/client"
import { setQuestions } from "./MakeQuizz/TypeOfQuestions/questionsReducer";
import * as quizClient from "./QuizzesTaken/client";
import { setCurrentQuizzes, updateQuizTaken } from "./QuizzesTaken/quizTakenReducer";

export default function StudentQuizDetails() {

  const { questions } = useSelector((state:any) => state.questionsReducer);
  const { quizzesTaken } = useSelector((state:any) => state.quizTakenReducer);
  const { currentUser } = useSelector((state:any) => state.accountReducer);
  const {qid} = useParams();
  const dispatch = useDispatch();

  const [currentQuestions, setCurrentQuestions] = useState(questions.filter((q:any) => q.quiz===qid));
  const [inQuiz, setInQuiz] = useState<any>();
  const fetchQuestions = async() => {
    const questions = await client.findQuestionsByQuiz(qid as string);
    setCurrentQuestions(questions.filter((q:any) => q.quiz===qid))
    dispatch(setQuestions(questions));

  }
  const fetchQuizTaken = async() => {
    const quizzesTaken = await quizClient.fetchQuizTaken();
    setInQuiz(quizzesTaken.find((qt:any) => qt.user===currentUser._id&&qt.quiz===qid));
    dispatch(setCurrentQuizzes(quizzesTaken));
  }
 
  console.log(inQuiz)
  const length = currentQuestions.length;
  const a = 0;
  
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


  const updateStudentAnswer = (question:any) => {
    setCurrentQuestions(currentQuestions.map((q:any)=>q._id===question._id? question:q))
  }
 

  const [stuPoints, setStuPoints] = useState(a);
  const setStudentPoints = () => {
    let points = 0;
    for(let i = 0; i <currentQuestions.length; i++ ) {
      const answers = currentQuestions[i].answers;
      for(let j = 0; j < answers.length; j++) {
        
        if(answers[j].type==="Correct Answer" && currentQuestions[i].studentAnswer===answers[j].value) {
          points=points+parseInt(currentQuestions[i].points);
          break;
        }
      }
    }
    setStuPoints(points);
  }

  const userAnswers: any[] = [];
  const setUserAnswers = () => {
  for(let i = 0; i < currentQuestions.length; i++) {
    userAnswers.push(currentQuestions[i].studentAnswer?currentQuestions[i].studentAnswer:"");
  }
 }

 const saveQuizTaken = async(inQuiz:any) => {
   setUserAnswers();
   const status = await quizClient.updateQuizTaken({...inQuiz, answers: userAnswers});
   dispatch(updateQuizTaken(inQuiz));
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
                               onClick={()=>{updateStudentAnswer({...currentQuestions[i], studentAnswer:ans.value})}} 
                               checked={ans.value===currentQuestions[i].studentAnswer}
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
                                  onClick={()=>updateStudentAnswer({...currentQuestions[i], studentAnswer:"True"})
                                                } 
                                  checked={"True"===currentQuestions[i].studentAnswer}
                          />
                          <label className="form-check-label ps-3" htmlFor="rs1">True</label>
                        </div> 
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="rs2" value="false"
                                 onClick={()=>updateStudentAnswer({...currentQuestions[i], studentAnswer:"False"})
                                               } 
                                 checked={"False"===currentQuestions[i].studentAnswer}
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
                          onChange={(e)=> updateStudentAnswer({...currentQuestions[i], studentAnswer:e.target.value})
                                           }
                          value={currentQuestions[i].studentAnswer}/>
                        </div>
                    </div>
                    }
                </fieldset>
            </div>
            <div className="width-adj">
                <button className="btn btn-secondary" onClick={()=>{setIndex(i-1<0?0:i-1);setStudentPoints()}}>Previous</button>  
                <button className="btn btn-danger float-end ms-2">Exit</button>  
                <button className="btn btn-primary float-end" onClick={()=>{setIndex(i+1>length-1?length-1:i+1);setStudentPoints()}} >Next</button>
               
            </div> 
            </>
            }
        </div>
  )

}
