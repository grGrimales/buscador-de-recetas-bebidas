import React, { useContext, useState } from "react";
import { CategoriaContext } from "../context/CategoriaContext";
import { RecetasContext } from "../context/RecetasContext";
import { Error } from "./Error";

export const Formulario = () => {
  const [error, setError] = useState(false);

  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });
  const { nombre, categoria } = busqueda;
  const { categorias } = useContext(CategoriaContext);
  const { setBuscarReceta, setConsultar } = useContext(RecetasContext);
  //funcion para leer los contenidos

  const obtenerDatosReceta = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();

        if (nombre === "" || categoria === "") {
          setError(true);
          return;
        }
        setError(false);
        setBuscarReceta(busqueda);
        setConsultar(true);
      }}
    >
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <fieldset className="text-center>">
        <legend>Busca bebidas por Categoría o Ingredientes</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Buscar por Ingredientes"
            onChange={obtenerDatosReceta}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatosReceta}
          >
            <option value="">-- Selecciona Categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Buscar Bebidas"
          />
        </div>
      </div>
    </form>
  );
};
