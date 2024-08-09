import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";


export default function FillInBlank({currentFillAnswers, answerFill, setAnswerFill, addAnswerFill, deleteAnswerFill, updateAnswerFill}:
    {currentFillAnswers: any[], answerFill: any, setAnswerFill:(answer: any)=>void, addAnswerFill:()=>void,
     deleteAnswerFill:(answer:any)=>void, updateAnswerFill:(answer: any)=>void }) {

    const[addAnswerFillVisible, setAddAnswerFillVisible] = useState(false);  
    
    return (
        <div className="mt-2 mb-4">
           <ul className="list-group">
           
             {currentFillAnswers
               .map((a:any) => (  
                <li className="list-group-item ps-5 answer-list">
                  <div className="row">  
                    <div className="ps-3 col-1">
                    </div>
                    <div className="col-3">
                      <label htmlFor="a1">Correct Answer</label>
                    </div>
                    <div className=" col-7">
                      <input id="a1" className="answer-input-style" value={a.value}
                             onChange={(e)=>updateAnswerFill({...a, value:e.target.value})}/>
                    </div>
                    <div className="col-1">
                      <BsTrash className="float-end" onClick={()=> {deleteAnswerFill(a._id)}} />  
                    </div>
                  </div>   
                </li>
             ))} 
              {addAnswerFillVisible && 
               (<p className="ps-5 add-answer-box">
                  <label htmlFor="aa1"><input className="border-0"  value="Correct Answer"/* {answerFill.type}
                         onChange={(e)=>setAnswerFill({...answerFill, type:e.target.value})} *//></label>
                  <input id = "aa1" className="ms-2 answer-box-style" 
                         onChange={(e)=>setAnswerFill({...answerFill, value:e.target.value})}/>
                  <BsTrash className="float-end" onClick={()=> {setAddAnswerFillVisible(false)}} />
                  {/*                   <CiEdit className="float-end" /> */}
                  <IoIosSave className="float-end" onClick={(e)=>{addAnswerFill(); setAddAnswerFillVisible(false)}}/>
             </p>)} 
           </ul>
            <button className="font-color-red float-end add-answer-btn " onClick = {(e) => setAddAnswerFillVisible(true)}>
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Add Another Answer
            </button>
        </div>
    )
}