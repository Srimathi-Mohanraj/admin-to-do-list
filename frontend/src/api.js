// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'    // change here if backend host/port changes
});

export default api;
