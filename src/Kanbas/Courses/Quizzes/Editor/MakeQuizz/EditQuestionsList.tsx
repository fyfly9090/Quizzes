import { RiDeleteBin5Line } from "react-icons/ri";
import { updateQuestion } from "./TypeOfQuestions/questionsReducer";
import { useDispatch } from "react-redux";

export default function EditQuestionsList({ans, qt} : {ans:any, qt:any}) {
    const dispatch = useDispatch()
    let resAnswers = [];

    
    const updateAnswerList = (newValue:string, newType:string) => {
        let newAns = {...ans, value:newValue, type:newType}
        resAnswers = qt.answers.map((a:any) => a._id === ans._id? newAns:a)
        dispatch(updateQuestion({...qt, answers: resAnswers}))
    }
    
    const deleteAnswerInList = (aid:string) => {
        resAnswers = qt.answers.filter((as:any) => as._id!==aid)
        dispatch(updateQuestion({...qt, answers: resAnswers}))
    }

    
 
    return (
        <li className="list-group-item row">
            <input className="answer-label-style col-4" value={ans.type}
                   onChange={(e)=> updateAnswerList (ans.value, e.target.value)}/>
            <input className="answer-label-style col-7" value={ans.value}
                   onChange={(e) => updateAnswerList(e.target.value, ans.type)}
            /> 
            <RiDeleteBin5Line className="float-end col-1" onClick={()=>{deleteAnswerInList(ans._id)}}/>
        </li>
    )
}