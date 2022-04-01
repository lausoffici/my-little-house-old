import apiClient from "utils/apiClient";
import { ICourse } from "types";
import { IFormData } from "course/CourseForm";

const api = {
  findOne: async (id: string): Promise<ICourse> => {
    const response = await apiClient.get("courses/" + id);
    const course: ICourse = response.data.course;
    return course;
  },
  findAll: async (): Promise<ICourse[]> => {
    const response = await apiClient.get("courses");
    const courses: ICourse[] = response.data.courses;
    return courses;
  },
  create: async (course: IFormData): Promise<ICourse> => {
    const response = await apiClient.post("courses", course);
    const newCourse: ICourse = response.data.course;
    return newCourse;
  },
  remove: async (id: string): Promise<void> => {
    await apiClient.delete("courses/" + id);
  },
  update: async (id: string, course: IFormData): Promise<ICourse> => {
    const response = await apiClient.put("courses/" + id, course);
    const updatedCourse: ICourse = response.data.course;
    return updatedCourse;
  },
};

export default api;
