import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./ProductForm.css";

const ProductDeleteForm = () => {
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

  const handleDeleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="container my-3 form-product">
      <h2 className="text-uppercase text-center text-white border border-dark bg bg-dark p-3">
        ¿Estas seguro de eliminar el producto?
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
            readOnly
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
            readOnly
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
            readOnly
          ></textarea>
          <label>Descripción</label>
        </div>
        <button
          type="button"
          className="w-100 btn btn-warning me-2"
          onClick={handleDeleteProduct}
        >
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default ProductDeleteForm;
