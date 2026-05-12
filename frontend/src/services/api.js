import axios from "axios";

const BASE_URL = "http://localhost:5000/api/salesforce";

const api = axios.create({
  baseURL: BASE_URL,
});

export const loginToSalesforce = () => {
  window.location.href = `http://localhost:5000/api/salesforce/login`;
};

export const getValidationRules = () => api.get("/validation-rules");
export const toggleSingleRule = (id, active) =>
  api.post(`/toggle/${id}`, { active });
export const toggleAllRules = (active) => api.post("/toggle-all", { active });
export const deployChanges = () => api.post("/deploy");

export default api;
