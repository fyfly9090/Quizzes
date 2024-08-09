import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";

export default function DetailsStudent() {
   const { cid,qid } = useParams()
   return (
    <div className="align-center pt-5">
        <button className="btn btn-danger mt-3 align-center p-3 px-5">
          <Link className= "text-decoration-none text-white font-size-xx-large" key={qid} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`}>
            Take the Quiz
          </Link>
        </button>
    </div>
   ) 
}