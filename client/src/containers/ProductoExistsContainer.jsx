import { useState } from "react";
import axiosInstance from '../api/axiosInstance.js';
import { useNavigate } from "react-router-dom";

export const ProductoExistContainer = () => {
  const [form, setForm] = useState({
    referencia: "",
    stock: 0
  });

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/products/exist", form);
      navigate("/productos");
    } catch (error) {
      console.error("Error al asignar producto a sede:", error.response?.data || error.message);
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Asignar producto existente a esta sede</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Referencia del producto:
          <input type="text" name="referencia" value={form.referencia} onChange={(e) => {setForm({...form, referencia: e.target.value})}} required />
        </label>
        <label>
          Stock inicial:
          <input type="text" name="stock" value={form.stock} onChange={(e) => {setForm({...form, stock: parseInt(e.target.value)})}} required min={0} />
        </label>
        <button type="submit">Asignar producto</button>
      </form>
    </div>
  );
};
