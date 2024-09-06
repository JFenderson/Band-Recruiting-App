
import axios from 'axios'
import { faker } from '@faker-js/faker';
import http from 'https';

// Set the base URL for your API
const API_URL = 'https://localhost:7055/api';

axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    httpsAgent: new (http.Agent)({
      rejectUnauthorized: false,
    }),
  });

function generateHighSchoolName() {
    const formatOptions = [
        () => `${faker.location.city()} High School`,
        () => `${faker.person.lastName()} High School`,
        () => `${faker.person.firstName()} Academy`,
        () => `${faker.location.city()} Academy`,
        () => `Saint ${faker.person.firstName()} High School`,
        () => `${faker.person.lastName()} Institute`,
    ];

    // Randomly select one of the formats
    const randomFormat = faker.helpers.uniqueArray(formatOptions);
    return randomFormat;
}

// Number of users to create
const NUM_STUDENTS = 10;
const NUM_RECRUITERS = 5;

// Create a batch of students
const createStudents = async () => {
  console.log(`Creating ${NUM_STUDENTS} students...`);

  for (let i = 0; i < NUM_STUDENTS; i++) {
    const student = {
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Password123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      instrument: "Trombone",
      highSchool: generateHighSchoolName(),
      graduationYear: faker.date.future().getFullYear(),
      userType: 'Student',
    };

    try {
      const response = await axios.post(`${API_URL}/Account/register`, student);
      console.log(`Created student: ${student.userName} (ID: ${response.data.userId})`);
    } catch (error) {
      console.error('Failed to create student:', error.response ? error.response.data : error.message);
    }
  }
};

// Create a batch of recruiters
const createRecruiters = async () => {
  console.log(`Creating ${NUM_RECRUITERS} recruiters...`);

  for (let i = 0; i < NUM_RECRUITERS; i++) {
    const recruiter = {
      userName: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'Password123!',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      bandId: faker.number.int({min: 1, max: 38}), // Assuming you're using UUIDs for band IDs
      userType: 'Recruiter',
    };

    try {
      const response = await axios.post(`${API_URL}/Account/register`, recruiter);
      console.log(`Created recruiter: ${recruiter.userName} (ID: ${response.data.userId})`);
    } catch (error) {
      console.error('Failed to create recruiter:', error.response ? error.response.data : error.message);
    }
  }
};

// Run the script
(async () => {
  await createStudents();
  await createRecruiters();
  console.log('Finished creating users.');
})();
