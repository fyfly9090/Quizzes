import { ImArrowRight } from "react-icons/im";
export default function TrueOrFalse({correctTrueAnswer, correctFalseAnswer, setCorrectTrueAnswer, setCorrectFalseAnswer}:
    {correctTrueAnswer:boolean, correctFalseAnswer:boolean, setCorrectTrueAnswer:(correctTrueAnswer: any)=>void, 
        setCorrectFalseAnswer: (correctFalseAnswer:boolean)=>void}
) {
    return (
        <div className="ms-3">
            <div className={`${correctTrueAnswer? "text-success":""} row answer-list`}>
                {correctTrueAnswer&&<div className="col-2"><ImArrowRight className="me-2 float-end"/></div>}
                {!correctTrueAnswer&&<div className="col-2"></div>}
                <div className="col-10" onClick={(e)=>{setCorrectTrueAnswer(true);setCorrectFalseAnswer(false)}}>True</div>
            </div>
            <div className={`${correctFalseAnswer? "text-success":""} row`}>
                {correctFalseAnswer&&<div className="col-2"><ImArrowRight className="me-2 float-end"/></div>}
                {!correctFalseAnswer&&<div className="col-2"></div>}
                <div className="col-10" onClick={(e)=>{setCorrectFalseAnswer(true);setCorrectTrueAnswer(false)}}>False</div>
            </div>
        </div>
    )
}