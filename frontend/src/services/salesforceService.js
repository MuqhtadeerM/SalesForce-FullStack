import api from "./api";

export const getValidationRules = () => api.get("/validation-rules");

export const toggleSingleRule = (id, active) =>
  api.post(`/toggle/${id}`, { active });

export const toggleAllRules = (active) => api.post("/toggle-all", { active });

export const deployChanges = () => api.post("/deploy");
