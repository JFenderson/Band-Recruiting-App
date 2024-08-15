import { StudentEntity } from "../models/student";

export const getStudentsCollection = (): Promise<StudentEntity[]> => {
  const promise = new Promise<StudentEntity[]>((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            studentId: 1,
            firstName: "brauliodiez",
            lastName: "Santana",
            email: "bsantana2@yahoo.com",
            phone: "123-456-7890",
            instrument: "Drum",
            highSchool: "Washington High",
            profilePicture: "https://avatars.githubusercontent.com/u/1457912?v=3"
          },
        ]),
      500
    );
  });

  return promise;
};