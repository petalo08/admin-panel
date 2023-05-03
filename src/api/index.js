import axios from "axios";

export const prefix = "/api/v1";
export const baseurl = "https://backend-delta-liart-17.vercel.app";
export const url = baseurl + prefix;
const API_INSTANCE = axios.create({ baseURL: url });

export default API_INSTANCE;