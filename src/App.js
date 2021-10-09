import React from "react";
import { Formulario } from "./components/Formulario";
import { Header } from "./components/Header";
import { ListaRecetas } from "./components/ListaRecetas";

import CategoriasProvider from "./context/CategoriaContext";
import ModalProvider from "./context/ModalContext";
import RecetasProvider from "./context/RecetasContext";

export const App = () => {
  return (
    <CategoriasProvider>
      <RecetasProvider>
        <ModalProvider>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>
            <ListaRecetas />
          </div>
        </ModalProvider>
      </RecetasProvider>
    </CategoriasProvider>
  );
};
