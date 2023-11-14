import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLogin();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      console.log("Usuario autenticado:", response);

      // Redirigir a la página principal o a donde sea necesario
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
    }
  };

  return (
    <div className="container my-3 form-signin text-center">
      <h2 className="text-uppercase text-center text-white border border-black bg bg-black p-3">
        Tienda online
      </h2>
      <form>
        <div className="form-floating">
          <input
            type="text"
            name="username"
            className="form-control"
            id="floatingInput"
            placeholder="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Usuario</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Contraseña</label>
        </div>

        {/* <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}
        <button
          className="w-100 btn btn-warning me-2"
          type="button"
          onClick={handleLogin}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
