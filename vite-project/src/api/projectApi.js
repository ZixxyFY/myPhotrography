import axios from "axios";

const BASE_URL = "http://localhost:5000/api/projects";

export const getProjects = () => axios.get(BASE_URL);
export const createProject = (data) => axios.post(BASE_URL, data);
export const updateProject = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteProject = (id) => axios.delete(`${BASE_URL}/${id}`);