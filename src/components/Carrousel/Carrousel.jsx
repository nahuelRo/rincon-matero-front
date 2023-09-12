import React, { useState, useEffect } from "react";
import styles from "./carrousel.module.scss";
import carrousel from "../../assets/bannner1.png";
import carrousel2 from "../../assets/banner2.png";

function Carrousel() {
  const [imagenActual, setImagenActual] = useState(1);

  // Función para cambiar la imagen
  const cambiarImagen = (direccion) => {
    if (direccion === "anterior") {
      setImagenActual(imagenActual === 1 ? 2 : 1);
    } else {
      setImagenActual(imagenActual === 2 ? 1 : 2);
    }
  };

  // Función para cambiar automáticamente la imagen cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      cambiarImagen("siguiente");
    }, 2000);

    return () => clearInterval(interval);
  }, [imagenActual]);

  return (
    <div className={styles.carrusel}>
      <img
        src={imagenActual === 1 ? carrousel : carrousel2}
        alt={`Imagen ${imagenActual}`}
      />
    </div>
  );
}

export default Carrousel;
