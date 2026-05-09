import React, { useEffect, useMemo, useState } from "react";
import "./Usuarios.css";
import ModalUsuario from "../components/ModalUsuario";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const usuariosPorPagina = 8;

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const respuesta = await fetch("https://randomuser.me/api/?results=100");

        if (!respuesta.ok) {
          throw new Error("Error al obtener usuarios");
        }

        const data = await respuesta.json();

        setUsuarios(data.results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuarios();
  }, []);

  // Calcular páginas
  const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

  // Usuarios actuales
  const usuariosActuales = useMemo(() => {
    const inicio = (paginaActual - 1) * usuariosPorPagina;
    const fin = inicio + usuariosPorPagina;

    return usuarios.slice(inicio, fin);
  }, [usuarios, paginaActual]);

  return (
    <div className="container">
      <h1 className="titulo">Usuarios</h1>

      {loading ? (
        <h2 className="loading">Cargando usuarios...</h2>
      ) : (
        <>
          <div className="grid">
            {usuariosActuales.map((persona) => (
              <div className="card" key={persona.login.uuid}>
                <img
                  className="avatar"
                  src={persona.picture.large}
                  alt="Foto perfil"
                />

                <h3>
                  {persona.name.first} {persona.name.last}
                </h3>

                <p>{persona.email}</p>

                <p>{persona.phone}</p>

                <button
                  className="btn-info"
                  onClick={() => setUsuarioSeleccionado(persona)}
                >
                  + Info
                </button>
              </div>
            ))}
          </div>

          {/* PAGINACION */}
          <div className="pagination">
            <button
              className="page-btn"
              disabled={paginaActual === 1}
              onClick={() => setPaginaActual((prev) => prev - 1)}
            >
              ←
            </button>

            {[...Array(totalPaginas)].map((_, index) => (
              <button
                key={index}
                className={
                  paginaActual === index + 1
                    ? "page-number active"
                    : "page-number"
                }
                onClick={() => setPaginaActual(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={paginaActual === totalPaginas}
              onClick={() => setPaginaActual((prev) => prev + 1)}
            >
              →
            </button>
          </div>
        </>
      )}
      {usuarioSeleccionado && (
        <ModalUsuario
          usuario={usuarioSeleccionado}
          cerrarModal={() => setUsuarioSeleccionado(null)}
        />
      )}
    </div>
  );
};

export default Usuarios;
