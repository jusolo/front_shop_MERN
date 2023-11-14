import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ProductForm.css";

const ProductForm = () => {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  const handleCreateProduct = async () => {
    try {
      // Realiza la solicitud POST al backend para crear un nuevo producto
      const response = await api.post("/products", newProduct);
      console.log("Nuevo producto creado:", response.data);

      // Redirigir a la página principal o a donde sea necesario
      navigate("/dashboard");

      // Limpia el formulario
      setNewProduct({
        name: "",
        price: 0,
        description: "",
      });
    } catch (error) {
      console.error("Error creando el producto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div className="container my-3 form-product">
      <h2 className="text-uppercase text-center text-white border border-black bg bg-black p-3">
        Nuevo producto
      </h2>
      <form>
        <div className="form-floating">
          <input
            type="text"
            name="name"
            className="form-control"
            id="floatingInput"
            placeholder=""
            value={newProduct.name}
            onChange={handleChange}
          />
          <label>Nombre</label>
        </div>
        <div className="form-floating">
          <input
            type="number"
            name="price"
            className="form-control"
            id="floatingInput"
            placeholder=""
            value={newProduct.price}
            onChange={handleChange}
          />
          <label>Precio</label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            name="description"
            id="floatingInput"
            placeholder=""
            cols="30"
            rows="10"
            value={newProduct.description}
            onChange={handleChange}
          ></textarea>
          <label>Descripción</label>
        </div>
        <button
          type="button"
          className="w-100 btn btn-warning me-2"
          onClick={handleCreateProduct}
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
