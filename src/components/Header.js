import React from "react";
import { useAuth } from "../context/AuthContext";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const { state } = useAuth();
  const { logoutUser } = useLogin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logoutUser();

      // Redirigir a la página principal o a donde sea necesario
      navigate("/");
    } catch (error) {
      console.error("Error al salir:", error);
    }
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link className="nav-link px-2 text-secondary" to="/">
                Inicio
              </Link>
            </li>
            <li>
              {state.isAuthenticated && (
                <Link className="nav-link px-2 text-secondary" to="/dashboard">
                  Administrador
                </Link>
              )}
            </li>
            <li>
              <Link className="nav-link px-2 text-secondary" to="/about">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link className="nav-link px-2 text-secondary" to="/cart">
                Carrito
              </Link>
            </li>
          </ul>
          <div className="text-end">
            {state.isAuthenticated ? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            ) : (
              <Link className="btn btn-outline-light me-2" to="/login">
                Iniciar sesión
              </Link>
            )}
            {!state.isAuthenticated ? (
              <Link className="btn btn-warning" to="/register">
                Crear cuenta
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
