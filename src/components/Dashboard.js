import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="container">
      <Link className="btn btn-warning my-3" to={`/create-product`}>
        Nuevo producto
      </Link>

      <h2 className="text-uppercase text-center text-white border border-dark bg bg-dark p-3">
        Productos
      </h2>
      <div className="">
        <table className="table table-striped">
          <thead className="text-uppercase">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Descripción</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr>
                <th scope="row" key={product._id}>
                  {product._id}
                </th>
                <td>{product.name}</td>
                <td>$ {product.price}</td>
                <td>{product.description}</td>
                <td className="d-flex justify-content-around">
                  <Link
                    className="btn btn-info"
                    to={`/edit-product/${product._id}`}
                  >
                    Editar
                  </Link>
                  <Link
                    className="btn btn-danger"
                    to={`/delete-product/${product._id}`}
                  >
                    Eliminar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
