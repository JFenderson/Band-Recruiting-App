import axios from "axios";
import { StudentGet, StudentPost } from "../models/student";
import { handleError } from "../helpers/errorHandler";

const api = "http://localhost:5167/api/student/";

export const studentAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<StudentPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const studentDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<StudentPost>(api + `?symbol=${symbol}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const studentGetAPI = async () => {
  try {
    const data = await axios.get<StudentGet[]>(api);
    return data;
  } catch (error) {
    handleError(error);
  }
};