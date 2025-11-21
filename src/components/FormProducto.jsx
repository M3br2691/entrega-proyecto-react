import { useState } from "react";
import { useProductoContext } from "../context/ProductoContext";
import styles from "./formproducto.module.css";
import X from "../assets/X";

const FormProducto = ({ productoInicial = {}, modo = "agregar", onCerrar }) => {

  const [producto, setProducto] = useState(productoInicial);
  const { agregarProducto, editarProducto } = useProductoContext();

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    if (modo === "agregar") {
      await agregarProducto(producto);
    } else {
      await editarProducto(producto);
    }
    onCerrar();
  };

  return (
    <div
      className={styles.modalOverlay}
      aria-modal="true"
      role="dialog"
    >
      <div className={styles.modalContainer}>
        {/* Contenido del Modal */}
        <div className={styles.modalContent}>
          {/* Encabezado del Modal */}
          <div className={styles.modalHeader}>
            <h3 className={styles.modalHeaderTitle}>
              {modo === "agregar" ? "Agregar Producto" : "Editar Producto"}
            </h3>
            <button
              type="button"
              onClick={onCerrar}
              className={styles.closeButton}
            >
              <X />
            </button>
          </div>
          {/* Cuerpo del Modal */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              {/* Campo Nombre */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className={styles.formInputBase}
                  placeholder="Ingrese el nombre del producto"
                  value={producto.nombre || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Campo Precio */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  Precio
                </label>
                <input
                  type="number"
                  name="precio"
                  id="precio"
                  className={styles.formInputBase}
                  placeholder="$0.00"
                  value={producto.precio || ""}
                  onChange={handleChange}
                  required
                  min="0"
                  step="any"
                />
              </div>

              {/* Campo URL de Imagen */}
              <div className={`${styles.colSpan2} ${styles.smColSpan1}`}>
                <label className={styles.formLabel}>
                  URL de Imagen
                </label>
                <input
                  type="text"
                  name="imagen"
                  id="imagen"
                  className={styles.formInputBase}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={producto.imagen || ""}
                  onChange={handleChange}
                />
              </div>
              {/* Campo Descripcion */}
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Descripción del Producto
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  rows="4"
                  className={styles.formInputBase}
                  placeholder="Escriba la descripción del producto aquí"
                  value={producto.descripcion || ""}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className={styles.colSpan2}>
                <label className={styles.formLabel}>
                  Categoria
                </label>
                <input
                  type="text"
                  name="categoria"
                  id="categoria"
                  className={styles.formInputBase}
                  placeholder="Ingrese la categoría del producto"
                  value={producto.categoria || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.modalActions}>

              <button
                type="submit"
                className={`${styles.btnBase} ${styles.btnPrimary}`}
              >
                {modo === "agregar" ? <>Agregar</> : <>Actualizar</>}
              </button>

              <button
                type="button"
                onClick={onCerrar}
                className={`${styles.btnBase} ${styles.btnSecondary}`}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormProducto;
