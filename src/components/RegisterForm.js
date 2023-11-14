import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./RegisterForm.css";

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
    <div className="container my-3 form-signup">
      <h2 className="text-uppercase text-center text-white border border-black bg bg-black p-3">
        Registro
      </h2>
      <form>
        <div className="form-floating">
          <input
            type="text"
            name="username"
            className="form-control"
            id="floatingInput"
            placeholder="usuario"
            value={user.username}
            onChange={handleChange}
          />
          <label>Usuario:</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Contraseña"
            value={user.password}
            onChange={handleChange}
          />
          <label>Contraseña:</label>
        </div>
        <button
          type="button"
          className="w-100 btn btn-warning me-2"
          onClick={handleRegister}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
