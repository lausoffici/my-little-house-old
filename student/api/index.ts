import apiClient from "utils/apiClient";
import { IStudent } from "types";
import { IFormData } from "student/StudentsForm";

const api = {
  list: async (): Promise<IStudent[]> => {
    const response = await apiClient.get("students");
    const students: IStudent[] = response.data.students;
    return students;
  },
  create: async (student: IFormData): Promise<IStudent> => {
    const response = await apiClient.post("students", student);
    const newStudent: IStudent = response.data.student;
    return newStudent;
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete("students/" + id);
  },
  update: async (id: string, student: IFormData): Promise<IStudent> => {
    const response = await apiClient.put("students/" + id, student);
    const updatedStudent: IStudent = response.data.student;
    return updatedStudent;
  },
};

export default api;
