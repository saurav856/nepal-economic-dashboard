import axios from "axios"

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
})

export const getEconomics = () => client.get("/economics/")
export const getLatest = () => client.get("/economics/latest")
export const getPredict = (years) => client.get("/predict/", { params: { years } })