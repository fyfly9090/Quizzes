import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BsTrash } from "react-icons/bs";
import { IoIosSave } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


export default function MultipleChoice({currentAnswers, answer, setAnswer, addAnswer, deleteAnswer, updateAnswer}:
    {currentAnswers: any[], answer: any, setAnswer:(answer: any)=>void, addAnswer:()=>void,
     deleteAnswer:(answer:any)=>void, updateAnswer:(answer: any)=>void }) {
    const[addAnswerVisible, setAddAnswerVisible] = useState(false);

  
    return (
        <div className="mt-2 mb-4">
           <ul className="list-group">
            {addAnswerVisible && 
               (<p className="ps-5 add-answer-box">
                  <label htmlFor="aa1"><input className="border-0"  value={answer.type}
                         onChange={(e)=>setAnswer({...answer, type:e.target.value})}/></label>
                  <input id = "aa1" className="ms-2 answer-box-style" 
                         onChange={(e)=>setAnswer({...answer, value:e.target.value})}/>
                  <BsTrash className="float-end" onClick={()=> {setAddAnswerVisible(false)}} />
                  {/*                   <CiEdit className="float-end" /> */}
                  <IoIosSave className="float-end" onClick={(e)=>{addAnswer(); setAddAnswerVisible(false)}}/>
             </p>)}
             {currentAnswers
               .map((a:any) => (  
                <li className="list-group-item ps-5 answer-list">
                  <div className="row">  
                    <div className="ps-3 col-1">{a.type.includes("Correct") && 
                        <IoCheckmarkDoneSharp className="text-success float-end"/>}
                    </div>
                    <div className="col-3">
                      <label htmlFor="a1">
                        <input className="answer-label-style" value={a.type} onChange={(e)=>updateAnswer({...a, type:e.target.value})}/></label>
                    </div>
                    <div className=" col-7">
                      <input id="a1" className="answer-input-style" value={a.value}
                             onChange={(e)=>updateAnswer({...a, value:e.target.value})}/>
                    </div>
                    <div className="col-1">
                      <BsTrash className="float-end" onClick={()=> {deleteAnswer(a._id)}} />  
                    </div>
                  </div>   
                </li>
             ))}  
           </ul>
            <button className="font-color-red float-end add-answer-btn " onClick = {(e) => setAddAnswerVisible(true)}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Add Another Answer
            </button>
        </div>
    )
}