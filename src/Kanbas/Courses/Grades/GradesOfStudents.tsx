
export default function GradesOfStudents({ userGrade, aid, assignments }: { userGrade: string; aid: string; assignments:object[]}) {
  return (
    <>
     {assignments.map((assignment: any) => (
       assignment._id === aid? (<th className="table-content">{userGrade}</th>) : ""
     ))}
    </>
  )  
} 

