import { useEffect, useState } from "react";
import "./ModalUsuario.css";

const ModalUsuario = ({ usuario, cerrarModal }) => {
  const [tipoInfo, setTipoInfo] = useState("name");

  const [pais, setPais] = useState(null);
  const [clima, setClima] = useState(null);

  // API COUNTRIES
  useEffect(() => {
  const obtenerPais = async () => {
    try {
      const respuesta = await fetch(
        `https://restcountries.com/v3.1/name/${usuario.location.country}`
      );

      const data = await respuesta.json();

      if (Array.isArray(data) && data.length > 0) {
        setPais(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  obtenerPais();
}, [usuario]);

  // API WEATHER
  useEffect(() => {
  const obtenerClima = async () => {
    try {
      const lat = parseFloat(
        usuario.location.coordinates.latitude
      );

      const lon = parseFloat(
        usuario.location.coordinates.longitude
      );

      const respuesta = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );

      const data = await respuesta.json();

      setClima(data.current_weather);
    } catch (error) {
      console.log(error);
    }
  };

  obtenerClima();
}, [usuario]);

  const obtenerTitulo = () => {
    switch (tipoInfo) {
      case "email":
        return "My email address is";

      case "phone":
        return "My phone number is";

      case "location":
        return "My address is";

      case "country":
        return "My country is";

      case "age":
        return "My age is";

      case "username":
        return "My username is";

      default:
        return "My name is";
    }
  };

  const obtenerValor = () => {
    switch (tipoInfo) {
      case "email":
        return usuario.email;

      case "phone":
        return usuario.phone;

      case "location":
        return `${usuario.location.city}, ${usuario.location.country}`;

      case "country":
        return usuario.location.country;

      case "age":
        return `${usuario.dob.age} years`;

      case "username":
        return usuario.login.username;

      default:
        return `${usuario.name.first} ${usuario.name.last}`;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="cerrar" onClick={cerrarModal}>
          ✖
        </button>

        <div className="modal-top"></div>

        <img
          className="modal-avatar"
          src={usuario.picture.large}
          alt="avatar"
        />

        <div className="modal-content">
          <p className="info-title">{obtenerTitulo()}</p>

          <h2 className="info-value">{obtenerValor()}</h2>

          <div className="icons">
            <span onMouseEnter={() => setTipoInfo("name")}>👤</span>

            <span onMouseEnter={() => setTipoInfo("email")}>✉️</span>

            <span onMouseEnter={() => setTipoInfo("age")}>🎂</span>

            <span onMouseEnter={() => setTipoInfo("location")}>📍</span>

            <span onMouseEnter={() => setTipoInfo("phone")}>📞</span>

            <span onMouseEnter={() => setTipoInfo("country")}>🌍</span>

            <span onMouseEnter={() => setTipoInfo("username")}>💻</span>
          </div>

          <div className="extra-info">
            {pais && (
              <div className="country-card">
                <img src={pais.flags.svg} alt="bandera" className="flag" />

                <div>
                  <h4>{pais.name.common}</h4>

                  <p>Capital: {pais.capital?.[0]}</p>

                  <p>Population: {pais.population.toLocaleString()}</p>
                </div>
              </div>
            )}

            {clima && (
              <div className="weather-card">
                <h4>☀️ Weather in {usuario.location.city}</h4>

                <p>🌡️ Temperature: {clima.temperature}°C</p>

                <p>💨 Wind: {clima.windspeed} km/h</p>
              </div>
            )}

            <div className="map-container">
              <iframe
                title="map"
                src={`https://www.google.com/maps?q=${usuario.location.coordinates.latitude},${usuario.location.coordinates.longitude}&z=10&output=embed`}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
