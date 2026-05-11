import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/salesforce",
});

export const loginToSalesforce = () => {
  window.location.href = "http://localhost:5000/api/salesforce/login";
};

export const getValidationRules = () => API.get("/validation-rules");

export const toggleSingleRule = (id, active) =>
  API.post(`/toggle/${id}`, { active });

export const toggleAllRules = (active) => API.post("/toggle-all", { active });

export const deployChanges = () => API.post("/deploy");
