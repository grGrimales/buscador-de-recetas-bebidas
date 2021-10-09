import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: 450,
    },
    maxHeight: 500,
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const Receta = ({ receta }) => {
  //Configuracion del modal de material-ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Extraer los valores del context
  const { recetaSeleccionada, setIdReceta, setReceta } = useContext(
    ModalContext
  );

  //Muestra y formatea los ingredientes

  const mostrarIngredientes = (recetaSeleccionada) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (recetaSeleccionada[`strIngredients{i}`]) {
        ingredientes.push(
          <li>
            {recetaSeleccionada[`strIngredient${i}`]}{" "}
            {recetaSeleccionada[`strMeasure${i}`]}
          </li>
        );
      }
    }

    return ingredientes;
  };
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>

        <img
          className="card-img-top"
          src={receta.strDrinkThumb}
          all={`Imagen de ${receta.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setIdReceta(receta.idDrink);
              handleOpen();
            }}
          >
            Ver Receta
          </button>

          <Modal
            open={open}
            onClose={() => {
              setIdReceta(null);
              setReceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{recetaSeleccionada.strDrink}</h2>
              <h3 className="mt-4">Instrucciones:</h3>

              <p> {recetaSeleccionada.strInstructions}</p>

              <img
                className="img-fluid my-4"
                src={recetaSeleccionada.strDrinkThumb}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(recetaSeleccionada)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};
