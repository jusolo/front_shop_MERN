import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const useLogin = () => {
  const { login, logout } = useAuth();

  const loginUser = async (username, password) => {
    try {
      // Lógica para hacer la solicitud de login al backend
      const response = await api.post("/users/login", {
        username: username,
        password: password,
      });

      // Una vez recibido el token del backend:
      login(response.data.username, response.data.token);
      
      return response.data.username;

    } catch (error) {
      console.error("Error al solicitar al backend:", error);
    }
  };

  const logoutUser = () => {
    // Lógica para hacer la solicitud de logout al backend (si es necesario)
    // Una vez completado el logout:
    logout();
  };

  return { loginUser, logoutUser };
};

export default useLogin;
