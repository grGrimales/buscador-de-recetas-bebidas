import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

//crear el context
export const CategoriaContext = createContext();

//provider es donde se encuentran las funciones y state

const CategoriasProvider = (props) => {
  //crear el state del context
  const [categorias, setCategorias] = useState([]);

  //ejecutar el llamdo a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https:www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categorias = await axios.get(url);
      setCategorias(categorias.data.drinks);
    };

    obtenerCategorias();
  }, []);

  return (
    <CategoriaContext.Provider value={{ categorias }}>
      {props.children}
    </CategoriaContext.Provider>
  );
};

export default CategoriasProvider;
