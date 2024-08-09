import { FaPlus } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "../../quizzesReducer";
import { useEffect, useState } from "react";
import AllQuestions from "./TypeOfQuestions/AllQuestions";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteQuestion, editQuestion, setQuestions, updateQuestion } from "./TypeOfQuestions/questionsReducer";
import EditQuestionsList from "./EditQuestionsList";
import { IoIosSave } from "react-icons/io";
import { ImArrowRight } from "react-icons/im";
import * as client from "../../client";
import * as qtClient from "./client";

export default function Questions({qPoints, noOfQuestions} : {qPoints:number, noOfQuestions:number}) {
  const params = useParams();  
  const cid = params.cid;
    const quizId = params.qid === "0"? "0": params.qid as string;
    
    const { questions } = useSelector((state:any) => state.questionsReducer);
    const { quizzes } =useSelector((state:any) => state.quizzesReducer);
    const dispatch = useDispatch();
    const qz = quizzes.find((q:any) => q._id===quizId);
    
    const [answer, setAnswer] = useState<any>({
        _id:"0", type:"Possible Answer", value:"4"
    })

    const initialAnswers = [{
        _id:"0", type:"Possible Answer", value:""
    },{
        _id:"1", type:"Correct Answer", value:""
    },
    ];
    const [currentAnswers, setCurrentAnswers] = useState<any>(initialAnswers);

    const deleteAnswer = (answerId: string) => {
      setCurrentAnswers(currentAnswers.filter((ca:any)=>ca._id!==answerId));
    }

    const updateAnswer = (answer: any) => {
      setCurrentAnswers(currentAnswers.map((ca:any)=>(ca._id === answer._id? answer: ca))) 
    }

    const addAnswer = () => { 
      const newAnswer = {...answer, _id: new Date().getTime().toString()};
      setCurrentAnswers([...currentAnswers, {...answer, ...newAnswer}]);
    } 


    const [answerFill, setAnswerFill] = useState<any>({
        _id:"0", type:"Possible Answer", value:"4"
    })

    const initialFillAnswers = [{
        _id:"0", type:"Possible Answer", value:""
    },
    ];
    const [currentFillAnswers, setCurrentFillAnswers] = useState<any>(initialFillAnswers);
    const deleteAnswerFill = (answerId: string) => {
        setCurrentFillAnswers(currentFillAnswers.filter((ca:any)=>ca._id!==answerId));
    }
  
    const updateAnswerFill = (answer: any) => {
      setCurrentFillAnswers(currentFillAnswers.map((ca:any)=>(ca._id === answer._id? answer: ca))) 
    }
   
    const addAnswerFill = () => { 
        const newAnswer = {...answerFill, _id: new Date().getTime().toString()};
        setCurrentFillAnswers([...currentFillAnswers, {...answer, ...newAnswer}]);
    } 

    const [correctTrueAnswer, setCorrectTrueAnswer] = useState(false)
    const [correctFalseAnswer, setCorrectFalseAnswer] = useState(false)
    
    const[addAnswerVisible, setAddAnswerVisible] = useState(false);

    const saveQuiz = async(quiz:any) => {
      const status = await client.updateQuiz(quiz);
      dispatch(updateQuiz(quiz));
    }

    const fetchQuestions = async() => {
      const questions = await qtClient.findQuestionsByQuiz(quizId as string);
      dispatch(setQuestions(questions));
    }

    const removeQuestion = async(questionId: string) => {
      await qtClient.deleteQuestion(questionId);
      dispatch(deleteQuestion(questionId));
    }

    const saveQuestion = async(question:any) => {
      const status = await qtClient.updateQuestion(question);
      dispatch(updateQuestion(question));
    }

    useEffect(()=>{
      fetchQuestions();
    }, [])
  

    return (
        <div>
            <ul className="list-group">
              {questions
                .filter((qt:any)=>qt.quiz === quizId)
                .map((qt: any) => (
                  <>  
                {!qt.editing &&  
                   (<li className="list-group-item p-5">
                    <div className="float-end"><span className="me-2">Points:</span>{qt.points}</div><br/>
                    <div>
                     {qt.description}
                     <CiEdit className="float-end fs-4" onClick={()=>{dispatch(editQuestion(qt._id))}} />
                     <RiDeleteBin5Line className="float-end fs-4" onClick={()=>removeQuestion(qt._id)}/>
                     <ul className="list-group mt-3">
                        {qt.answers && (qt.type !=="TrueFalse") && qt.answers
                           .map((ans: any) => 
                           <li className="list-group-item">{ans.value}</li>
                          )
                           }
                        {qt.answers && (qt.type==="TrueFalse") &&
                           <>
                           <li className="list-group-item">True</li>
                           <li className="list-group-item">False</li>
                           </>} 
                     </ul>
                     </div>
                   </li>)}
                   {qt.editing && (
                    <>
                    <li className="list-group-item p-5">
                        <div className="float-end"><span className="me-2">Points:</span>
                          <input value={qt.points} onChange={(e)=>{saveQuestion({...qt, points: e.target.value});console.log(e.target.value)}}/>                    
                        </div><br/> <br/>                     
                        <input className="answer-label-style"
                          onChange={(e) => saveQuestion({...qt, description: e.target.value})} 
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveQuestion({ ...qt, editing:false })
                            }
                          }}
                        value={qt.description}/>
                        <CiEdit className="float-end fs-4" />
                        <RiDeleteBin5Line className="float-end fs-4" onClick={()=>removeQuestion(qt._id)}/>
                        <ul className="list-group mt-3">
                          {qt.answers && (qt.type !=="TrueFalse") && 
                           qt.answers.map((ans: any) => (
                            <EditQuestionsList ans={ans} qt={qt}/>))
                          }
                          {addAnswerVisible && 
                          <li className="list-group-item row">
                            <input className="answer-label-style col-4" value={answer.type} 
                                   onChange={(e)=>setAnswer({...answer, type:e.target.value})}/>
                            <input id = "aas1" className="answer-label-style col-7" 
                                   onChange={(e)=>setAnswer({...answer, value:e.target.value})}/>
                             <span className="col-1">
                               <IoIosSave className="float-end" onClick={()=>{saveQuestion({...qt, answers: [...qt.answers, {...answer, _id:new Date().getTime().toString()}]});
                                                                              setAddAnswerVisible(false)}}/>
                               <RiDeleteBin5Line className="float-end" onClick={()=>{setAddAnswerVisible(false)}}/>
                             </span>
                          </li>}



                          {qt.answers && (qt.type==="TrueFalse") &&
                            
                              <>
                              <div className={`${qt.answers[0].value==="True"? "text-success":""} row answer-list`}>
                                {(qt.answers[0].value==="True")&&<div className="col-2"><ImArrowRight className="me-2 float-end"/></div>}
                                {(qt.answers[0].value==="False")&&<div className="col-2"></div>}
                                <div className="col-10" onClick={()=>saveQuestion({...qt, answers:[{...qt.answers[0], value:"True"}]})}>True</div>
                             </div>
                             <div className={`${qt.answers[0].value==="False"? "text-success":""} row`}>
                                {(qt.answers[0].value==="False")&&<div className="col-2"><ImArrowRight className="me-2 float-end"/></div>}
                                {(qt.answers[0].value==="True")&&<div className="col-2"></div>}
                                <div className="col-10" onClick={()=>saveQuestion({...qt, answers:[{...qt.answers[0], value:"False"}]})}>False</div>
                             </div>
                             </>
                            }
                        </ul>
                        {(qt.type !=="TrueFalse") &&
                        <button className="font-color-red float-end add-answer-btn" onClick={()=>setAddAnswerVisible(true)}>
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                             Add Another Answer
                        </button>
                        }
                    </li>
                    
                    </>
                   )} 
                   </>
                ))}
            </ul>   
            <div id="wd-quiz-question" className="quiz-add-border">  
                <button className="btn btn-lg quiz-add-question my-4 pt-2"
                data-bs-toggle="modal" data-bs-target="#wd-add-question-dialog" >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                New Question
                </button>
            </div>
            <fieldset className="question-save-box mt-3">
                <button className="btn btn-light me-3">
                <Link key={quizId} to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit`} className="text-decoration-none text-black">
                  Cancel
                  </Link>
                </button>
                <button className="btn btn-danger" onClick={()=>saveQuiz({...qz, quiz: quizId, points:qPoints, noOfQuestions:noOfQuestions})}>
                   <Link key={quizId} to={`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit`} className="text-decoration-none text-black">
                    Save
                    </Link>
                </button>
            </fieldset>
           {/*  <MultipleChoice /> */}
            <AllQuestions  currentAnswers={currentAnswers} answer={answer} setAnswer={setAnswer} 
                          addAnswer={addAnswer} deleteAnswer={deleteAnswer} updateAnswer={updateAnswer}
                          currentFillAnswers={currentFillAnswers} answerFill={answerFill} setAnswerFill={setAnswerFill}
                          addAnswerFill={addAnswerFill} updateAnswerFill={updateAnswerFill} deleteAnswerFill={deleteAnswerFill}
                          correctFalseAnswer={correctFalseAnswer} correctTrueAnswer={correctTrueAnswer}
                          setCorrectFalseAnswer={setCorrectFalseAnswer} setCorrectTrueAnswer={setCorrectTrueAnswer}

                  />
  
            
        </div>
    )
    
}