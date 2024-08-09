import { TiPencil } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizzesDetails () {
    const {cid, qid} = useParams();
    const  { quizzes } = useSelector((state:any) => state.quizzesReducer);
    const ConvertToDate = (date:any) =>{
      if(date instanceof Date) {
        return date;
      } else {
        return new Date(date);
      }
    }
    return (
        <div className="ms-5 pe-0">
          {quizzes
            .filter((quiz: any) => quiz._id === qid)
            .map((quiz: any) => (
            <>
              <div className="row text-nowrap quizz-control-border pb-4">
                <div className="col-6 label-element pe-1">
                  <Link key={quiz._id} to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview`}>
                    <button className="btn btn-lg btn-secondary-butt py-1">
                      Preview</button>
                  </Link>  
                </div>
                <div className="col-6 ps-0">
                  <Link key={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`} id="wd-add-quiz" 
                    className="text-decoration-none text-black"> 
                    <button className="btn btn-lg btn-secondary-butt me-1 py-1">
                      <TiPencil className="position-relative me-1" style={{ bottom: "1px" }} />
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
              <div className="title-style">
                {quiz.title}    
              </div>
              <div className="row mt-6 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Quiz Type</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.type}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Points</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.points?quiz.points.toString():0}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Assignment Group</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.group}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Shuffle Answers</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.shuffle? "Yes" : "No"}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Time Limit</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.time==="0"? "NONE": quiz.time}</div>
              </div>   
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Multiple Attempts</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">
                  {quiz.multiple? "" : "No"}
                  {quiz.multiple && <span>{quiz.mul_times} times</span>}
                </div>
              </div>

              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Show Correct Answers</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.ShowAnswers? "Immediately":"No"}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">One Question at a Time</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.oneQuestion? "Yes" : "No"}</div>
              </div>
              
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Access Code</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">
                  <input className="wd-access-code" value={quiz.code}/>
                </div>
              </div> 
                 
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label">Webcam Required</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.webcam? "Yes" : "No"}</div>
              </div>
              <div className="row mt-2 font-quizz">
                <div className="col-md-5 col-xl-4 col-7 ms-6 label-element quizz-label text-nowrap">Lock Questions After Answering</div>
                <div className="col-md-7 col-xl-8 col-5 ps-0">{quiz.lockQuestion? "Yes" : "No"}</div>
              </div>
              <div className="table-responsive mt-4 font-quizz">
                <table className="table">
                  <thead>
                    <tr><th>Due</th><th>For</th><th>Available from</th><th>Until</th></tr>
                  </thead>
                  <tbody>
                    <tr><th className="table-content">{ConvertToDate(quiz.due).toLocaleString('default', {month:'long'})}
                      {" "} {ConvertToDate(quiz.due).getDate()+1} {" "}{"at"} {"11:59PM"}</th>
                        <th className="table-content">Everyone</th>
                        <th className="table-content">{ConvertToDate(quiz.available).toLocaleString('default', {month:'long'})}
                        {" "} {ConvertToDate(quiz.available).getDate()+1} {" "}{"at"} {"12:00AM"}</th>
                        <th className="table-content">{ConvertToDate(quiz.due).toLocaleString('default', {month:'long'})}
                        {" "} {ConvertToDate(quiz.due).getDate()+1} {" "}{"at"} {"11:59PM"}</th></tr>
                  </tbody>
                </table>
              </div>        
            </>
          ))} 
        </div>
    );
}