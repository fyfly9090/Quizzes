import * as db from "../../Database";
import GradesOfStudents from "./GradesOfStudents";


export default function AllStudents({uid , assignments }: { uid: string; assignments: object[]}) {
  const grades = db.grades;
  const users = db.users;
  const user = users.filter((user: any) => user._id === uid);
  console.log(assignments);
  const userGrades = grades.filter((grade: any) => grade.student === uid);
  
  return (
    
      <tr>
        <th className="align-left th-style">{user[0].firstName}&nbsp;{user[0].lastName}</th>
              
        {
        userGrades && userGrades.map(stu => {
          return (<GradesOfStudents userGrade={stu.grade} aid={stu.assignment} assignments={assignments} />);
        })
      }
 
      </tr>


  );
}
