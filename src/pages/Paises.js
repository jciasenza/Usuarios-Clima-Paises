import { useEffect, useState } from "react";
import "./Paises.css";

const Paises = () => {
  const [paises, setPaises] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [paisSeleccionado, setPaisSeleccionado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const paisesPorPagina = 12;

  const paisesFiltrados = Array.isArray(paises)
    ? paises.filter((pais) =>
        pais.name.common.toLowerCase().includes(busqueda.toLowerCase()),
      )
    : [];

  const indiceInicial = (paginaActual - 1) * paisesPorPagina;

  const indiceFinal = indiceInicial + paisesPorPagina;

  const paisesActuales = paisesFiltrados.slice(indiceInicial, indiceFinal);

  const obtenerIdiomas = (pais) =>
    pais.languages ? Object.values(pais.languages).join(", ") : "Unknown";

  const obtenerMonedas = (pais) =>
    pais.currencies
      ? Object.values(pais.currencies)
          .map((moneda) => `${moneda.name} (${moneda.symbol})`)
          .join(", ")
      : "Unknown";

  const totalPaginas = Math.ceil(paisesFiltrados.length / paisesPorPagina);

  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const respuesta = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,subregion,languages,maps,timezones,continents",
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener países");
        }

        const data = await respuesta.json();

        setPaises(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);

        setPaises([]);
      } finally {
        setLoading(false);
      }
    };

    obtenerPaises();
  }, []);

  return (
    <section className="countries-page">
      <div className="countries-container">
        <h1 className="countries-title">Countries Explorer</h1>

        <p className="countries-subtitle">
          Discover information about countries around the world
        </p>

        <div className="search-country">
          <input
            type="text"
            placeholder="Search country..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {loading ? (
          <h2 className="loading">Loading countries...</h2>
        ) : (
          <>
            <div className="countries-grid">
              {paisesActuales.map((pais) => (
                <div
                  className="country-card-paises"
                  key={pais.name.common}
                  onClick={() => setPaisSeleccionado(pais)}
                >
                  <img
                    className="country-flag"
                    src={pais.flags.svg}
                    alt={pais.name.common}
                  />

                  <h2>{pais.name.common}</h2>
                </div>
              ))}
            </div>

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

            {paisSeleccionado && (
              <div className="modal-overlay">
                <div className="country-modal">
                  <button
                    className="close-modal"
                    onClick={() => setPaisSeleccionado(null)}
                  >
                    ✖
                  </button>

                  <img
                    className="modal-flag"
                    src={paisSeleccionado.flags.svg}
                    alt={paisSeleccionado.name.common}
                  />

                  {paisSeleccionado.coatOfArms?.svg && (
                    <img
                      className="coat-arms"
                      src={paisSeleccionado.coatOfArms.svg}
                      alt="coat"
                    />
                  )}

                  <h1>{paisSeleccionado.name.common}</h1>

                  <div className="modal-info">
                    <div>
                      <h3>🌍 Region</h3>

                      <p>{paisSeleccionado.region}</p>
                    </div>

                    <div>
                      <h3>🗺️ Subregion</h3>

                      <p>{paisSeleccionado.subregion}</p>
                    </div>

                    <div>
                      <h3>🏛️ Capital</h3>

                      <p>{paisSeleccionado.capital?.[0]}</p>
                    </div>

                    <div>
                      <h3>👥 Population</h3>

                      <p>{paisSeleccionado.population.toLocaleString()}</p>
                    </div>

                    <div>
                      <h3>🗣️ Languages</h3>

                      <p>{obtenerIdiomas(paisSeleccionado)}</p>
                    </div>

                    <div>
                      <h3>💰 Currency</h3>

                      <p>{obtenerMonedas(paisSeleccionado)}</p>
                    </div>

                    <div>
                      <h3>🕒 Timezone</h3>

                      <p>{paisSeleccionado.timezones?.[0]}</p>
                    </div>

                    <div>
                      <h3>🗺️ Maps</h3>
                      <a
                        href={paisSeleccionado.maps.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </div>

                    <div>
                      <h3>🏳️ Independent</h3>

                      <p>{paisSeleccionado.independent ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Paises;
