import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await api.post("/users/register", user);
      console.log("Usuario registrado:", response.data);
      // Redirigir a la página principal o a donde sea necesario
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="container my-3">
      <h2 className="text-uppercase text-center border border-primary p-3 bg bg-info">
        Registro
      </h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Usuario:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleRegister}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
