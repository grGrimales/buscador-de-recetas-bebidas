import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, setRecetas] = useState([]);
  const [buscarReceta, setBuscarReceta] = useState({
    nombre: "",
    categoria: "",
  });

  const [consultar, setConsultar] = useState(false);
  const { nombre, categoria } = buscarReceta;

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https:www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await axios.get(url);
        setRecetas(resultado.data.drinks);
      };
      obtenerRecetas();
    }
  }, [buscarReceta]);

  return (
    <RecetasContext.Provider value={{ recetas, setBuscarReceta, setConsultar }}>
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
