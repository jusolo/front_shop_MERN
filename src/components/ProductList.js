import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProductList = () => {
  const { state } = useAuth();

  const [products, setProducts] = useState([]);

  const handleDelete = async (productId) => {
    try {
      // Realiza la solicitud de eliminación al backend
      await api.delete(`/products/${productId}`);
      // Actualiza la lista de productos después de la eliminación
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!products) {
    return (
      <div className="m-0 vh-100 row justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {state.isAuthenticated ? (
        <h2 className="my-3">Hola, usuario: {state.user}</h2>
      ) : (
        <div className="my-3"></div>
      )}

      <h2 className="text-uppercase text-center text-white border border-dark bg bg-dark p-3">
        Productos
      </h2>
      <div className="row">
        {products.map((product) => (
          <div className="card m-1 col" key={product._id}>
            <div className="card-body d-flex flex-column justify-content-evenly">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-muted">$ {product.price}</p>
              <p className="card-text">{product.description}</p>
              <Link
                className="w-100 btn btn-warning me-2"
                to={`/product/${product._id}`}
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
