import axios from "axios";

const api = axios.create({
  baseURL: "https://shop-api-2phb.onrender.com", // Reemplaza con la URL de tu backend
});

// Añadir un interceptor para incluir el token en todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
