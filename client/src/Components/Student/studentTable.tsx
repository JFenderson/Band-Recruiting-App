// import * as React from "react";
// import { StudentEntity } from "../../models/Student";
// import { getStudentsCollection } from "../../API/studentApi";

// const useStudentCollection = () => {
//   const [studentCollection, setStudentCollection] = React.useState<
//     StudentEntity[]
//   >([]);

//   const loadStudentCollection = () => {
//     getStudentsCollection().then(studentCollection =>
//       setStudentCollection(studentCollection)
//     );
//   };

//   return { studentCollection, loadStudentCollection };
// };

// export const StudentTableComponent = () => {
//   const { studentCollection, loadStudentCollection } = useStudentCollection();

//   React.useEffect(() => {
//     loadStudentCollection();
//   }, []);

//   return (
//     <>
//       {studentCollection.map(student => (
//         <h1 key={student.studentId}>{student.firstName}{student.lastName}{student.instrument}</h1>
//       ))}
//     </>
//   );
// };