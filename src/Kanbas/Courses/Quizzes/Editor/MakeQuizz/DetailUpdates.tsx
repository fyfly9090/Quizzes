import { RiProgress8Line, RiSuperscript2 } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { TbLetterB } from "react-icons/tb";
import { LuUnderline } from "react-icons/lu";
import { PiTextAUnderlineBold, PiPencilSimpleLineLight, PiTextItalic } from "react-icons/pi";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { CgExpand } from "react-icons/cg";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { BsKeyboard } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addQuiz, updateQuiz } from "../../quizzesReducer";
import * as client from "../../client";

export default function QuizUpdates() {
    const params = useParams();
    const id = params.qid;
    const cid = params.cid;
    const { quizzes } = useSelector((state:any) => state.quizzesReducer); 

    const dispatch = useDispatch();

    let cur=quizzes.find((q:any) => q._id===id);
   
    let title="Unnamed Quiz";
    let instruction="New Instruction";
    let type ="Graded Quiz";
    let group ="Quizzes";
    let shuffle=true;
    let multiple=false;
    let multiTimes = 1;
    let code="";
    let oneQuestion=true;
    let webcam=false;
    let lockQustion=false;
    let points=0;
    let time = "20";
    let timeLimit = true;
    let due = "";
    let available = "";
    let noOfQuestions = 0;
    

    if(cur && cur._id !== "0") {
        
        title = cur.title;
        instruction = cur.instruction;
        type = cur.type;
        group = cur.group;
        shuffle = cur.shuffle;
        multiple = cur.multiple;
        multiTimes = cur.mul_times;
        code = cur.code;
        oneQuestion = cur.oneQuestion;
        webcam = cur.webcam;
        lockQustion = cur.lockQuestion;
        points = cur.points;
        time = cur.time;
        timeLimit = cur.timeLimit;
        due = cur.due;
        available = cur.available;
        noOfQuestions = cur.noOfQuestions;
    }


    const [newTitle, setNewTitle] = useState(title ==="Unnamed Quiz"? "Unnamed Quiz" : title);
    const [newInstruction, setNewInstruction] = useState(instruction==="New Instruction"? "New Instruction":instruction);
    const [newType, setNewType ] = useState(type==="Graded Quiz"? "Graded Quiz":type);
    const [newGroup, setNewGroup ] = useState(group==="Quizzes"? "Quizzes":group);
    const [newShuffle, setNewShuffle] = useState(shuffle===true? true:shuffle);
    const [newMultiple, setNewMultiple] = useState(multiple===false? false:multiple);
    const [newMuliTimes, setNewMultiTimes] = useState(multiTimes===1? 1:multiTimes);
    const [newOneQuestion, setNewOneQuestion] = useState(oneQuestion===true? true:oneQuestion);
    const [newWebcam, setNewWebcam] = useState(multiple===false? false:webcam);
    const [newLockQuestion, setNewLockQuestion] = useState(lockQustion===false? false:lockQustion);
    const [newCode, setNewCode ] = useState(code===""? "":code);
    const [newTime, setNewTime] = useState(time === ""? "":time);
    const [newTimeLimit, setNewTimeLimit] = useState(timeLimit===true? true:timeLimit);
    const [newDue, setNewDue] = useState(due===""? "":due);
    const [newAvailable, setNewAvailable] = useState(available===""? "":available);

    const navigate = useNavigate();
    const saveQuiz = async(quiz:any) => {
        const status = await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)
    }

    const createQuiz = async(quiz:any) => {
       const newQuiz = await client.createQuiz(cid as string, quiz);
       dispatch(addQuiz(newQuiz)); 
       navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`)
    }



    return (
        <div id="wd-editor" className="mt-3" >
            <input type="text" className="wd-quizz-name" value={newTitle}
                   onChange={(e)=>setNewTitle(e.target.value)}/>
            <div className="my-3">
                Quiz Instructions:
            </div>
            <div>
               <span className="ps-3">Edit</span><span className="ps-3">View</span><span className="ps-3">Insert</span>
               <span className="ps-3">Format</span><span className="ps-3">Tools</span><span className="ps-3">Table</span>
               <span className = "float-end ps-1 pt-1">100%</span>
               <RiProgress8Line className="float-end fs-4 text-success"/>
            </div>
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
                <textarea className="form-control hide-resize" onChange={(e) => setNewInstruction(e.target.value)}
                    >
                    {newInstruction}
                </textarea>
            </div>
            <div className = "mt-3 mb-3">
                <BsGripVertical className="fs-4 float-end grip-btn-style py-1" />
                <CgExpand className="fs-2 float-end font-color-red"/>
                <HiOutlineCodeBracket className="fs-4 float-end mx-3 mt-1 font-color-red"/>
                <span className="ps-3 font-size-x-large font-color-lightgray float-end">|</span>
                <span className="font-color-red float-end mt-2 ms-3">
                    {/* {newInstruction===""? 0 : newInstruction.length} */} 0 words</span>
                <span className="ps-3 font-size-x-large font-color-lightgray float-end">|</span>
                <BsKeyboard className="fs-4 float-end font-color-red mt-1"/>
            </div>
            <div className="row pt-5"> 
                <label htmlFor="wd-group" className="col-sm-3 col-form-label pt-0 label-element">Quiz Type</label>
                <div className="col-sm-9 pe-7"> 
                    <select id="wd-group" className="form-control form-select" value={newType} onChange={(e)=>setNewType(e.target.value)} >
                    <option value = "Graded Quiz"selected>Graded Quiz</option>
                    <option value="Practice Quiz">Practice Quiz</option>
                    <option value="Graded Survey">Graded Survey</option>
                    <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                </div>
            </div>
            <div className="row pt-5"> 
                <label htmlFor="wd-group" className="col-sm-3 col-form-label pt-0 label-element">Assignment Group</label>
                <div className="col-sm-9 pe-7"> 
                    <select id="wd-group" className="form-control form-select" value={newGroup} onChange={(e)=>setNewGroup(e.target.value)} >
                    <option value="Quizzes" selected>Quizzes</option>
                    <option value="Exams">Exams</option>
                    <option value="Assignments">Assignments</option>
                    <option value="Project">Project</option>
                    </select>
                </div>
            </div>
            <div className="row pt-2">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 pe-7">
                  <legend className="col-form-label col-sm-2 w-auto py-3">
                    <strong>Options</strong>
                  </legend>
                  <div className="form-check pb-3">
                    <input className="form-check-input" type="checkbox" id="s1" checked={newShuffle} 
                           onChange={(e)=>setNewShuffle(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="s1" >
                      Shuffle Answers
                    </label>
                  </div> 
                  <div className="form-check pb-3">
                    <input className="form-check-input" type="checkbox" id="t1" checked={newTimeLimit} 
                           onChange={(e)=>setNewTimeLimit(e.target.checked)}/>
                    <label className="form-check-label" htmlFor="t1">
                      Time Limit
                    </label>
                    {newTimeLimit && 
                    <>
                    <span className="ms-5"><input type="text" className="wd-quiz-time" value={newTime}
                          onChange={(e)=>setNewTime(e.target.value)}/>
                    </span>
                    <span className="ms-1">Minutes</span>
                    </>}
                  </div> 
                </div>
            </div>
            <div className="row pt-1">
                <div className="col-sm-3"></div>
                <div className="col-sm-9">
                    <fieldset className="border p-2">
                        <div>
                            <input className="form-check-input me-2" type="checkbox" id="a1" checked={newMultiple}
                                   onChange={(e)=>setNewMultiple(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="a1">
                                 Allow Multiple Attempts
                            </label>
                            {newMultiple && 
                            <span className="ms-4">
                              <label htmlFor="ma-1">No. of Multiple Attempts</label>
                              <input className="wd-quiz-multiple" id="ma-1" type="number" value={newMuliTimes}
                                   onChange={(e)=>{setNewMultiTimes(e.target.valueAsNumber);console.log(e.target.valueAsNumber)}}/>
                            </span>}
                        </div>
                        <div className="mt-2">
                            <input className="form-check-input me-2" type="checkbox" id="sc1"/>
                            <label className="form-check-label" htmlFor="sc1">
                                Show Correct Answers
                            </label>
                        </div>
                        <div className="mt-2">
                            <label className="form-check-label" htmlFor="ac1">
                                Access Code
                            </label>
                            <input className="wd-access-code ms-2" type="text" id="ac1" value={newCode} 
                            onChange={(e)=>setNewCode(e.target.value)}/>
                        </div>
                        <div className="mt-2">
                            <input className="form-check-input me-2" type="checkbox" id="o1" checked={newOneQuestion}
                                   onChange={(e)=>setNewOneQuestion(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="o1">
                                One Question at a Time
                            </label>
                        </div>
                        <div className="mt-2">
                            <input className="form-check-input me-2" type="checkbox" id="w1" checked={newWebcam}
                                   onChange={(e)=>setNewWebcam(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="w1">
                                Webcam Required
                            </label>
                        </div>
                        <div className="mt-2">
                            <input className="form-check-input me-2" type="checkbox" id="l1" checked={newLockQuestion}
                                   onChange={(e)=>setNewLockQuestion(e.target.checked)}/>
                            <label className="form-check-label" htmlFor="l1">
                                Lock Questions After Answering
                            </label>
                        </div>        
                    </fieldset>
                </div>
            </div>
            <div className="mb-element row mt-4 pt-2">
                <label htmlFor="wd-group" className="col-sm-3 col-form-label pt-0 label-element">Assign</label>
                <div className="col-sm-9">
                  <fieldset className="border p-3 quiz-box-width">
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
                            <input type="date" className="form-control" value={newDue} onChange={(e)=>setNewDue(e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-form-label pe-1">
                            <label className="fw-bold pt-2" htmlFor="startdate">Available from</label>
                            <div className="input-group pe-2" id="startdate">
                                <input type="date" className="form-control" value={newAvailable} onChange={(e) => setNewAvailable(e.target.value)}/>
                            </div>
                        </div>
                        <div className="col-sm-6 col-form-label ps-1"> 
                            <label className="fw-bold pt-2" htmlFor="untildate">Until</label>
                            <div className="input-group pe-0" id="untildate">
                               <input type="date" className="form-control"  value={newDue} onChange={(e) => setNewDue(e.target.value)}/>
                            </div>
                        </div>
                    </div>
                  </fieldset>
                  <div>
                     <fieldset className="quiz-add-box"><GoPlus className="me-1 font-color-gray"/>Add</fieldset> 
                  </div>
                  <fieldset className="quiz-save-button mt-3">
                    <button className="btn btn-light me-3">
                       <Link key={id} to={`/Kanbas/Courses/${cid}/Quizzes`} className="text-decoration-none text-black">
                        Cancel
                       </Link>                      
                    </button>
                    <button className="btn btn-primary me-3" 
                       onClick={()=>{params.qid==="0"? createQuiz({title:newTitle, course: cid, instruction: newInstruction, 
                        type: newType, group: newGroup, shuffle: newShuffle, multiple: newMultiple, mul_times:newMuliTimes, code: newCode, oneQuestion: newOneQuestion,
                        webcam: newWebcam, lockQustion: newLockQuestion, time: newTime, timeLimit: newTimeLimit, due:newDue, available:newAvailable}) : 
                        saveQuiz({_id:id, title:newTitle, course: cid, instruction: newInstruction, 
                            type: newType, group: newGroup, shuffle: newShuffle, multiple: newMultiple, mul_times:newMuliTimes, code: newCode, oneQuestion: newOneQuestion,
                            webcam: newWebcam, lockQustion: newLockQuestion, time: newTime, timeLimit: newTimeLimit, due:newDue, 
                            available:newAvailable})}}>
                               {/* <Link key={id} to={`/Kanbas/Courses/${cid}/Quizzes/${newId}`} className="text-decoration-none text-black"> */}
                                Save
                                {/* </Link> */}
                    </button>
                    <button className="btn btn-danger" 
                       onClick={()=>{params.qid==="0"? createQuiz({title:newTitle, course: cid, instruction: newInstruction, 
                        type: newType, group: newGroup, shuffle: newShuffle, multiple: newMultiple, mul_times:newMuliTimes, code: newCode, oneQuestion: newOneQuestion,
                        webcam: newWebcam, lockQustion: newLockQuestion, time: newTime, timeLimit: newTimeLimit, due:newDue, available:newAvailable,
                        publish: true}) : 
                        saveQuiz({_id:id, title:newTitle, course: cid, instruction: newInstruction, 
                            type: newType, group: newGroup, shuffle: newShuffle, multiple: newMultiple, mul_times:newMuliTimes, code: newCode, oneQuestion: newOneQuestion,
                            webcam: newWebcam, lockQustion: newLockQuestion, time: newTime, timeLimit: newTimeLimit, due:newDue, 
                            available:newAvailable, publish: true})}}>
                               <Link key={id} to={`/Kanbas/Courses/${cid}/Quizzes`} className="text-decoration-none text-black">
                                Save and Publish
                                </Link>
                    </button>
                  </fieldset>         
                </div>
            </div>
        </div>
    )
}