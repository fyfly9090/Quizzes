import  { useLocation } from "react-router";
import { Link} from "react-router-dom";

export default function TOQ() {
  const { pathname }=useLocation();

  return (
    <ul className="nav nav-tabs">
        <li className="nav-item"> 
            <Link key={`Details`} to={`Details`} 
               className={`nav-link ${pathname.includes("Details")? "active":""}`}>
                Details
            </Link>
        </li>
        <li className="nav-item"> 
            <Link key={`Questions`} to={`Questions`}  
               className={`nav-link ${pathname.includes("Questions")? "active":""}`}>
                Questions
            </Link>
        </li>
    </ul>
  )

}