import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductForm.css";

const ProductEditForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleEditProduct = async () => {
    try {
      // Realiza la solicitud de edición al backend
      await api.put(`/products/${id}`, product);
      // Realiza alguna acción después de la edición (redireccionar, actualizar la interfaz de usuario, etc.)
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="container my-3 form-product">
      <h2 className="text-uppercase text-center text-white border border-black bg bg-black p-3">
        Editar producto
      </h2>
      <form>
        <div className="form-floating">
          <input
            type="text"
            name="name"
            className="form-control"
            id="floatingInput"
            placeholder=""
            value={product.name}
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
            value={product.price}
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
            value={product.description}
            onChange={handleChange}
          ></textarea>
          <label>Descripción</label>
        </div>
        <button
          type="button"
          className="w-100 btn btn-warning me-2"
          onClick={handleEditProduct}
        >
          Editar
        </button>
      </form>
    </div>
  );
};

export default ProductEditForm;
