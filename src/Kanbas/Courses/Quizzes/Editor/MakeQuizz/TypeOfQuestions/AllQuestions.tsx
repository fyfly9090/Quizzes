import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuUnderline } from "react-icons/lu";
import { PiPencilSimpleLineLight, PiTextAUnderlineBold, PiTextItalic } from "react-icons/pi";
import { RiSuperscript2 } from "react-icons/ri";
import { TbLetterB } from "react-icons/tb";
import MultipleChoice from "./MultipleChoices";
import TrueOrFalse from "./TrueOrFalse";
import FillInBlanks from "./FillInBlanks";
import { Link, useParams } from "react-router-dom";
import { addQuestion } from "./questionsReducer";
import { useDispatch } from "react-redux";
import * as client from "../client";

export default function AllQuestions({currentAnswers, answer, setAnswer, addAnswer, deleteAnswer, updateAnswer, 
                                      currentFillAnswers, answerFill, setAnswerFill, addAnswerFill, deleteAnswerFill, updateAnswerFill,
                                      correctTrueAnswer, correctFalseAnswer, setCorrectTrueAnswer, setCorrectFalseAnswer}:
    {currentAnswers: any[], answer: any[], setAnswer:(answer: any)=>void, addAnswer:()=>void, deleteAnswer:(answer:any)=>void, 
      updateAnswer:(answer: any)=>void, currentFillAnswers: any[], answerFill: any, setAnswerFill: (answerFill: any)=>void, 
      addAnswerFill:()=>void, deleteAnswerFill:(answer:any)=>void,  updateAnswerFill:(answer:any)=>void,
    correctTrueAnswer: boolean, correctFalseAnswer: boolean, setCorrectTrueAnswer:(correctTrueAnswer:boolean)=>void, 
    setCorrectFalseAnswer:(correctFalseAnswer:boolean)=>void}) {
   /*  const id = new Date().getTime().toString();  */                                           
    const { cid, qid } = useParams();

  
    const [type, setType] = useState("MultipleChoices");
    const [points, setPoints] = useState(0);
    const [questionDescription, setQuestionDescription] = useState("");

    
    const [multipleChoice, setMultipleChoiceVisible] = useState(true);
    const [trueOrFalse, setTrueFalseVisible] = useState(false);
    const [FillInBlank, setFillInBlankVisible] = useState(false);

    
    const aValue = correctFalseAnswer?"False":"True";
    const TFAnswers = [{_id:"01", type:"Correct Answer", value:{aValue}}] 
    const dispatch = useDispatch();

    const createQuestion = async(question:any) => {
      const newQuestion = await client.createQuestion(qid as string, question);
      dispatch(addQuestion(newQuestion));
      console.log(newQuestion);
    }
    
    useEffect(() => {
        type === "MultipleChoices" ? setMultipleChoiceVisible(true) : setMultipleChoiceVisible(false);
        type === "TrueFalse" ? setTrueFalseVisible(true) : setTrueFalseVisible(false);
        type === "FillInBlanks" ? setFillInBlankVisible(true) : setFillInBlankVisible(false);
    }, [type]);

    return (
        <div id="wd-add-question-dialog" className="modal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                          <input type="text" value="Easy Question" className="question-input me-1"/>
                          <select id="wd-question" className="form-control form-select me-4 select-input-width" value={type}
                                   onChange={(e)=>setType(e.target.value)}>
                            <option value="MultipleChoices" selected>Multiple Choice </option>
                            <option value="TrueFalse">True/False </option>
                            <option value="FillInBlanks">Fill in the Blank </option>
                          </select>
                          <div className="select-pts-width">
                            <input id="quiz-points" type="number" className="wd-quiz-time float-end" value={points}
                            onChange={(e)=>setPoints(e.target.valueAsNumber)}/>
                            <label htmlFor="quiz-points" className="float-end pt-2 pe-1">pts:</label>
                          </div>
                    </div>
                    <div className="modal-body">
                       {multipleChoice && 
                        <div className="mb-2">Enter your question and multiple answers, then select the one correct answer.</div>}
                       {trueOrFalse &&
                        <div className="mb-2">Enter your question text, then select if True or False is the correct answer.</div>} 
                        {FillInBlank &&

                        <div className="mb-2">Enter your question text, then define all possible correct answers for the blank.</div>} 

                        <div className="fw-bold">Question:</div>
                        <div className="mt-3">
                            <span className="ps-4 pe-1">12pt</span><IoIosArrowDown className="font-color-lightgray"/>
                            <span className="ps-3 pe-1">Paragraph</span><IoIosArrowDown className="font-color-lightgray"/> 
                            <span className="ps-3 font-size-x-large font-color-lightgray">|</span>
                            <span className="ps-3"><TbLetterB className="font-size-x-large"/></span>
                            <span className="ps-4"><PiTextItalic className="font-size-x-large"/></span>
                            <span className="ps-4"><LuUnderline className="font-size-x-large"/></span>
                            <span className="ps-4"><PiTextAUnderlineBold className="font-size-x-large"/></span>
                            <IoIosArrowDown className="font-color-lightgray"/>
                            <span className="ps-4"><PiPencilSimpleLineLight className="font-size-x-large"/></span>
                            <IoIosArrowDown className="font-color-lightgray"/>
                            <span className="ps-4"><RiSuperscript2 className="font-size-x-large"/></span>
                            <IoIosArrowDown className="font-color-lightgray"/>
                            <span className="ps-3 font-size-x-large font-color-lightgray">|</span>
                            <span className="ps-3"><IoEllipsisVertical className="fs-6" /></span> 
                        </div>
                        <div className="mt-3">
                            <textarea className="form-control hide-resize" value={questionDescription} 
                                      onChange={(e)=>{setQuestionDescription(e.target.value)}}></textarea>
                        </div>
                        <div className="fw-bold">Answers:</div>
                        {multipleChoice && <MultipleChoice currentAnswers={currentAnswers} answer={answer} setAnswer={setAnswer} addAnswer={addAnswer}
                          deleteAnswer={deleteAnswer} updateAnswer={updateAnswer} />}
                        {trueOrFalse && <TrueOrFalse correctTrueAnswer={correctTrueAnswer} correctFalseAnswer={correctFalseAnswer}
                                                    setCorrectTrueAnswer={setCorrectTrueAnswer} setCorrectFalseAnswer={setCorrectFalseAnswer}                                    />}
                        {FillInBlank && <FillInBlanks currentFillAnswers={currentFillAnswers} answerFill={answerFill} setAnswerFill={setAnswerFill} 
                        addAnswerFill={addAnswerFill} deleteAnswerFill={deleteAnswerFill} updateAnswerFill={updateAnswerFill}/>}

                        <button type="button" className="btn btn-secondary me-2 mt-3" data-bs-dismiss="modal">
                          <Link key={qid} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/Questions`} className="text-decoration-none text-black">
                            Cancel
                          </Link>
                        </button>
                        <button type="button" data-bs-dismiss="modal" className="btn btn-danger mt-3"
                                onClick={()=>{/* console.log(id); */createQuestion({quiz:qid, type: type, points:points, description:questionDescription,
                                  answers: (multipleChoice ? currentAnswers : (trueOrFalse ? TFAnswers : currentFillAnswers)) })}}>
                          <Link key={qid} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit/Questions`} 
                                className="text-decoration-none text-black">  
                           Update Question 
                          </Link>  
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}