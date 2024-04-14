import axios from "axios";

export const BASE_API = process.env.REACT_APP_API_BASE;
export const COURSES_API = `${BASE_API}/api/courses`;
export const MODULES_API = `${BASE_API}/api/modules`;
export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons?: [
        {
          _id?: string;
          name?: string;
          description?: string;
          module?: string;
        }
    ];
}

export const findModulesForCourse = async (courseId) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const deleteModule = async (moduleId) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

export const createModule = async (courseId, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module,
  );
  return response.data;
};

export const updateModule = async (module: any) => {
  const response = await axios.put(`${MODULES_API}/${module._id}`, module);
  return response.data;
};
