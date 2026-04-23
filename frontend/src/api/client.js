import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

export const getRemittance = (params) => client.get("/remittance/", { params });
export const getSummary = () => client.get("/remittance/summary");
export const getByCountry = (year) => client.get("/remittance/by-country", { params: { year } });
export const getPredict = (years) => client.get("/predict/", { params: { years } });