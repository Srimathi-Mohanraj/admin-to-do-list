// src/api.js
import axios from 'axios';

export const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const api = axios.create({
  baseURL: 'http://localhost:5000/api'    
});

export default api;
  